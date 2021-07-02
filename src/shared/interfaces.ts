import { UserModel } from '@src/models';
import { Request, Router } from 'express';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { Transaction } from 'sequelize/types';

import { FILTER_OPERATORS, MODEL_NAMES } from './constants';

type AnyParams = any;

export interface IMiddleware<Input extends AnyParams, Output = any> {
  activate(...args: Input): Output;
}

export interface IParser<T = any> {
  parse(...args: any[]): T;
}

export interface IAuthController {
  login(req: IRequest): Promise<LoginResponse>;
  register(req: IRequest): Promise<RegisterResponse>;
}

export interface IFactory<Input extends AnyParams, Instance = any> {
  createInstance(...args: Input): Instance;
}

export interface ISort {
  column?: string;
  dimension?: string;
  direction?: 'ASC' | 'DESC';
}

export interface IFilter {
  field: string;
  operator: FILTER_OPERATORS;
  value: any;
}

export interface ApiQueryString {
  select: string;
  limit: number;
  search: string;
  offset: number;
  page: number;
  filters: IFilter[];
  includes: IInclude[];
  sort: ISort;
}

export type RawQueryString = { [props: string]: string };

export interface IRepository<T> {
  find<O>(options?: O, ...args: any[]): Promise<T[]>;
  findOne<O>(options?: O, ...args: any[]): Promise<T>;
  paginate<O>(options?: O, ...args: any[]): Promise<T[]>;
  findById<O>(id: any, options?: O, ...args: any[]): Promise<T>;
  findByObjectId<O>(id: any, options?: O, ...args: any[]): Promise<T>;
  count<O>(options?: O, ...args: any[]): Promise<number>;
  estimatedCount<O>(options?: O, ...args: any[]): Promise<number>;
  create<O>(data: Partial<T>, options?: O, ...args: any[]): Promise<T>;
  updateById<O>(id: any, data: Partial<T>, options?: O, ...args: any[]): Promise<T>;
  updateByObjectId<O>(id: any, data: Partial<T>, options?: O, ...args: any[]): Promise<T>;
  deleteById<O>(id: any, options?: O, ...args: any[]): Promise<void>;
  deleteByObjectId<O>(id: any, options?: O, ...args: any[]): Promise<void>;
}

export interface IInclude {
  field: string;
  select?: string[];
  where?: any;
  required?: boolean;
  includes?: IInclude[];
  filters?: IFilter[];
}

export type LoggingModuleName = string;

export interface ConnectionAdapter<T = any> {
  getConnection(): T;
}

export interface ICriteria {
  select?: any;
  filters?: IFilter[];
  sort?: ISort;
  page?: number;
  transaction?: any;
  limit?: number;
  includes?: IInclude[];
  offset?: number;
  search?: string;
  groupBy?: string[];
}

export interface RdsTransaction extends Transaction {}

export interface TransactionFactory<T> {
  createTransaction?(): Promise<T>;
}

export interface Configuration {
  get(key: string): any;
}

export interface ILogger {
  info(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
}

export interface LoginResponse {
  success: boolean,
  message?: string,
  token?: string,
  user?: AuthenticatedUser, 
}

export interface RegisterResponse {
  success: boolean,
  message?: string,
}

export interface IServer {
  listen(port?: number, host?: string, callback?: CallableFunction): Promise<void>;
}

export interface AppErrorDetail {
  field: string,
  message: string,
}

export interface ICrudRemoteFacade<T> {
  find(option?: any, ...args: any[]): Promise<T[]>;
  findById(id: any, option?: any, ...args: any[]): Promise<T>;
  paginate(option?: any): Promise<PaginateResult<T>>;
  create(data: any, option?: any, ...args: any[]): Promise<T>;
  updateById(id: any, data: any, option?: any, ...args: any[]): Promise<T>;
  deleteById(id: any, option?: any, ...args: any[]): Promise<void>;
}

export interface PaginateResult<T> {
  docs: T[];
  totalCount: number;
}

export interface IRouter {
  route(): Router;
}

export type ICrudWorkflowInterceptor = IMiddleware<[MODEL_NAMES, string], any>;

export interface IEncryptionHelper {
  encrypt(data: string): string;
  decrypt(data: string): string;
  hash(data: string): string;
  compareHash(data: string, hashed: string): boolean;
}

export interface IJwtHelper<T = any> {
  signin(payload: T, options?: SignOptions): string;
  verify(token: string, options?: VerifyOptions): T;
}

export interface IRequest extends Request {
  session?: Session;
  context: RequestContext;
}

export interface RequestContext {
  queryString: any;
  transaction?: RdsTransaction;
  user?: UserModel;
}

export interface ValidationSchema {
  schema: any;
}

export interface Formater {
  format(data: any, ...args: any[]): any;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  fullName: string;
  userTypeId: number;
  statusId: number;
  avatarUrl?: string;
  permissions: number[];
}

export interface Session {
  lang?: PLATFORM_LANGUAGES;
  user?: AuthenticatedUser;
}

export enum PLATFORM_LANGUAGES {
  ENG = 'ENG',
  VIET = 'VIET',
}

export interface DbConfig {
  [dbName: string]: DbConnectionOptions;
}

export interface DbConnectionOptions {
  name: string;
  type: 'postgres';
  host: string;
  port: number;
  user: string;
  password: string;
  databaseName: string;
}

export interface EncryptionConfig {
  secret: string;
  algorithm: string;
}

export interface JwtConfig {
  secret: string;
  expirationTime: number;
}

export interface HttpServerConfig {
  host: string;
  port: number;
}

export interface IRegistry<Input extends AnyParams, Instance = any> {
  getInstance(...args: Input): Instance;
}

export interface ILruCache {
  set(key: string, value: string, maxAgeInMilliSecs?: number): void;
  get(key: string): string;
  reset(): void;
  has(key: string): boolean;
}

export interface HttpRequestConfig {
  payloadLimit: string;
}

export interface IRedisClient {
  get(key: string): Promise<any>;
  set(key: string, data: string): Promise<void>;
  hset(key: string, field: string, data: string): Promise<void>;
  hget(key: string, field: string): Promise<string>;
  hmget(key: string, ...fields: string[]): Promise<any>;
  hmset(key: string, data: any): Promise<void>;
  hgetall(key: string): Promise<any>;
}