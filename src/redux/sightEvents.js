import { createLogic } from 'redux-logic';
import _find from 'lodash/find';

/**
 * Defines set of methods for managing SightEvent entities.
 * @module SightEvents
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
export const apiURL = '/sight-events';

/**
 * Module name.
 * @type {string}
 */
export const name = 'sightEvents';

/**
 * Reducer prefix.
 * @type {string}
 */
const prefix = `commons/${name}/`;

/*
 * TYPES
 */

/**
 * Type used for handling change default language request.
 * @type {string}
 */
const CHANGE_DEFAULT_LANGUAGE = `${prefix}CHANGE_DEFAULT_LANGUAGE`;

/**
 * Type used for handling change default language request cancellation.
 * @type {string}
 */
const CHANGE_DEFAULT_LANGUAGE_CANCEL = `${prefix}CHANGE_DEFAULT_LANGUAGE_CANCEL`;

/**
 * Type used for handling change default language request failure.
 * @type {string}
 */
const CHANGE_DEFAULT_LANGUAGE_FAILURE = `${prefix}CHANGE_DEFAULT_LANGUAGE_FAILURE`;

/**
 * Type used for handling change default language request success.
 * @type {string}
 */
const CHANGE_DEFAULT_LANGUAGE_SUCCESS = `${prefix}CHANGE_DEFAULT_LANGUAGE_SUCCESS`;

/**
 * Type used for clearing ticket information for currently loaded entity.
 * @type {string}
 */

const CLEAR_AVAILABLE_TICKETS = `${prefix}CLEAR_AVAILABLE_TICKETS`;

/**
 * Type used for clearing currently loaded entity.
 * @type {string}
 */
const CLEAR_ITEM = `${prefix}CLEAR_ITEM`;

/**
 * Type used for clearing search results.
 * @type {string}
 */
const CLEAR_SEARCH_RESULTS = `${prefix}CLEAR_SEARCH_RESULTS`;

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
 * Type used for handling PDF document creation.
 * @type {string}
 */
const CREATE_PDF = `${prefix}CREATE_PDF`;

/**
 * Type used for handling PDF document creation failure.
 * @type {string}
 */
const CREATE_PDF_FAILURE = `${prefix}CREATE_PDF_FAILURE`;

/**
 * Type used for handling PDF document creation success.
 * @type {string}
 */
const CREATE_PDF_SUCCESS = `${prefix}CREATE_PDF_SUCCESS`;

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
 * Type used for handling PDF document deletion.
 * @type {string}
 */
const DELETE_PDF = `${prefix}DELETE_PDF`;

/**
 * Type used for handling PDF document deletion failure.
 * @type {string}
 */
const DELETE_PDF_FAILURE = `${prefix}DELETE_PDF_FAILURE`;

/**
 * Type used for handling PDF document deletion success.
 * @type {string}
 */
const DELETE_PDF_SUCCESS = `${prefix}DELETE_PDF_SUCCESS`;

/**
 * Type used for handling ticket information fetching.
 * @type {string}
 */
const FETCH_AVAILABLE_TICKETS = `${prefix}FETCH_AVAILABLE_TICKETS`;

/**
 * Type used for handling ticket information fetching cancellation.
 * @type {string}
 */
const FETCH_AVAILABLE_TICKETS_CANCEL = `${prefix}FETCH_AVAILABLE_TICKETS_CANCEL`;

/**
 * Type used for handling ticket information fetching failure.
 * @type {string}
 */
const FETCH_AVAILABLE_TICKETS_FAILURE = `${prefix}FETCH_AVAILABLE_TICKETS_FAILURE`;

/**
 * Type used for handling ticket information fetching success.
 * @type {string}
 */
const FETCH_AVAILABLE_TICKETS_SUCCESS = `${prefix}FETCH_AVAILABLE_TICKETS_SUCCESS`;

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

/**
 * Type used for handling of sell stop.
 * @type {string}
 */
const STOP_SELL = `${prefix}STOP_SELL`;

/**
 * Type used for handling entity updates failure.
 * @type {string}
 */
