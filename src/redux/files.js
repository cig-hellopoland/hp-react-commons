import { createLogic } from 'redux-logic';

/**
 * Defines set of methods for managing files.
 * @module Files
 */

/**
 * Base API URL.
 * @type {string}
 */
export const apiURL = '/files';


/**
 * Module name.
 * @type {string}
 */
export const name = 'files';

/**
 * Reducer prefix.
 * @type {string}
 */
const prefix = `${name}/`;

/*
 * TYPES
 */

/**
 * Type used for clear error.
 * @type {string}
 */
const CLEAR_ERROR = `${prefix}CLEAR_ERROR`;

/**
 * Type used for upload file.
 * @type {string}
 */
const CREATE_FILE = `${prefix}CREATE_FILE`;

/**
 * Type used for handling file upload request failure.
 * @type {string}
 */
const CREATE_FILE_FAILURE = `${prefix}CREATE_FILE_FAILURE`;

/**
 * Type used for handling file upload request success.
 * @type {string}
 */
const CREATE_FILE_SUCCESS = `${prefix}CREATE_FILE_SUCCESS`;

export const types = {
  CLEAR_ERROR,
  CREATE_FILE,
  CREATE_FILE_FAILURE,
  CREATE_FILE_SUCCESS,
};

/*
 * ACTIONS
 */

/**
 * Creates action for clear error
 * @method
 * @return {{type: string}}
 */
const clearError = () => ({ type: CLEAR_ERROR });

/**
 * Creates action with file upload request details.
 * @method
 * @param {Object} data - request data
 * @param {Object} [options] - request config
 * @param {failureCallback} [onFailure] - failure callback
 * @param {successCallback} [onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, data: *, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const createFile = ({
  options = {}, data, onFailure, onSuccess,
} = {}) => ({
  type: CREATE_FILE,
  payload: {
    url: `${apiURL}/files`,
    method: 'post',
    data,
    ...options,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for upload file request failing.
 * @method
 * @param data - response body
 * @param status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const createFileFailure = ({ data, status } = {}) => ({
  type: CREATE_FILE_FAILURE,
  error: {
    data,
    status,
  },
});

  /**
   * Creates action for successful file upload request.
   * @method
   * @param {Object} data - response body
   * @return {{type: string, data: *}}
   */
const createFileSuccess = data => ({
  type: CREATE_FILE_SUCCESS,
  data,
});

export const actions = {
  clearError,
  createFile,
  createFileFailure,
  createFileSuccess,
};

/*
 * SELECTORS
 */

/**
 * Returns current state.
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getState = state => state[name];

/**
 * Returns request error.
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getError = state => getState(state).error;

export const selectors = {
  getError,
  getState,
};

/*
 * LOGIC
 */

/**
 * Logic used for file creation.
 * @method
 */
const createFileLogic = createLogic({
  type: [
    CREATE_FILE,
  ],
  latest: true,
  async process(
    { action: { payload, onFailure, onSuccess }, httpClient, cancelled$ },
    dispatch,
    done,
  ) {
    try {
      const response = await httpClient.cancellable(payload, cancelled$);
      const { data, status } = response;

      if (status === 200 || status === 204) {
        dispatch(createFileSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(createFileFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(createFileFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

export const logic = {
  createFileLogic,
};

/*
 * REDUCERS
 */

/**
 * Default state model.
 * @type {object}
 * @property {object|null} error - submission error
 * @property {object} item - current entity data
 * @property {object[]} list - entity list data
 */
export const defaultInitialState = {
  error: null,
  item: {},
  list: [],
};

/**
 * Module's reducer function.
 * @method
 * @param {object} initialState - allows initializing reducer with custom state
 * @return {object}
 */
const reducer = (initialState = defaultInitialState) => (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
    case CREATE_FILE_SUCCESS:
      return {
        ...state,
        error: initialState.error,
      };
    case CREATE_FILE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
