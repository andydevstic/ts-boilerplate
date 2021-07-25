import { injectNamed, provideSingletonNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';
import { ILogger, ILruCache, IRegistry } from '@src/shared/interfaces';
import { LruCache } from './lru-cache';

@provideSingletonNamed(API_PROVIDER_TYPES.REGISTRY, API_PROVIDER_NAMES.LRU_CACHE)
export class LruCacheRegistry implements IRegistry<[string, any], ILruCache> {
  protected cacheInstanceRegistry = new Map<string, ILruCache>();

  constructor(
    @injectNamed(API_PROVIDER_TYPES.LOGGER, API_PROVIDER_NAMES.LOG4JS)
    protected logger: ILogger,
  ) {}

  public getInstance(moduleIdentifier: string, options?: any): ILruCache {
    if (this.cacheInstanceRegistry.has(moduleIdentifier)) {
      return this.cacheInstanceRegistry.get(moduleIdentifier);
    }

    const newCacheInstance = new LruCache(this.logger, options);
    this.cacheInstanceRegistry.set(moduleIdentifier, newCacheInstance);

    return newCacheInstance;
  }
}
