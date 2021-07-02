import '../../../shared';
import '../../../models';
import '../../../datasource';
import '../../../presentation';

import { buildProviderModule } from 'inversify-binding-decorators';
import { appContainer } from './app-container';

appContainer.load(buildProviderModule());

export const container = appContainer;