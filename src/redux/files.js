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
 * Type used for handling entity fetching cancellation.
 * @type {string}
 */
const CREATE_FILE_CANCEL = `${prefix}CREATE_FILE_CANCEL`;

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

/**
 * Type used for handling file deletion.
 * @type {string}
 */
const DELETE_FILE = `${prefix}DELETE_FILE`;

/**
 * Type used for handling file deletion failure.
 * @type {string}
 */
const DELETE_FILE_FAILURE = `${prefix}DELETE_FILE_FAILURE`;

/**
 * Type used for handling file deletion success.
 * @type {string}
 */
const DELETE_FILE_SUCCESS = `${prefix}DELETE_FILE_SUCCESS`;

export const types = {
  CLEAR_ERROR,
  CREATE_FILE,
  CREATE_FILE_CANCEL,
  CREATE_FILE_FAILURE,
  CREATE_FILE_SUCCESS,
  DELETE_FILE,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
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
 * @param {Object} params
 * @param {Object} params.data - request data
 * @param {Object} [params.options] - request config
 * @param {failureCallback} [params.onFailure] - failure callback
 * @param {successCallback} [paraams.onSuccess] - success callback
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
 * Creates action for creating file request cancelling.
 * @method
 * @return {{type: string}}
 */

const createFileCancel = () => ({
  type: CREATE_FILE_CANCEL,
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

/**
 * Creates action with filr deletion request details.
 * @method
 * @param {Object} params
 * @param {number} params.id - item id
 * @param {Object} [params.options] - request config
 * @param {failureCallback} [params.onFailure] - failure callback
 * @param {successCallback} [params.onSuccess] - success callback
 * @return {{
  *   type: string,
  *   payload: {url: string, method: string, options: *},
  *   onFailure: failureCallback,
  *   onSuccess: successCallback
  * }}
  */
const deleteFile = ({
  id, options, onFailure, onSuccess,
} = {}) => ({
  type: DELETE_FILE,
  payload: {
    url: `${apiURL}/files/${id}`,
    method: 'delete',
    ...options,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for file deletion request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
  *   type: string,
  *   error: {data, status: number}
  * }}
  */
const deleteFileFailure = ({ data, status } = {}) => ({
  type: DELETE_FILE_FAILURE,
  error: {
    data,
    status,
  },
});

/**
  * Creates action for successful file deletion request.
  * @method
  * @return {{type: string}}
  */
const deleteFileSuccess = () => ({
  type: DELETE_FILE_SUCCESS,
});

export const actions = {
  clearError,
  createFile,
  createFileCancel,
  createFileFailure,
  createFileSuccess,
  deleteFile,
  deleteFileFailure,
  deleteFileSuccess,
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
  cancelType: [
    CREATE_FILE_CANCEL,
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

/**
 * Logic used for handling entity deletion.
 * @method
 */
const deleteFileLogic = createLogic({
  type: [
    DELETE_FILE,
  ],
  latest: true,
  async process(
    { action: { payload, onFailure, onSuccess }, httpClient, cancelled$ },
    dispatch,
    done,
  ) {
    try {
      const response = await httpClient.cancellable(payload, cancelled$);
      const { status } = response;

      if (status === 200 || status === 204) {
        dispatch(deleteFileSuccess());

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(deleteFileFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(deleteFileFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

export const logic = {
  createFileLogic,
  deleteFileLogic,
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
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        error: initialState.error,
      };
    case CREATE_FILE_FAILURE:
    case DELETE_FILE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
