import { Connection } from "mongoose";

// @ts-ignore
import * as FNVHash from 'fnv-plus';

import { User, UserType } from "@src/datasource/nosql/models";
import { injectNamed, provideSingletonNamed, useLruCache } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES } from "@src/shared/constants";
import { ConnectionAdapter, ICrudService, IGeneralType, IParser, IUser, PaginateResult } from "@src/shared/interfaces";
import { UserStatus } from "@src/datasource/nosql/models/user-status-model";

@provideSingletonNamed(API_PROVIDER_TYPES.SERVICE, MODEL_NAMES.USER)
export class UserService implements Partial<ICrudService<IUser>> {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.PARSER, API_PROVIDER_NAMES.MONGO_OPTIONS)
    protected optionsParser: IParser,

    @injectNamed(API_PROVIDER_TYPES.ADAPTER, API_PROVIDER_NAMES.MONGODB)
    protected mongoClient: ConnectionAdapter<Connection>,
  ) {}

  protected get _mongoConnection(): Connection {
    return this.mongoClient.getConnection();
  }

  public async paginate(paginateOptions: any): Promise<PaginateResult> {
    const { select, filters, pagination, sort } = this.optionsParser.parse(paginateOptions);

    const userModel = User.useConnection(this._mongoConnection);

    const totalCount = await userModel.countDocuments(filters).exec();
    const docs = await userModel.find(filters, select, { ...pagination, ...sort }).exec();

    return {
      docs,
      totalCount,
    };
  }

  public create(createUserData: IUser): Promise<IUser> {
    const userModel = User.useConnection(this._mongoConnection);

    return userModel.create(createUserData);
  }

  @useLruCache({ ttlInSeconds: 60 * 30 })
  public findByEmail(email: string): Promise<IUser> {
    const userModel = User.useConnection(this._mongoConnection);

    return userModel.findOne({ email }).exec();
  }

  @useLruCache({
    ttlInSeconds: 864000,
    customHashFn: (select: string) => FNVHash.hash(`UserTypes:${select}`).hex(),
  })
  public getTypes(select: string): Promise<IGeneralType[]> {
    const userTypeModel = UserType.useConnection(this._mongoConnection);

    return userTypeModel.find({}, select).exec();
  }

  @useLruCache({ ttlInSeconds: 864000 })
  public getStatus(): Promise<IGeneralType[]> {
    const userStatusModel = UserStatus.useConnection(this._mongoConnection);

    return userStatusModel.find().exec();
  }
}
