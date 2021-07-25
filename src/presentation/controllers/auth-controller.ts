import { injectNamed, provideNamed, validateDTO } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES, USER_STATUS, VALIDATION_SCHEMAS } from '@src/shared/constants';
import { IAuthService, ICrudService, IHashService, IRequest, IUser, LoginResponse } from '@src/shared/interfaces';

@provideNamed(API_PROVIDER_TYPES.CONTROLLER, API_PROVIDER_NAMES.AUTH)
export class AuthController {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.SERVICE, MODEL_NAMES.USER)
    protected userService: ICrudService<IUser>,

    @injectNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.HASH)
    protected hashService: IHashService,

    @injectNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.AUTH)
    protected authService: IAuthService,
  ) { }

  @validateDTO(VALIDATION_SCHEMAS.REGISTER)
  public async register(req: IRequest): Promise<void> {
    const createUserDTO = req.body;

    const hashedPassword = await this.hashService.encrypt(createUserDTO.password);

    const createUserData = {
      ...createUserDTO,
      password: hashedPassword,
      status: USER_STATUS.INACTIVE,
    };

    await this.userService.create(createUserData);
  }

  @validateDTO(VALIDATION_SCHEMAS.LOGIN)
  public async login(req: IRequest): Promise<LoginResponse> {
    const { email, password } = req.body;

    const jwtToken = await this.authService.login(email, password);

    return {
      token: jwtToken,
    };
  }
}
