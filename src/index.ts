import 'reflect-metadata';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

import { container } from '@src/presentation/core/ioc/app-loaders';
import { ILogger } from './shared/interfaces';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from './shared/constants';

const httpServer = container.getNamed<any>(API_PROVIDER_TYPES.SERVER, API_PROVIDER_NAMES.HTTP);
const logger = container.getNamed<ILogger>(API_PROVIDER_TYPES.LOGGER, API_PROVIDER_NAMES.LOG4JS);

httpServer.establishExternalConnections()
  .then((server: any) => server.listen())
  .catch((error: Error) => {
    logger.error(error.message);

    process.exit(1);
  });
