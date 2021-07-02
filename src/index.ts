import 'reflect-metadata';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

import { container } from '@src/presentation/core/ioc/app-loaders';
import { ILogger, IServer } from './shared/interfaces';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from './shared/constants';

const httpServer = container.getNamed<IServer>(API_PROVIDER_TYPES.SERVER, API_PROVIDER_NAMES.HTTP);
const logger = container.getNamed<ILogger>(API_PROVIDER_TYPES.LOGGER, API_PROVIDER_NAMES.LOG4JS);

httpServer
  .listen()
  .catch((error) => {
    logger.error(error.message);
  });
