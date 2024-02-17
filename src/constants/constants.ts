export const CONSOLE_MESSAGES = {
  INFO: 'This is an information message',
  ERROR: 'An error occurred',
  WARNING: 'This is a warning',
};

export const DATA_MESSAGES = {
  INITIALIZED: 'Data Source has been initialized!',
  ERROR: 'Error during Data Source initialization',
  WARNING: 'This is a warning',
};

export const RESPONSE_MESSAGES = {
  ERROR_REGISTER: 'User not register',
  ERROR: 'User already exists',
  WARNING: 'This is a warning',
  DELETE_ARTICLE: 'Article deleted successfully',
};

export const USER_INPUT_MESSAGES = {
  ERROR_PASSWORD: 'Please, enter your password',
  ERROR_PASSWORD_LENGTH: 'Password min 1 character',
  ERROR_EMAIL: 'Please enter correct email example test@test.com',
  ERROR_EMAIL_TYPE: 'Please, enter your email',
  ERROR_NAME: 'Name not empty',
  ERROR_NAME_TYPE: 'Please, enter your name',
  ERROR_EMAIL_PASSWORD: 'Error email or password',
  ERROR_LOGIN: 'User not login',
  ERROR_FIND_ARTICLE: 'Article not found with id',
  ERROR_EMPTY_TITLE: 'Do not empty title',
  ERROR_EMPTY_DESCRIPTION: 'Do not empty description',
  ERROR_TOKEN: 'token not empty',
  ERROR_TOKEN_TYPE: 'Please, enter your token',
};

export const PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};

export const CONFIG = {
  SECRET: 'SECRET_KEY_APP',
  LIMIT: '24h',
  CACHE_DATA: 'getAllArticles',
  CACHE_TTL: 300000,
};
