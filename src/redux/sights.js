import { createLogic } from 'redux-logic';
import _find from 'lodash/find';

/**
 * Defines set of methods for managing Sight entities.
 * @module Sights
 */

/**
 * Defines interval of handling events
 * @type {number}
 */
const debounceTime = 500;

/**
 * Base API URL.
 * @type {string}
 */
export const apiURL = '/sights';

/**
 * Module name.
 * @type {string}
 */
export const name = 'sights';

/**
 * Reducer prefix.
 * @type {string}
 */
const prefix = `commons/${name}/`;

/*
 * TYPES
 */

/**
* Type used for handling content's default translation change.
* @type {string}
*/
const CHANGE_DEFAULT_TRANSLATION = `${prefix}CHANGE_DEFAULT_TRANSLATION`;

/**
 * Type used for handling content's default translation change failure.
 * @type {string}
 */
const CHANGE_DEFAULT_TRANSLATION_FAILURE = `${prefix}CHANGE_DEFAULT_TRANSLATION_FAILURE`;

/**
 * Type used for handling content's default translation change success.
 * @type {string}
 */
const CHANGE_DEFAULT_TRANSLATION_SUCCESS = `${prefix}CHANGE_DEFAULT_TRANSLATION_SUCCESS`;

/**
 * Type used for clearing search results.
 * @type {string}
 */
const CLEAR_SEARCH_RESULTS = `${prefix}CLEAR_SEARCH_RESULTS`;

/**
 * Type used for clearing currently loaded entity.
 * @type {string}
 */
const CLEAR_ITEM = `${prefix}CLEAR_ITEM`;

/**
 * Type used for handling main image creation.
 * @type {string}
 */
const CREATE_MAIN_IMAGE = `${prefix}CREATE_MAIN_IMAGE`;

/**
 * Type used for handling main image creation failure.
 * @type {string}
 */
const CREATE_MAIN_IMAGE_FAILURE = `${prefix}CREATE_MAIN_IMAGE_FAILURE`;

/**
 * Type used for handling main image creation success.
 * @type {string}
 */
const CREATE_MAIN_IMAGE_SUCCESS = `${prefix}CREATE_MAIN_IMAGE_SUCCESS`;

/**
 * Type used for handling entity creation.
 * @type {string}
 */
const CREATE_ITEM = `${prefix}CREATE_ITEM`;

/**
 * Type used for handling entity creation failure.
 * @type {string}
 */
const CREATE_ITEM_FAILURE = `${prefix}CREATE_ITEM_FAILURE`;

/**
 * Type used for handling entity creation success.
 * @type {string}
 */
const CREATE_ITEM_SUCCESS = `${prefix}CREATE_ITEM_SUCCESS`;

/**
 * Type used for handling translation creation.
 * @type {string}
 */
const CREATE_TRANSLATION = `${prefix}CREATE_TRANSLATION`;

/**
 * Type used for handling translation creation failure.
 * @type {string}
 */
const CREATE_TRANSLATION_FAILURE = `${prefix}CREATE_TRANSLATION_FAILURE`;

/**
 * Type used for handling translation creation success.
 * @type {string}
 */
const CREATE_TRANSLATION_SUCCESS = `${prefix}CREATE_TRANSLATION_SUCCESS`;

/**
 * Type used for handling entity deletion.
 * @type {string}
 */
const DELETE_ITEM = `${prefix}DELETE_ITEM`;

/**
 * Type used for handling entity deletion failure.
 * @type {string}
 */
const DELETE_ITEM_FAILURE = `${prefix}DELETE_ITEM_FAILURE`;

/**
 * Type used for handling entity deletion success.
 * @type {string}
 */
const DELETE_ITEM_SUCCESS = `${prefix}DELETE_ITEM_SUCCESS`;

/**
 * Type used for handling translation deletion.
 * @type {string}
 */
const DELETE_TRANSLATION = `${prefix}DELETE_TRANSLATION`;

/**
 * Type used for handling translation deletion failure.
 * @type {string}
 */
const DELETE_TRANSLATION_FAILURE = `${prefix}DELETE_TRANSLATION_FAILURE`;

/**
 * Type used for handling translation deletion success.
 * @type {string}
 */
const DELETE_TRANSLATION_SUCCESS = `${prefix}DELETE_TRANSLATION_SUCCESS`;

/**
 * Type used for handling entity fetching.
 * @type {string}
 */
const FETCH_ITEM = `${prefix}FETCH_ITEM`;

/**
 * Type used for handling entity fetching cancellation.
 * @type {string}
 */
const FETCH_ITEM_CANCEL = `${prefix}FETCH_ITEM_CANCEL`;

