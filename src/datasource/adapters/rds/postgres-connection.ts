import { provideSingletonNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';
import { Configuration } from '@src/shared/interfaces';
import { inject, multiInject } from 'inversify';

import { SequelizeAdapter } from './sequelize';

@provideSingletonNamed(API_PROVIDER_TYPES.ADAPTER, API_PROVIDER_NAMES.POSTGRES)
export class PostgresAdapter extends SequelizeAdapter {
  protected _repositoryRegistry: Map<string, any> = new Map();

  constructor(
    @inject(API_PROVIDER_TYPES.CONFIG)
    config: Configuration,

    @multiInject(API_PROVIDER_TYPES.DB_MODEL)
    domainModels: any[],
  ) {
    super(config.get('database.postgres'));

    if (!domainModels || !domainModels.length) {
      throw new Error('Failed to load domain models');
    }

    domainModels.forEach(model => {
      const { tableName } = model;

      this._repositoryRegistry.set(tableName, model);
      this._connection.addModels([model]);
    })
  }

  public getRepository(tableName: string): any {
    const model = this._repositoryRegistry.get(tableName);
    
    if (!model) {
      throw new Error(`Model ${tableName} not registered!`);
    }

    return model;
  }
}
