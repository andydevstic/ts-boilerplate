import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { inject } from 'inversify';

import { Configuration, ConnectionAdapter, ILogger, IMiddleware, IRouter } from '@src/shared/interfaces';
import { injectNamed, provideNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_TYPES, API_PROVIDER_NAMES } from '@src/shared/constants';
import { Connection } from 'mongoose';
import { InternalServerError } from '@src/shared/errors';

@provideNamed(API_PROVIDER_TYPES.SERVER, API_PROVIDER_NAMES.HTTP)
export class HttpServer {
  protected server: express.Application;

  constructor(
    @injectNamed(API_PROVIDER_TYPES.LOGGER, API_PROVIDER_NAMES.LOG4JS)
    protected logger: ILogger,

    @inject(API_PROVIDER_TYPES.CONFIG)
    protected config: Configuration,

    @injectNamed(API_PROVIDER_TYPES.ROUTER, API_PROVIDER_NAMES.V1)
    protected v1Router: IRouter,

    @injectNamed(API_PROVIDER_TYPES.ADAPTER, API_PROVIDER_NAMES.MONGODB)
    protected mongoClient: ConnectionAdapter<Connection>,

    @injectNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.ERROR_HANDLER)
    protected errorHandlerMiddleware: IMiddleware<[void]>,
  ) {
  }

  public async establishExternalConnections(): Promise<HttpServer> {
    await this.connectDatabases();

    return this;
  }

  protected async connectDatabases(): Promise<void> {
    try {
      const mongoConfig = this.config.get('database.mongo');
      const { host, port, username, password, database, config } = mongoConfig;

      let uri: string;

      if (username) {
        uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
      } else {
        uri = `mongodb://${host}:${port}/${database}`;
      }

      await this.mongoClient.connect(uri, config);
    } catch (error) {
      throw new InternalServerError('Unable to connect mongodb', error.message);
    }
  }

  protected initHttpServer(): express.Application {
    const httpServer = express();

    httpServer.use(cors());
    httpServer.use(helmet());

    httpServer.use(express.urlencoded({
      limit: this.config.get('http.request.payloadLimit'),
      extended: false,
    }));

    httpServer.use(express.json({
      limit: this.config.get('http.request.payloadLimit'),
    }));

    httpServer.use('/api/v1', this.v1Router.route());
    httpServer.use(this.errorHandlerMiddleware.activate());

    return httpServer;
  }

  public async listen(port: number, host?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.initHttpServer();
        const serverOption = this.config.get('http.server');

        this.server.listen(port || serverOption.port, host || serverOption.host, () => {
          this.logger.info(`Server is listening on port ${serverOption.port}`);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
