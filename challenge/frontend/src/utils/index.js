export const STATUS = {
  FAIL: "FAIL",
  SUCCESS: "SUCCESS",
};

export const NETWORK_ERROR_TYPES = {
  NOT_OK: 'NOT OK',
  ERROR: 'ERROR'
}

export const LOGIN_MESSAGES = {
  [NETWORK_ERROR_TYPES.NOT_OK]:
    "Please double check username and password or contact Support",
  [NETWORK_ERROR_TYPES.ERROR]: "Error, please contact support",
};

export const ROUTES = {
  LOGIN: "/",
  HOME: "/home",
};

const COMPLAINTS_BASE_PATH = "/api/complaints";

export const BE_ROUTES = {
  all: `${COMPLAINTS_BASE_PATH}/`,
  open: `${COMPLAINTS_BASE_PATH}/open`,
  closed: `${COMPLAINTS_BASE_PATH}/closed`,
  top: `${COMPLAINTS_BASE_PATH}/top`,
};