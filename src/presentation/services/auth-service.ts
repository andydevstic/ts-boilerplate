import { Connection } from "mongoose";

import { injectNamed, provideSingletonNamed } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from "@src/shared/constants";
import { ConnectionAdapter, IAuthService, IHashService, IJwtService } from "@src/shared/interfaces";
import { User } from "@src/datasource/nosql/models";
import { UnauthorizedError } from "@src/shared/errors";

@provideSingletonNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.AUTH)
export class AuthService implements IAuthService {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.ADAPTER, API_PROVIDER_NAMES.MONGODB)
    protected mongoClient: ConnectionAdapter<Connection>,

    @injectNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.HASH)
    protected hashService: IHashService,

    @injectNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.JWT)
    protected jwtService: IJwtService,
  ) {}

  protected get _mongoConnection(): Connection {
    return this.mongoClient.getConnection();
  }

  public async login(email: string, password: string): Promise<string> {
    const userModel = User.useConnection(this._mongoConnection);
    const userWithEmail = await userModel.findOne({ email }).exec();

    if (!userWithEmail) {
      throw new UnauthorizedError('Username or password is incorrect');
    }

    const userHashedPassword = userWithEmail.password;
    const isPasswordMatch = await this.hashService.compare(password, userHashedPassword);

    if (!isPasswordMatch) {
      throw new UnauthorizedError('Username or password is incorrect');
    }

    const jwtToken = await this.jwtService.sign(User.toSessionUser(userWithEmail));

    return jwtToken;
  }
}
