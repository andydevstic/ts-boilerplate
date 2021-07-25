import { Connection, ConnectOptions, createConnection } from "mongoose";

import { injectNamed, provideSingletonNamed } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from "@src/shared/constants";
import { ConnectionAdapter, ILogger } from "@src/shared/interfaces";
import { InternalServerError } from "@src/shared/errors";

@provideSingletonNamed(API_PROVIDER_TYPES.ADAPTER, API_PROVIDER_NAMES.MONGODB)
export class MongoClient implements ConnectionAdapter<Connection> {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.LOGGER, API_PROVIDER_NAMES.LOG4JS)
    protected logger: ILogger,
  ) {}

  protected _connection: Connection;

  public async connect(uri: string, options?: ConnectOptions): Promise<void> {
    this._connection = await createConnection(uri, options);
    this.logger.info(`Connected to mongo at ${uri} successfully!`);
  }

  public getConnection() {
    if (!this._connection) {
      throw new InternalServerError('Mongo connection was not established!');
    }

    return this._connection;
  }
}
