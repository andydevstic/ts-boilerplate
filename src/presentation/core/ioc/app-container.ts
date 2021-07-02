import { Container, interfaces } from 'inversify';
import * as config from 'config';

import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';
import { Configuration } from '@src/shared/interfaces';

const container = new Container();

container
  .bind<Configuration>(API_PROVIDER_TYPES.CONFIG)
  .toConstantValue(config);

container
  .bind<Container>(API_PROVIDER_TYPES.CONTAINER)
  .toConstantValue(container);

container
  .bind(API_PROVIDER_TYPES.SERVER)
  .toConstantValue(null)
  .whenTargetNamed(API_PROVIDER_NAMES.REQUEST);

export const appContainer: interfaces.Container = container;
