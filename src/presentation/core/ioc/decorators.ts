import { fluentProvide } from 'inversify-binding-decorators';
import { inject, named } from 'inversify';

import { appContainer } from './app-container';
import { ILruCache, IRegistry, IRequest } from '@src/shared/interfaces';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from '@src/shared/constants';
import { cloneDeep } from 'lodash';
import { BadRequestError } from '@src/shared/errors';

export function provide(identifier: symbol) {
  return fluentProvide(identifier).done();
}

export function provideNamed(identifier: symbol, name: string) {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
}

export function constructorProvideNamed(identifier: symbol, name: string) {
  return (classFunction: Function) => {
    appContainer.bind(identifier).toConstantValue(classFunction).whenTargetNamed(name);
  };
}

export function constructorProvideTagged(identifier: symbol, tag: string, value: any) {
  return (classFunction: Function) => {
    appContainer.bind(identifier).toConstantValue(classFunction).whenTargetTagged(tag, value);
  };
}

export function constructorProvide(identifier: symbol) {
  return (classFunction: Function) => {
    appContainer.bind(identifier).toFunction(classFunction);
  };
}

export function provideSingletonNamed(identifier: symbol, name: string) {
  return fluentProvide(identifier)
    .inSingletonScope()
    .whenTargetNamed(name)
    .done();
}

export function provideSingleton(identifier: symbol) {
  return fluentProvide(identifier)
    .inSingletonScope()
    .done();
}

export function injectNamed(identifier: symbol, name: string) {
  return (classPrototype: Object, target: string, index: number) => {
    inject(identifier)(classPrototype, target, index);
    named(name)(classPrototype, target, index);
  };
}

export function useLruCache(options: {
  ttlInSeconds?: number,
  customHashFn?: (...args: any[]) => string,
  cacheDataType?: string,
  domainName?: string,
  options?: any,
} = {}) {
  const { ttlInSeconds, customHashFn, cacheDataType, domainName } = options;

  return (classPrototype: any, propertyName: string, propertyDescriptor: PropertyDescriptor) => {
    const unboundOriginalHandler = propertyDescriptor.value;

    const moduleName = domainName || classPrototype.constructor.name;

    propertyDescriptor.value = async function (...args: any[]) {
      const boundedOriginalHandler = unboundOriginalHandler.bind(this);
      const lruCacheRegistry = appContainer
        .getNamed<IRegistry<[string, any], ILruCache>>(
          API_PROVIDER_TYPES.REGISTRY,
          API_PROVIDER_NAMES.LRU_CACHE,
        );

      const lruCache = lruCacheRegistry.getInstance(moduleName, options);

      const hashKey = customHashFn ? customHashFn(...args) : `${moduleName}:${propertyName}`;
      if (hashKey) {
        const cachedResult = lruCache.get(hashKey);
        if (cachedResult) {
          switch (cacheDataType) {
            case 'string':
              return cachedResult;
            case 'number':
              return Number(cachedResult);
            default:
              return JSON.parse(cachedResult);
          }
        }
      }

      const result = await boundedOriginalHandler(...args);

      lruCache.set(hashKey, typeof result === 'object' ? JSON.stringify(result) : String(result), ttlInSeconds && ttlInSeconds * 1000);

      return result;
    };
  };
}

export function cleanLruCacheOnComplete(domainName?: string) {
  return (classPrototype: any, propertyName: string, propertyDescriptor: PropertyDescriptor) => {
    const unboundOriginalHandler = propertyDescriptor.value;

    const moduleName = domainName || 'app';

    propertyDescriptor.value = async function (...args: any[]) {
      const boundedOriginalHandler = unboundOriginalHandler.bind(this);
      const result = await boundedOriginalHandler(...args);

      const lruCacheRegistry = appContainer
        .getNamed<IRegistry<[string, any], ILruCache>>(API_PROVIDER_TYPES.REGISTRY, API_PROVIDER_NAMES.LRU_CACHE);
      const lruCache = lruCacheRegistry.getInstance(moduleName, null);

      lruCache.reset();

      return result;
    };
  };
}

export function validateDTO(schemaName: VALIDATION_SCHEMAS) {
  return (classPrototype: any, propertyName: string, propertyDescriptor: PropertyDescriptor) => {
    const unboundOriginalHandler = propertyDescriptor.value;

    propertyDescriptor.value = function (req: IRequest) {
      const boundedOriginalHandler = unboundOriginalHandler.bind(this);
      const validator = appContainer.get<any>(API_PROVIDER_TYPES.SCHEMA_VALIDATOR);
      const dto = cloneDeep({ ...req.body, ...req.params, ...req.context.queryString });
      const { valid, errors } = validator.validate(schemaName, dto);

      if (!valid) {
        throw new BadRequestError('Invalid data', errors);
      }

      return boundedOriginalHandler(req);
    };
  };
}