/**
 * Type used for handling entity fetching failure.
 * @type {string}
 */
const FETCH_ITEM_FAILURE = `${prefix}FETCH_ITEM_FAILURE`;

/**
 * Type used for handling entity fetching success.
 * @type {string}
 */
const FETCH_ITEM_SUCCESS = `${prefix}FETCH_ITEM_SUCCESS`;

/**
 * Type used for handling entity list fetching.
 * @type {string}
 */
const FETCH_LIST = `${prefix}FETCH_LIST`;

/**
 * Type used for handling entity list fetching cancellation.
 * @type {string}
 */
const FETCH_LIST_CANCEL = `${prefix}FETCH_LIST_CANCEL`;

/**
 * Type used for handling entity list fetching failure.
 * @type {string}
 */
const FETCH_LIST_FAILURE = `${prefix}FETCH_LIST_FAILURE`;

/**
 * Type used for handling entity list fetching success.
 * @type {string}
 */
const FETCH_LIST_SUCCESS = `${prefix}FETCH_LIST_SUCCESS`;

/**
 * Type used for handling entity search results fetching.
 * @type {string}
 */
const FETCH_SEARCH_RESULTS = `${prefix}FETCH_SEARCH_RESULTS`;

/**
 * Type used for handling entity search results fetching cancellation.
 * @type {string}
 */
const FETCH_SEARCH_RESULTS_CANCEL = `${prefix}FETCH_SEARCH_RESULTS_CANCEL`;

/**
 * Type used for handling entity search results fetching failure.
 * @type {string}
 */
const FETCH_SEARCH_RESULTS_FAILURE = `${prefix}FETCH_SEARCH_RESULTS_FAILURE`;

/**
 * Type used for handling entity search results fetching success.
 * @type {string}
 */
const FETCH_SEARCH_RESULTS_SUCCESS = `${prefix}FETCH_SEARCH_RESULTS_SUCCESS`;

/**
 * Type used for handling entity updates.
 * @type {string}
 */
const UPDATE_ITEM = `${prefix}UPDATE_ITEM`;

/**
 * Type used for handling entity updates failure.
 * @type {string}
 */
const UPDATE_ITEM_FAILURE = `${prefix}UPDATE_ITEM_FAILURE`;

/**
 * Type used for handling entity updates success.
 * @type {string}
 */
const UPDATE_ITEM_SUCCESS = `${prefix}UPDATE_ITEM_SUCCESS`;

export const types = {
  CHANGE_DEFAULT_TRANSLATION,
  CHANGE_DEFAULT_TRANSLATION_FAILURE,
  CHANGE_DEFAULT_TRANSLATION_SUCCESS,
  CLEAR_SEARCH_RESULTS,
  CLEAR_ITEM,
  CREATE_MAIN_IMAGE,
  CREATE_MAIN_IMAGE_FAILURE,
  CREATE_MAIN_IMAGE_SUCCESS,
  CREATE_ITEM,
  CREATE_ITEM_FAILURE,
  CREATE_ITEM_SUCCESS,
  CREATE_TRANSLATION,
  CREATE_TRANSLATION_FAILURE,
  CREATE_TRANSLATION_SUCCESS,
  DELETE_ITEM,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_TRANSLATION,
  DELETE_TRANSLATION_FAILURE,
  DELETE_TRANSLATION_SUCCESS,
  FETCH_ITEM,
  FETCH_ITEM_CANCEL,
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_SUCCESS,
  FETCH_LIST,
  FETCH_LIST_CANCEL,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS,
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_CANCEL,
  FETCH_SEARCH_RESULTS_FAILURE,
  FETCH_SEARCH_RESULTS_SUCCESS,
  UPDATE_ITEM,
  UPDATE_ITEM_FAILURE,
  UPDATE_ITEM_SUCCESS,
};


/*
 * ACTIONS
 */

/**
 * Creates action for default translation change request.
 * @method
 * @callback failureCallback
 * @callback successCallback
 * @param {number} id - item id
 * @param {Object} options - request config
 * @param {string} options.headers.content-language - new default translation code
 * @param {failureCallback} [onFailure] - failure callback
 * @param {successCallback} [onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const changeDefaultTranslation = ({
  id, options, onFailure, onSuccess,
} = {}) => ({
  type: CHANGE_DEFAULT_TRANSLATION,
  payload: {
    url: `${apiURL}/${id}/defaultLanguage`,
    method: 'patch',
    ...options,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for default translation change request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const changeDefaultTranslationFailure = ({ data, status } = {}) => ({
  type: CHANGE_DEFAULT_TRANSLATION_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful default translation change request.
 * @method
 * @return {{type: string}}
 */
