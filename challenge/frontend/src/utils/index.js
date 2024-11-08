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
  COMPLAINTS: {
    ALL: `${COMPLAINTS_BASE_PATH}`,
    OPEN: `${COMPLAINTS_BASE_PATH}/open`,
    CLOSED: `${COMPLAINTS_BASE_PATH}/closed`,
    TOP: `${COMPLAINTS_BASE_PATH}/top`,
    CURRENT_USER: `${COMPLAINTS_BASE_PATH}/current-user`,
  },
  LOGIN: '/login/'
};