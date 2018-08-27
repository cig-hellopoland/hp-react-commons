/* eslint-disable-next-line no-unused-vars */
import regeneratorRuntime from '@babel/runtime/regenerator';
import { createLogic } from 'redux-logic';

export const name = 'profile';
const prefix = `commons/${name}/`;


/*
 * TYPES
 */

const ERROR_UNAUTHORIZED = `${prefix}ERROR_UNAUTHORIZED`;
const FETCH_PROFILE = `${prefix}FETCH_PROFILE`;
const FETCH_PROFILE_CANCEL = `${prefix}FETCH_PROFILE_CANCEL`;
const FETCH_PROFILE_FAILURE = `${prefix}FETCH_PROFILE_FAILURE`;
const FETCH_PROFILE_SUCCESS = `${prefix}FETCH_PROFILE_SUCCESS`;
const LOGIN = `${prefix}LOGIN`;
const LOGIN_FAILURE = `${prefix}LOGIN_FAILURE`;
const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
const LOGOUT = `${prefix}LOGOUT`;
const LOGOUT_SUCCESS = `${prefix}LOGOUT_SUCCESS`;
const REFRESH_ACCESS_TOKEN = `${prefix}REFRESH_ACCESS_TOKEN`;
const REFRESH_ACCESS_TOKEN_SUCCESS = `${prefix}REFRESH_ACCESS_TOKEN_SUCCESS`;

export const types = {
  ERROR_UNAUTHORIZED,
  FETCH_PROFILE,
  FETCH_PROFILE_CANCEL,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT,
  REFRESH_ACCESS_TOKEN,
  REFRESH_ACCESS_TOKEN_SUCCESS,
};


/*
 * ACTIONS
 */

/**
 * Informs application that user is not authenticated with the server (401 HTTP code).
 *
 * @method
 * @return {{type: string}}
 */
const errorUnauthorized = (payload = {}) => ({
  type: ERROR_UNAUTHORIZED,
  payload,
});

/**
 * Creates action with profile request details.
 *
 * @method
 * @param {Object} [options] - request config
 * @return {{type: string, payload: { url: string, method: string}}}
 */
const fetchProfile = options => ({
  type: FETCH_PROFILE,
  payload: {
    url: '/users/me',
    method: 'get',
    ...options,
  },
});

/**
 * Creates action for profile request cancelling.
 *
 * @method
 * @return {{type: string}}
 */
const fetchProfileCancel = () => ({
  type: FETCH_PROFILE_CANCEL,
});

/**
 * Creates action for profile request failing.
 *
 * @method
 * @param {Object} [error] - Response error.
 * @return {{ type: string, error: * }}
 */
const fetchProfileFailure = (error = {}) => ({
  type: FETCH_PROFILE_FAILURE,
  error,
});

/**
 * Creates action for successful profile request.
 *
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const fetchProfileSuccess = data => ({
  type: FETCH_PROFILE_SUCCESS,
  data,
});

/**
 * Creates action with login request details.
 *
 * @method
 * @param {Object} params
 * @param {Object} params.data - request data
 * @param {string} params.data.login
 * @param {string} params.data.password
 * @param {Object} [params.options] - request options
 * @param {Function} [params.onSuccess] - function, which will be called when login succeed
 * @return {{type: string, payload: { url: string, method: string, data: *}}}
 */
const login = ({ data, options, onSuccess }) => ({
  type: LOGIN,
  payload: {
    url: '/login',
    method: 'post',
    ...options,
    data,
  },
  onSuccess,
});

/**
 * Creates action for login request failing.
 *
 * @method
 * @param {Object} [error] - Response error.
 * @return {{ type: string, error: * }}
 */
const loginFailure = (error = {}) => ({
  type: LOGIN_FAILURE,
  error,
});

/**
 * Creates action for users/mesuccessful login request.
 *
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  data,
});

/**
 * Creates action with login request details.
 *
 * @method
 * @param {Object} [params]
 * @param {Object} [params.options] - request options
 * @param {Function} [params.onSuccess] - function, which will be called when logout succeed
 * @return {{type: string, payload: { url: string, method: string, data: *}}}
 */
const logout = ({ options, onSuccess } = {}) => ({
  type: LOGOUT,
  payload: {
    url: '/logout',
    method: 'post',
    ...options,
  },
  onSuccess,
});

/**
 * Creates action for successful logout request.
 *
 * @method
 * @return {{type: string, data: *}}
 */
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

/**
 * Creates action for JWT token refreshing.
 *
 * @method
 * @param {Object} data - request data
 * @param {Object} [options] - request options
 * @return {{type: string, payload: { url: string, method: string, data: *}}}
 */
