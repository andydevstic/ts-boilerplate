import { Sequelize } from 'sequelize-typescript';
import { injectable } from 'inversify';
import { TransactionOptions } from 'sequelize/types';

import { ConnectionAdapter, RdsTransaction, TransactionFactory } from '@src/shared/interfaces';
import { SEQUELIZE_OPERATOR_ALIASES } from '@src/shared/constants';

@injectable()
export abstract class SequelizeAdapter implements ConnectionAdapter<Sequelize>, TransactionFactory<RdsTransaction> {
  protected _connection: Sequelize;

  constructor(sequelizeOptions: any) {
    if (!sequelizeOptions) {
      throw new Error('Missing sequelize options');
    }

    this._connection = new Sequelize({
      ...sequelizeOptions,
      operatorsAliases: SEQUELIZE_OPERATOR_ALIASES,
    });
  }

  public async createTransaction(options?: TransactionOptions): Promise<RdsTransaction> {
    const sequelizeTransaction = await this._connection.transaction(options);

    return sequelizeTransaction as any;
  }

  public getConnection(): Sequelize {
    return this._connection;
  }
}