const changeDefaultTranslationSuccess = () => ({
  type: CHANGE_DEFAULT_TRANSLATION_SUCCESS,
});

/**
 * Creates action for search results removal.
 * @method
 * @return {{type: string}}
 */
const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

/**
 * Creates action for item removal.
 * @method
 * @return {{type: string}}
 */
const clearItem = () => ({
  type: CLEAR_ITEM,
});

/**
 * Creates action with item creation request details.
 * @method
 * @param {Object} params
 * @param {Object} params.data - request data
 * @param {Object} [params.options] - request config
 * @param {failureCallback} [params.onFailure] - failure callback
 * @param {successCallback} [params.onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, data: *, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const createItem = ({
  data, options, onFailure, onSuccess,
} = {}) => ({
  type: CREATE_ITEM,
  payload: {
    url: apiURL,
    method: 'post',
    ...options,
    data,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for item creation request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const createItemFailure = ({ data, status } = {}) => ({
  type: CREATE_ITEM_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful item creation request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const createItemSuccess = data => ({
  type: CREATE_ITEM_SUCCESS,
  data,
});


/**
 * Creates action with main image creation request details.
 * @method
 * @param {number} id - item id
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
const createMainImage = ({
  id, data, options = {}, onFailure, onSuccess,
}) => ({
  type: CREATE_MAIN_IMAGE,
  payload: {
    url: `${apiURL}/${id}/mainImage`,
    method: 'put',
    ...options,
    headers: {
      'content-type': 'image/jpeg',
      ...options.headers,
    },
    data,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for main image creation request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const createMainImageFailure = ({ data, status } = {}) => ({
  type: CREATE_MAIN_IMAGE_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful main image creation request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const createMainImageSuccess = data => ({
  type: CREATE_MAIN_IMAGE_SUCCESS,
  data,
});

/**
 * Creates action with translation creation request details.
 * @method
 * @param {Object} params
 * @param {Object} params.data - request data
 * @param {Object} [params.options] - request config
 * @param {failureCallback} [params.onFailure] - failure callback
 * @param {successCallback} [params.onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, data: *, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const createTranslation = ({
  data, options, onFailure, onSuccess,
} = {}) => ({
  type: CREATE_TRANSLATION,
  payload: {
    url: apiURL,
    method: 'post',
    ...options,
    data,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for translation creation request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const createTranslationFailure = ({ data, status } = {}) => ({
  type: CREATE_TRANSLATION_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful translation creation request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const createTranslationSuccess = data => ({
  type: CREATE_TRANSLATION_SUCCESS,
  data,
});

/**
 * Creates action with item deletion request details.
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
const deleteItem = ({
  id, options, onFailure, onSuccess,
} = {}) => ({
  type: DELETE_ITEM,
  payload: {
    url: `${apiURL}/${id}`,
    method: 'delete',
    ...options,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for item deletion request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const deleteItemFailure = ({ data, status } = {}) => ({
  type: DELETE_ITEM_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful item deletion request.
 * @method
 * @return {{type: string}}
 */
const deleteItemSuccess = () => ({
  type: DELETE_ITEM_SUCCESS,
});

/**
 * Creates action with translation deletion request details.
 * @method
 * @param {number} id - item id
 * @param {Object} options - request config
 * @param {Object} pathParams - URL path params
 * @param {failureCallback} [onFailure] - failure callback
 * @param {successCallback} [onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const deleteTranslation = ({
  id, pathParams = {}, options, onFailure, onSuccess,
} = {}) => {
  const path = Object.entries(pathParams).reduce((acc, [key, value]) => `${acc}/${key}/${value}`, '');

  return ({
    type: DELETE_TRANSLATION,
    payload: {
      url: `${apiURL}/${id}${path}`,
      method: 'delete',
      ...options,
    },
    onFailure,
    onSuccess,
  });
};

/**
 * Creates action for translation deletion request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const deleteTranslationFailure = ({ data, status } = {}) => ({
  type: DELETE_TRANSLATION_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful translation deletion request.
 * @method
 * @return {{type: string}}
 */
const deleteTranslationSuccess = () => ({
  type: DELETE_TRANSLATION_SUCCESS,
});

/**
 * Creates action with item request details.
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
const fetchItem = ({
  id, options, onFailure, onSuccess,
} = {}) => ({
  type: FETCH_ITEM,
  payload: {
    url: `${apiURL}/${id}`,
    method: 'get',
    ...options,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for item request cancelling.
 * @method
 * @return {{type: string}}
 */