const STOP_SELL_FAILURE = `${prefix}STOP_SELL_FAILURE`;

/**
 * Type used for handling entity updates success.
 * @type {string}
 */
const STOP_SELL_SUCCESS = `${prefix}STOP_SELL_SUCCESS`;

export const types = {
  CHANGE_DEFAULT_LANGUAGE,
  CHANGE_DEFAULT_LANGUAGE_CANCEL,
  CHANGE_DEFAULT_LANGUAGE_FAILURE,
  CHANGE_DEFAULT_LANGUAGE_SUCCESS,
  CLEAR_AVAILABLE_TICKETS,
  CLEAR_ITEM,
  CLEAR_SEARCH_RESULTS,
  CREATE_ITEM,
  CREATE_ITEM_FAILURE,
  CREATE_ITEM_SUCCESS,
  CREATE_MAIN_IMAGE,
  CREATE_MAIN_IMAGE_FAILURE,
  CREATE_MAIN_IMAGE_SUCCESS,
  CREATE_PDF,
  CREATE_PDF_FAILURE,
  CREATE_PDF_SUCCESS,
  DELETE_ITEM,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_TRANSLATION,
  DELETE_TRANSLATION_FAILURE,
  DELETE_TRANSLATION_SUCCESS,
  DELETE_PDF,
  DELETE_PDF_FAILURE,
  DELETE_PDF_SUCCESS,
  FETCH_AVAILABLE_TICKETS,
  FETCH_AVAILABLE_TICKETS_CANCEL,
  FETCH_AVAILABLE_TICKETS_FAILURE,
  FETCH_AVAILABLE_TICKETS_SUCCESS,
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
  STOP_SELL,
  STOP_SELL_FAILURE,
  STOP_SELL_SUCCESS,
};


/*
 * ACTIONS
 */

/**
 * Creates action for change default language request.
 * @method
 * @callback failureCallback
 * @callback successCallback
 * @param {Object} params
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
const changeDefaultLanguage = ({
  id, options, onFailure, onSuccess,
} = {}) => ({
  type: CHANGE_DEFAULT_LANGUAGE,
  payload: {
    url: `${apiURL}/${id}/defaultLanguage`,
    method: 'patch',
    ...options,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for change default language request cancelling.
 * @method
 * @return {{type: string}}
 */
const changeDefaultLanguageCancel = () => ({
  type: CHANGE_DEFAULT_LANGUAGE_CANCEL,
});

/**
 * Creates action for change default language request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const changeDefaultLanguageFailure = ({ data, status } = {}) => ({
  type: CHANGE_DEFAULT_LANGUAGE_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful change default language request.
 * @method
 * @return {{type: string}}
 */
const changeDefaultLanguageSuccess = () => ({
  type: CHANGE_DEFAULT_LANGUAGE_SUCCESS,
});

/**
 * Creates action for item removal.
 * @method
 * @return {{type: string}}
 */
