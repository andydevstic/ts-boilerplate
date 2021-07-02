import { Op } from "sequelize";

export const API_PROVIDER_NAMES = {
  REQUEST_CONTEXT: 'REQUEST_CONTEXT',
  DATABASE: 'DATABASE',
  LRU_CACHE: 'LRU_CACHE',
  V1: 'V1',
  APP_DATABASE: 'APP_DATABASE',
  POSTGRES: 'POSTGRES',
  LOG4JS: 'LOG4JS',
  API_QUERY_STRING: 'API_QUERY_STRING',
  ERROR_HANDLER: 'ERROR_HANDLER',
  USER_SESSION: 'USER_SESSION',
  AUTH_USER: 'AUTH_USER',
  AJV_ERROR: 'AJV_ERROR',
  HTTP: 'HTTP',
  REDIS: 'REDIS',
  REQUEST: 'REQUEST',
  AUTH: 'AUTH',
  SEQUELIZE_OPTIONS: 'SEQUELIZE_OPTIONS',
  AUTH_WORKFLOW: 'AUTH_WORKFLOW',
  CRUD_WORKFLOW: 'CRUD_WORKFLOW',
  RESPONSE: 'RESPONSE',
}

export enum FILTER_OPERATORS {
  GREATER_THAN = 'is_greater_than',
  SMALLER_THAN = 'is_smaller_than',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'does_not_contain',
  CONTAINS_SENSITIVE = 'contains_case_insensitive',
  CONTAINS_INSENSITIVE = 'does_not_contain_case_insensitive',
  IS = 'is',
  IS_NOT = 'is_not',
  IN = 'in',
  NOT_IN = 'not_in',
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
  BETWEEN = 'between',
}

export enum LOG_LEVELS {
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  ERROR = 'error',
}

export enum APP_DATABASES {
  MONGO = 'MONGO',
  REDIS = 'REDIS',
}

export enum APP_LANGUAGES {
  ENG = 'ENG',
  VIET = 'VIET',
}

export enum MODEL_NAMES {
  USER = 'USER',
  USER_HISTORY = 'USER_HISTORY',
}

export enum TABLE_NAMES {
  USER = 'users',
  USER_HISTORY = 'user_histories'
}

export enum REQUEST_METHODS {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
}

export const SEQUELIZE_OPERATOR_ALIASES = {
  $eq: Op.eq,
  $gt: Op.gt,
  $gte: Op.gte,
  $ne: Op.ne,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

export const API_PROVIDER_TYPES = {
  SERVER: Symbol.for('SERVER'),
  REGISTRY: Symbol.for('REGISTRY'),
  MIDDLEWARE: Symbol.for('MIDDLEWARE'),
  CONTROLLER: Symbol.for('CONTROLLER'),
  CONTAINER: Symbol.for('CONTAINER'),
  GATEWAY: Symbol.for('GATEWAY'),
  PARSER: Symbol.for('PARSER'),
  LOGGER: Symbol.for('LOGGER'),
  CONSTRUCTOR: Symbol.for('CONSTRUCTOR'),
  VALIDATION_SCHEMA: Symbol.for('VALIDATION_SCHEMA'),
  CONFIG: Symbol.for('CONFIG'),
  SCHEMA_VALIDATOR: Symbol.for('SCHEMA_VALIDATOR'),
  FORMATER: Symbol.for('FORMATER'),
  ADAPTER: Symbol.for('ADAPTER'),
  ROUTER: Symbol.for('ROUTER'),
  DB_MODEL: Symbol.for('DB_MODEL'),
  REMOTE_FACADE: Symbol.for('REMOTE_FACADE'),
  HTTP_REQUEST: Symbol.for('HTTP_REQUEST'),
};

export enum VALIDATION_SCHEMAS {
  INCLUDE = 'INCLUDE',
  FILTER = 'FILTER',
  SORT = 'SORT',
  FIND = 'FIND',
  CREATE_TYPE = 'CREATE_TYPE',
  FIND_BY_ID = 'FIND_BY_ID',

  LOGIN = 'LOGIN',
  PAGINATE_UNWATCHED_USERS = 'PAGINATE_UNWATCHED_USERS',
  RECORD_USER_ACTION = 'RECORD_USER_ACTION',
  PAGINATE_USER_HISTORY = 'PAGINATE_USER_HISTORY',
}


export enum CustomErrors {
  BAD_REQUEST = 'Bad request error',
  NOT_FOUND = 'Resource not found',
  FORBIDDEN = 'Forbidden error',
  INTERNAL = 'Internal server error',
  UNAUTHORIZED = 'Unauthorized error',
}

export const GLOBAL_SYMBOLS = {
  PassValidation: Symbol('PassValidation'),
};

export enum BaseControllerMethods {
  FIND_BY_ID = 'findById',
  FIND_OR_PAGINATE = 'findOrPaginate',
  PAGINATE = 'paginate',
  CREATE = 'create',
  UPDATE_BY_ID = 'updateById',
  DELETE_BY_ID = 'deleteById',
}

export enum UserControllerMethods {
  RECORD_USER_ACTION = 'recordUserAction',
  PAGINATE_USER_HISTORY = 'paginateUserHistory',
  PAGINATE_UNWATCHED_USERS = 'paginateUnwatchedUsers',
}

export enum USER_TYPES {
  ADMIN = 1,
  MODERATOR,
  USER
}

export enum USER_ACTION_TYPES {
  LIKED = 1,
  PASSED,
}

export const REDIS_KEYS_FACTORY = {
  SESSION_TOKEN: (sessionId: string) => `sessions:${sessionId}`,
}