const fetchItemCancel = () => ({
  type: FETCH_ITEM_CANCEL,
});

/**
 * Creates action for item request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const fetchItemFailure = ({ data, status } = {}) => ({
  type: FETCH_ITEM_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful item request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const fetchItemSuccess = data => ({
  type: FETCH_ITEM_SUCCESS,
  data,
});

/**
 * Creates action with list request details.
 * @method
 * @param {Object} params
 * @param {Object} [params.data] - request data
 * @param {Object} [params.options] - request config
 * @param {failureCallback} [params.onFailure] - failure callback
 * @param {successCallback} [params.onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, data: *, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const fetchList = ({
  data, options, onFailure, onSuccess,
} = {}) => ({
  type: FETCH_LIST,
  payload: {
    url: apiURL,
    method: 'get',
    ...options,
    data,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for list request cancelling.
 * @method
 * @return {{type: string}}
 */
const fetchListCancel = () => ({
  type: FETCH_LIST_CANCEL,
});

/**
 * Creates action for list request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const fetchListFailure = ({ data, status } = {}) => ({
  type: FETCH_LIST_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful list request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const fetchListSuccess = data => ({
  type: FETCH_LIST_SUCCESS,
  data,
});

/**
 * Creates action with search request details.
 * @method
 * @param {Object} params - request data
 * @param {Object} [options] - request config
 * @param {failureCallback} [onFailure] - failure callback
 * @param {successCallback} [onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, params: *, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const fetchSearchResults = ({
  params, options, onFailure, onSuccess,
} = {}) => ({
  type: FETCH_SEARCH_RESULTS,
  payload: {
    url: `${apiURL}/search`,
    method: 'get',
    ...options,
    params,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for search request cancelling.
 * @method
 * @return {{type: string}}
 */
const fetchSearchResultsCancel = () => ({
  type: FETCH_SEARCH_RESULTS_CANCEL,
});

/**
 * Creates action for search request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const fetchSearchResultsFailure = ({ data, status } = {}) => ({
  type: FETCH_SEARCH_RESULTS_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful search request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const fetchSearchResultsSuccess = data => ({
  type: FETCH_SEARCH_RESULTS_SUCCESS,
  data,
});

/**
 * Creates action with item update request details.
 * @method
 * @param {Object} params
 * @param {Object} id - item id
 * @param {Object} data - request body
 * @param {Object} pathParams - URL path params
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
const updateItem = ({
  id, data, pathParams, options, onFailure, onSuccess,
} = {}) => {
  const path = Object.entries(pathParams).reduce((acc, [key, value]) => `${acc}/${key}/${value}`, '');

  return ({
    type: UPDATE_ITEM,
    payload: {
      url: `${apiURL}/${id}${path}`,
      method: 'put',
      ...options,
      data,
    },
    onFailure,
    onSuccess,
  });
}

/**
 * Creates action for item update request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const updateItemFailure = ({ data, status } = {}) => ({
  type: UPDATE_ITEM_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful item creation request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const updateItemSuccess = data => ({
  type: UPDATE_ITEM_SUCCESS,
  data,
});

export const actions = {
  changeDefaultTranslation,
  changeDefaultTranslationFailure,
  changeDefaultTranslationSuccess,
  clearSearchResults,
  clearItem,
  createMainImage,
  createMainImageFailure,
  createMainImageSuccess,
  createItem,
  createItemFailure,
  createItemSuccess,
  createTranslation,
  createTranslationFailure,
  createTranslationSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  deleteTranslation,
  deleteTranslationFailure,
  deleteTranslationSuccess,
  fetchItem,
  fetchItemCancel,
  fetchItemFailure,
  fetchItemSuccess,
  fetchList,
  fetchListCancel,
  fetchListFailure,
  fetchListSuccess,
  fetchSearchResults,
  fetchSearchResultsCancel,
  fetchSearchResultsFailure,
  fetchSearchResultsSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess,
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

/**
 * Returns currently loaded Sight.
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getSight = state => getState(state).item;

/**
 * Returns currently loaded Sights list.
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getSights = state => getState(state).list;

/**
 * Returns Sight with specified id from Sights list.
 * @method
 * @param {Object} state - redux state
 * @param {number} id - Sight id
 * @return {*}
 */
const getSightById = (state, id) => {
  const list = getSights(state);

  return _find(list, { id }) || null;
};

export const selectors = {
  getError,
  getSight,
  getSightById,
  getSights,
  getState,
};

/*
 * LOGIC
 */

/**
 * Logic used for handling change default language request.
 * @method
 */
