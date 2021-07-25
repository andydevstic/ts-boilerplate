import { injectNamed, provideNamed, validateDTO } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES, VALIDATION_SCHEMAS } from '@src/shared/constants';
import { ICrudService, IHashService, IParser, IRequest, IUser, PaginateResult } from '@src/shared/interfaces';

@provideNamed(API_PROVIDER_TYPES.CONTROLLER, MODEL_NAMES.USER)
export class UserController {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.SERVICE, MODEL_NAMES.USER)
    protected userService: ICrudService<IUser> & { getTypes(select: string): any },

    @injectNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.HASH)
    protected hashService: IHashService,

    @injectNamed(API_PROVIDER_TYPES.PARSER, API_PROVIDER_NAMES.MONGO_OPTIONS)
    protected mongooseOptionParser: IParser,
  ) {}

  @validateDTO(VALIDATION_SCHEMAS.PAGINATE_USERS)
  public paginate(req: IRequest): Promise<PaginateResult> {
    const paginateOptions = req.context.queryString;
    const parsedOptions = this.mongooseOptionParser.parse(paginateOptions);

    return this.userService.paginate(parsedOptions);
  }

  @validateDTO(VALIDATION_SCHEMAS.CREATE_USER)
  public async create(req: IRequest): Promise<IUser> {
    const createUserDTO = req.body;

    const hashedPassword = await this.hashService.encrypt(createUserDTO.password);

    const createUserData = {
      ...createUserDTO,
      password: hashedPassword,
    };

    const createdUser = await this.userService.create(createUserData);

    return createdUser;
  }

  @validateDTO(VALIDATION_SCHEMAS.GET_USER_TYPES)
  public getTypes(req: IRequest) {
    const findOptions = this.mongooseOptionParser.parse(req.context.queryString);

    return this.userService.getTypes(findOptions.select);
  }
}
