export const API_PROVIDER_NAMES = {
  REQUEST_CONTEXT: 'REQUEST_CONTEXT',
  DATABASE: 'DATABASE',
  LRU_CACHE: 'LRU_CACHE',
  V1: 'V1',
  APP_DATABASE: 'APP_DATABASE',
  MONGODB: 'MONGODB',
  LOG4JS: 'LOG4JS',
  API_QUERY_STRING: 'API_QUERY_STRING',
  ERROR_HANDLER: 'ERROR_HANDLER',
  REQUEST_HANDLER: 'REQUEST_HANDLER',
  USER_SESSION: 'USER_SESSION',
  JWT: 'JWT',
  HASH: 'HASH',
  AUTH_USER: 'AUTH_USER',
  AJV_ERROR: 'AJV_ERROR',
  HTTP: 'HTTP',
  REDIS: 'REDIS',
  REQUEST: 'REQUEST',
  AUTH: 'AUTH',
  MONGO_OPTIONS: 'MONGO_OPTIONS',
  AUTH_WORKFLOW: 'AUTH_WORKFLOW',
  CRUD_WORKFLOW: 'CRUD_WORKFLOW',
  RESPONSE: 'RESPONSE',
};

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

export enum MODEL_NAMES {
  USER = 'USER',
  USER_TYPE = 'USER_TYPE',
}

export enum REQUEST_METHODS {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
}

export const API_PROVIDER_TYPES = {
  SERVER: Symbol.for('SERVER'),
  REGISTRY: Symbol.for('REGISTRY'),
  MIDDLEWARE: Symbol.for('MIDDLEWARE'),
  CONTROLLER: Symbol.for('CONTROLLER'),
  CONTAINER: Symbol.for('CONTAINER'),
  GATEWAY: Symbol.for('GATEWAY'),
  SERVICE: Symbol.for('SERVICE'),
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
  GET_USER_TYPES = 'GET_USER_TYPES',
  CREATE_USER = 'CREATE_USER',
  PAGINATE_USERS = 'PAGINATE_USERS',
  REGISTER = 'REGISTER',
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
  FIND = 'find',
  FIND_BY_ID = 'findById',
  FIND_OR_PAGINATE = 'findOrPaginate',
  PAGINATE = 'paginate',
  CREATE = 'create',
  UPDATE_BY_ID = 'updateById',
  DELETE_BY_ID = 'deleteById',
}

export enum USER_STATUS {
  INACTIVE,
  ACTIVE,
  SUSPENDED,
  DELETED
}

export enum USER_TYPES {
  ADMIN = 1,
  MODERATOR,
  USER
}

export enum USER_PERMISSIONS {
  READ = 1,
  CREATE,
  UPDATE,
  DELETE
}