const changeDefaultLanguageLogic = createLogic({
  type: [
    CHANGE_DEFAULT_TRANSLATION,
  ],
  async process(
    { action: { payload, onFailure, onSuccess }, httpClient, cancelled$ },
    dispatch,
    done,
  ) {
    try {
      const response = await httpClient.cancellable(payload, cancelled$);
      const { status } = response;

      if (status === 200 || status === 204) {
        dispatch(changeDefaultTranslationSuccess());

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(changeDefaultTranslationFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(changeDefaultTranslationFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling entity search results clearing.
 * @method
 */
const clearSearchResultsLogic = createLogic({
  type: [
    CLEAR_SEARCH_RESULTS,
  ],
  latest: true,
  debounce: debounceTime,
  async process(options, dispatch, done) {
    dispatch(fetchList());
    done();
  },
});

/**
 * Logic used for handling entity creation.
 * @method
 */
const createItemLogic = createLogic({
  type: [
    CREATE_ITEM,
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
        dispatch(createItemSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(createItemFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(createItemFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling main image creation.
 * @method
 */
const createMainImageLogic = createLogic({
  type: [
    CREATE_MAIN_IMAGE,
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
        dispatch(createMainImageSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(createMainImageFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(createMainImageFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling translation creation.
 * @method
 */
const createTranslationLogic = createLogic({
  type: [
    CREATE_TRANSLATION,
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
        dispatch(createItemSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(createItemFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(createItemFailure(response));

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
const deleteItemLogic = createLogic({
  type: [
    DELETE_ITEM,
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
        dispatch(deleteItemSuccess());

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(deleteItemFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(deleteItemFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling translation deletion.
 * @method
 */
const deleteLanguageLogic = createLogic({
  type: [
    DELETE_TRANSLATION,
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
        dispatch(deleteItemSuccess());

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(deleteItemFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(deleteItemFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling entity fetching.
 * @method
 */
const fetchItemLogic = createLogic({
  type: [
    FETCH_ITEM,
  ],
  cancelType: [
    FETCH_ITEM_CANCEL, CLEAR_ITEM,
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
        dispatch(fetchItemSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(fetchItemFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(fetchItemFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling entity list fetching.
 * @method
 */
const fetchListLogic = createLogic({
  type: [
    FETCH_LIST,
  ],
  cancelType: [
    FETCH_LIST_CANCEL,
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

      if (status === 200) {
        dispatch(fetchListSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(fetchListFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(fetchListFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling entity search results fetching.
 * @method
 */
const fetchSearchResultsLogic = createLogic({
  type: [
    FETCH_SEARCH_RESULTS,
  ],
  cancelType: [
    FETCH_SEARCH_RESULTS_CANCEL,
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
        dispatch(fetchSearchResultsSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(fetchSearchResultsFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(fetchSearchResultsFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for handling entity updates.
 * @method
 */
const updateItemLogic = createLogic({
  type: [
    UPDATE_ITEM,
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

      if (status === 200 || status === 201) {
        dispatch(updateItemSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(updateItemFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(updateItemFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

export const logic = {
  changeDefaultLanguageLogic,
  clearSearchResultsLogic,
  createItemLogic,
  createMainImageLogic,
  createTranslationLogic,
  deleteItemLogic,
  deleteLanguageLogic,
  fetchItemLogic,
  fetchListLogic,
  fetchSearchResultsLogic,
  updateItemLogic,
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
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        error: initialState.error,
        list: initialState.list,
      };
    case CLEAR_ITEM:
      return {
        ...state,
        error: initialState.error,
        item: initialState.item,
      };
    case CHANGE_DEFAULT_TRANSLATION_FAILURE:
    case CREATE_ITEM_FAILURE:
    case CREATE_MAIN_IMAGE_FAILURE:
    case CREATE_TRANSLATION_FAILURE:
    case DELETE_ITEM_FAILURE:
    case DELETE_TRANSLATION_FAILURE:
    case FETCH_ITEM_FAILURE:
    case FETCH_LIST_FAILURE:
    case FETCH_SEARCH_RESULTS_FAILURE:
    case UPDATE_ITEM_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case CHANGE_DEFAULT_TRANSLATION_SUCCESS:
    case CREATE_ITEM_SUCCESS:
    case CREATE_MAIN_IMAGE_SUCCESS:
    case DELETE_TRANSLATION_SUCCESS:
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        error: initialState.error,
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        error: initialState.error,
        item: action.data,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        error: initialState.error,
        list: action.data.items,
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        error: initialState.error,
        list: action.data.items,
      };
    default:
      return state;
  }
};

export default reducer;