const refreshAccessToken = (data, options) => ({
  type: REFRESH_ACCESS_TOKEN,
  payload: {
    url: '/refresh',
    method: 'post',
    ...options,
    data,
  },
});

/**
 * Creates action for successful refreshed token.
 *
 * @method
 * @param {*} data - response body
 * @return {{type: string, data: *}}
 */
const refreshAccessTokenSuccess = data => ({
  type: REFRESH_ACCESS_TOKEN_SUCCESS,
  data,
});

export const actions = {
  errorUnauthorized,
  fetchProfile,
  fetchProfileCancel,
  fetchProfileFailure,
  fetchProfileSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
  refreshAccessToken,
  refreshAccessTokenSuccess,
};


/*
 * SELECTORS
 */

/**
 * Returns current state.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getState = state => state[name];

/**
 * Returns request error.
 *
 * @method
 * @param {Object} state
 * @return {null}
 */
const getError = state => getState(state).error;

/**
 * Returns user's sign in credentials.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getCredentials = state => getState(state).credentials;

/**
 * Returns user's profile.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getProfile = state => getState(state).profile;

/**
 * Checks if user is authenticated.
 *
 * @method
 * @param {Object} state
 * @return {boolean}
 */
const isAuthenticated = state => getState(state).isAuthenticated;

export const selectors = {
  getCredentials,
  getError,
  getState,
  getProfile,
  isAuthenticated,
};


/*
 * LOGIC
 */

const fetchProfileLogic = createLogic({
  type: [
    FETCH_PROFILE,
  ],
  cancelType: [
    FETCH_PROFILE_CANCEL,
    LOGOUT,
  ],
  async process({ action: { payload }, httpClient, cancelled$ }, dispatch, done) {
    try {
      const { data, status } = await httpClient.cancellable(payload, cancelled$);

      if (status === 200 || status === 204) {
        dispatch(fetchProfileSuccess(data));
      } else {
        dispatch(fetchProfileFailure());
      }
    } catch (error) {
      dispatch(fetchProfileFailure());
    }

    done();
  },
});

const fetchProfileOnLoginSuccessLogic = createLogic({
  type: [
    LOGIN_SUCCESS,
  ],
  cancelType: [
    FETCH_PROFILE_CANCEL,
  ],
  async process(options, dispatch, done) {
    dispatch(fetchProfile());
    done();
  },
});

const loginLogic = createLogic({
  type: [
    LOGIN,
  ],
  async process({ action: { payload, onSuccess }, httpClient }, dispatch, done) {
    try {
      const { data, status } = await httpClient(payload);

      if (status === 200 || status === 204) {
        dispatch(loginSuccess(data));
        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(loginFailure());
      }
    } catch (error) {
      dispatch(loginFailure());
    }

    done();
  },
});

const logoutLogic = createLogic({
  type: [
    LOGOUT,
  ],
  async process({
    action: { payload, onSuccess }, httpClient, getState: getReduxState,
  }, dispatch, done) {
    if (isAuthenticated(getReduxState())) {
      const { accessToken, refreshToken } = getCredentials(getReduxState());
      httpClient({
        ...payload,
        data: {
          accessToken,
          refreshToken,
        },
      });

      dispatch(logoutSuccess());

      if (onSuccess) {
        onSuccess();
      }
    }

    done();
  },
});

const unauthorizedLogic = createLogic({
  type: [
    ERROR_UNAUTHORIZED,
  ],
  async process({ action: { payload }, getState: getReduxState }, dispatch, done) {
    const state = getReduxState();
    const isUserAuthenticated = isAuthenticated(state);

    if (isUserAuthenticated) {
      dispatch(logout(payload));
    }

    done();
  },
});

export const logic = {
  fetchProfileLogic,
  fetchProfileOnLoginSuccessLogic,
  loginLogic,
  logoutLogic,
  unauthorizedLogic,
};


/*
 * REDUCERS
 */
// export for test purposes
export const defaultInitialState = {
  credentials: {},
  error: null,
  isAuthenticated: false,
  profile: {},
};

const reducer = (initialState = defaultInitialState) => (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        error: initialState.error,
        isAuthenticated: true,
        profile: action.data,
      };
    case LOGIN:
      return {
        ...state,
        error: initialState.error,
      };
    case FETCH_PROFILE_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        credentials: {
          ...action.data,
        },
        error: initialState.error,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        credentials: initialState.credentials,
        error: initialState.error,
        isAuthenticated: false,
        profile: initialState.profile,
      };
    case REFRESH_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        credentials: {
          ...action.data,
        },
        error: initialState.error,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default reducer;
