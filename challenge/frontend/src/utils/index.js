export const STATUS = {
  FAIL: "FAIL",
  SUCCESS: "SUCCESS",
};

export const NETWORK_ERROR_TYPES = {
  NOT_OK: 'NOT OK',
  ERROR: 'ERROR'
}

export const TOAST_STATUS = {
  ERROR: 'error',
  SUCCESS: 'success'
}

export const ROUTES = {
  LOGIN: "/",
  HOME: "/home",
};

const COMPLAINTS_BASE_PATH = "/api/complaints";

export const BE_ROUTES = {
  COMPLAINTS: {
    ALL: `${COMPLAINTS_BASE_PATH}/allComplaints`,
    OPEN: `${COMPLAINTS_BASE_PATH}/openCases/`,
    CLOSED: `${COMPLAINTS_BASE_PATH}/closedCases/`,
    TOP: `${COMPLAINTS_BASE_PATH}/topComplaints/`,
    CURRENT_USER: `${COMPLAINTS_BASE_PATH}/current-user`,
    CONSTITUENT_COMPLAINTS: `${COMPLAINTS_BASE_PATH}/constituentComplaints/`,
  },
  LOGIN: "/login/",
};