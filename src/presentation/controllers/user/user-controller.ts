import { UserModel } from '@src/models';
import { injectNamed, provideNamed, validateDTO } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES, VALIDATION_SCHEMAS } from '@src/shared/constants';
import { IParser, IRequest } from '@src/shared/interfaces';
import { BaseController } from '../base-controller';

@provideNamed(API_PROVIDER_TYPES.CONTROLLER, MODEL_NAMES.USER)
export class UserController extends BaseController<UserModel> {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.REMOTE_FACADE, MODEL_NAMES.USER)
    protected userRemoteFacade: any,

    @injectNamed(API_PROVIDER_TYPES.PARSER, API_PROVIDER_NAMES.SEQUELIZE_OPTIONS)
    protected sequelizeOptionsParser: IParser,
  ) {
    super(userRemoteFacade, sequelizeOptionsParser);
  }

  @validateDTO(VALIDATION_SCHEMAS.PAGINATE_UNWATCHED_USERS)
  public paginateUnwatchedUsers(req: IRequest) {
    const { userIndex } = req.context.user;
    const findOptions = req.context.queryString;

    const parsedFindOptions = this.sequelizeOptionsParser.parse(findOptions);

    return this.userRemoteFacade.paginateUnwatchedUsers(userIndex, parsedFindOptions);
  }

  @validateDTO(VALIDATION_SCHEMAS.RECORD_USER_ACTION)
  public recordUserAction(req: IRequest) {
    const { userIndex } = req.context.user;
    const { targetUserIndex, actionId } = req.body;

    return this.userRemoteFacade.recordUserAction(userIndex, actionId, targetUserIndex);
  }

  @validateDTO(VALIDATION_SCHEMAS.PAGINATE_USER_HISTORY)
  public paginateUserHistory(req: IRequest) {
    const { userIndex } = req.context.user;
    const { actionId } = req.query;
    const findOptions = req.context.queryString;
    const parsedFindOptions = this.sequelizeOptionsParser.parse(findOptions);

    return this.userRemoteFacade.paginateUserHistory(userIndex, actionId, parsedFindOptions);
  }
}