const clearAvailableTickets = () => ({
  type: CLEAR_AVAILABLE_TICKETS,
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
 * Creates action for search results removal.
 * @method
 * @return {{type: string}}
 */
const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
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
 * Creates action with PDF document creation request details.
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
const createPDF = ({
  id, data, options = {}, onFailure, onSuccess,
}) => ({
  type: CREATE_PDF,
  payload: {
    url: `${apiURL}/${id}/pdf`,
    method: 'post',
    ...options,
    headers: {
      'content-type': 'application/pdf',
      ...options.headers,
    },
    data,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for PDF document creation request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const createPDFFailure = ({ data, status } = {}) => ({
  type: CREATE_PDF_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful PDF document creation request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const createPDFSuccess = data => ({
  type: CREATE_PDF_SUCCESS,
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
const deleteTranslation = ({
  id, language, options, onFailure, onSuccess,
} = {}) => ({
  type: DELETE_TRANSLATION,
  payload: {
    url: `/partner${apiURL}/${id}/languageVersion/${language}`,
    method: 'delete',
    ...options,
  },
  onFailure,
  onSuccess,
});

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
 * Creates action with pdf deletion request details.
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
const deletePDF = ({
  id, options, onFailure, onSuccess,
} = {}) => ({
  type: DELETE_PDF,
  payload: {
    url: `${apiURL}/${id}/pdf`,
    method: 'delete',
    ...options,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for pdf deletion request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const deletePDFFailure = ({ data, status } = {}) => ({
  type: DELETE_PDF_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful pdf deletion request.
 * @method
 * @return {{type: string}}
 */
const deletePDFSuccess = () => ({
  type: DELETE_PDF_SUCCESS,
});

/**
 * Creates action with available tickets request details.
 * @method
 * @param {number} id - SightEvent id
 * @param {Object} options - request config
 * @param {Object} query - URL query string
 * @param onFailure - failure callback
 * @param onSuccess - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const fetchAvailableTickets = ({
  id, options, onFailure, onSuccess,
} = {}) => ({
  type: FETCH_AVAILABLE_TICKETS,
  payload: {
    url: `${apiURL}/${id}/available-tickets`,
    method: 'get',
    ...options,
  },
  sightEventId: id,
  onFailure,
  onSuccess,
});

/**
 * Creates action for available tickets request cancelling.
 * @method
 * @return {{type: string}}
 */
const fetchAvailableTicketsCancel = () => ({
  type: FETCH_AVAILABLE_TICKETS_CANCEL,
});

/**
 * Creates action for available tickets request failing.
 * @method
 * @param data - response body
 * @param status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const fetchAvailableTicketsFailure = ({ data, status } = {}) => ({
  type: FETCH_AVAILABLE_TICKETS_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful available tickets request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const fetchAvailableTicketsSuccess = data => ({
  type: FETCH_AVAILABLE_TICKETS_SUCCESS,
  data,
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
 * @param {Object} params.id - item id
 * @param {Object} params.data - request body
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
const updateItem = ({
  id, data, options, onFailure, onSuccess,
} = {}) => ({
  type: UPDATE_ITEM,
  payload: {
    url: `${apiURL}/${id}`,
    method: 'put',
    ...options,
    data,
  },
  onFailure,
  onSuccess,
});

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

/**
 * Creates action with stop sell.
 * @method
 * @param {Object} params
 * @param {Object} params.sightEventId - sightEvent id
 * @param {Object} params.ticketPoolId - ticketPoolDefinition id
 * @param {Object} params.date - user input - picked date
 * @param {failureCallback} [params.onFailure] - failure callback
 * @param {successCallback} [params.onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */

const stopSell = ({
  sightEventId, ticketPoolId, date, onFailure, onSuccess,
} = {}) => ({
  type: STOP_SELL,
  payload: {
    url: `${apiURL}/${sightEventId}/sale?tpdId=${ticketPoolId}&date=${date}`,
    method: 'delete',
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for stop sell request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */

const stopSellFailure = ({ data, status } = {}) => ({
  type: STOP_SELL_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful stop sell request.
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */

const stopSellSuccess = data => ({
  type: STOP_SELL_SUCCESS,
  data,
});

export const actions = {
  changeDefaultLanguage,
  changeDefaultLanguageCancel,
  changeDefaultLanguageFailure,
  changeDefaultLanguageSuccess,
  clearAvailableTickets,
  clearItem,
  clearSearchResults,
  createItem,
  createItemFailure,
  createItemSuccess,
  createMainImage,
  createMainImageFailure,
  createMainImageSuccess,
  createPDF,
  createPDFFailure,
  createPDFSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  deleteTranslation,
  deleteTranslationFailure,
  deleteTranslationSuccess,
  deletePDF,
  deletePDFFailure,
  deletePDFSuccess,
  fetchAvailableTickets,
  fetchAvailableTicketsCancel,
  fetchAvailableTicketsFailure,
  fetchAvailableTicketsSuccess,
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
  stopSell,
  stopSellFailure,
  stopSellSuccess,
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
 * Returns currently loaded SightEvent.
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getSightEvent = state => getState(state).item;

/**
 * Returns currently loaded SightEvents list.
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getSightEvents = state => getState(state).list;

/**
 * Returns SightEvent with specified id from SightEvents list.
 * @method
 * @param {Object} state - redux state
 * @param {number} id - Sight id
 * @return {*}
 */
const getSightEventById = (state, id) => {
  const list = getSightEvents(state);

  return _find(list, { id }) || null;
};

/**
 * Returns available tickets for current entity.
 * @param {object} state - redux state
 * @return {object}
 */
const getAvailableTickets = state => getState(state).availableTickets;

export const selectors = {
  getAvailableTickets,
  getError,
  getSightEvent,
  getSightEventById,
  getSightEvents,
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
    CHANGE_DEFAULT_LANGUAGE,
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
        dispatch(changeDefaultLanguageSuccess());

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(changeDefaultLanguageFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(changeDefaultLanguageFailure(response));

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
 * Logic used for handling PDF document creation.
 * @method
 */
const createPDFLogic = createLogic({
  type: [
    CREATE_PDF,
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
        dispatch(createPDFSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(createPDFFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(createPDFFailure(response));

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
const deleteTranslationLogic = createLogic({
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
 * Logic used for handling PDF document deletion.
 * @method
 */
const deletePDFLogic = createLogic({
  type: [
    DELETE_PDF,
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
        dispatch(deletePDFSuccess());

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(deletePDFFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(deletePDFFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

/**
 * Logic used for fetching information about available tickest.
 * @method
 */
const fetchAvailableTicketsLogic = createLogic({
  type: [
    FETCH_AVAILABLE_TICKETS,
  ],
  cancelType: [
    FETCH_AVAILABLE_TICKETS_CANCEL, CLEAR_AVAILABLE_TICKETS,
  ],
  latest: true,
  async process(
    {
      action: {
        sightEventId, payload, onFailure, onSuccess,
      }, httpClient, cancelled$,
    },
    dispatch,
    done,
  ) {
    try {
      const response = await httpClient.cancellable(payload, cancelled$);
      const { data, status } = response;

      if (status === 200 || status === 204) {
        dispatch(fetchAvailableTicketsSuccess({ ...data, ...payload.params, sightEventId }));

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

const stopSellLogic = createLogic({
  type: [
    STOP_SELL,
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

      if (status === 200 || status === 201 || status === 204) {
        dispatch(stopSellSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(stopSellFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(stopSellFailure(response));

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
  createPDFLogic,
  deleteItemLogic,
  deleteTranslationLogic,
  deletePDFLogic,
  fetchAvailableTicketsLogic,
  fetchItemLogic,
  fetchListLogic,
  fetchSearchResultsLogic,
  updateItemLogic,
  stopSellLogic,
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
 * @property {object} availableTickets - ticket details for current entity
 */
export const defaultInitialState = {
  error: null,
  item: {},
  list: [],
  availableTickets: {},
};

/**
 * Module's reducer function.
 * @method
 * @param {object} initialState - allows initializing reducer with custom state
 * @return {object}
 */
const reducer = (initialState = defaultInitialState) => (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_AVAILABLE_TICKETS:
      return {
        ...state,
        error: initialState.error,
        availableTickets: initialState.availableTickets,
      };
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
    case CHANGE_DEFAULT_LANGUAGE_FAILURE:
    case CREATE_ITEM_FAILURE:
    case CREATE_MAIN_IMAGE_FAILURE:
    case CREATE_PDF_FAILURE:
    case DELETE_ITEM_FAILURE:
    case DELETE_TRANSLATION_FAILURE:
    case FETCH_ITEM_FAILURE:
    case FETCH_AVAILABLE_TICKETS_FAILURE:
    case FETCH_LIST_FAILURE:
    case FETCH_SEARCH_RESULTS_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case STOP_SELL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case CREATE_ITEM_SUCCESS:
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        error: initialState.error,
      };
    case FETCH_AVAILABLE_TICKETS_SUCCESS:
      return {
        ...state,
        availableTickets: {
          ...action.data,
        },
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        error: initialState.error,
        item: action.data,
        availableTickets: initialState.availableTickets,
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
