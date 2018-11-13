import { createLogic } from 'redux-logic';
import _find from 'lodash/find';

const debounceTime = 500;

export const apiURL = '/sight-events';
export const name = 'sightEvents';
const prefix = `commons/${name}/`;

/*
 * TYPES
 */

const CLEAR_AVAILABLE_TICKETS = `${prefix}CLEAR_AVAILABLE_TICKETS`;
const CLEAR_ITEM = `${prefix}CLEAR_ITEM`;
const CLEAR_SEARCH_RESULTS = `${prefix}CLEAR_SEARCH_RESULTS`;
const CREATE_ITEM = `${prefix}CREATE_ITEM`;
const CREATE_ITEM_FAILURE = `${prefix}CREATE_ITEM_FAILURE`;
const CREATE_ITEM_SUCCESS = `${prefix}CREATE_ITEM_SUCCESS`;
const CREATE_MAIN_IMAGE = `${prefix}CREATE_MAIN_IMAGE`;
const CREATE_MAIN_IMAGE_FAILURE = `${prefix}CREATE_MAIN_IMAGE_FAILURE`;
const CREATE_MAIN_IMAGE_SUCCESS = `${prefix}CREATE_MAIN_IMAGE_SUCCESS`;
const CREATE_PDF = `${prefix}CREATE_PDF`;
const CREATE_PDF_FAILURE = `${prefix}CREATE_PDF_FAILURE`;
const CREATE_PDF_SUCCESS = `${prefix}CREATE_PDF_SUCCESS`;
const DELETE_ITEM = `${prefix}DELETE_ITEM`;
const DELETE_ITEM_FAILURE = `${prefix}DELETE_ITEM_FAILURE`;
const DELETE_ITEM_SUCCESS = `${prefix}DELETE_ITEM_SUCCESS`;
const FETCH_AVAILABLE_TICKETS = `${prefix}FETCH_AVAILABLE_TICKETS`;
const FETCH_AVAILABLE_TICKETS_CANCEL = `${prefix}FETCH_AVAILABLE_TICKETS_CANCEL`;
const FETCH_AVAILABLE_TICKETS_FAILURE = `${prefix}FETCH_AVAILABLE_TICKETS_FAILURE`;
const FETCH_AVAILABLE_TICKETS_SUCCESS = `${prefix}FETCH_AVAILABLE_TICKETS_SUCCESS`;
const FETCH_ITEM = `${prefix}FETCH_ITEM`;
const FETCH_ITEM_CANCEL = `${prefix}FETCH_ITEM_CANCEL`;
const FETCH_ITEM_FAILURE = `${prefix}FETCH_ITEM_FAILURE`;
const FETCH_ITEM_SUCCESS = `${prefix}FETCH_ITEM_SUCCESS`;
const FETCH_LIST = `${prefix}FETCH_LIST`;
const FETCH_LIST_CANCEL = `${prefix}FETCH_LIST_CANCEL`;
const FETCH_LIST_FAILURE = `${prefix}FETCH_LIST_FAILURE`;
const FETCH_LIST_SUCCESS = `${prefix}FETCH_LIST_SUCCESS`;
const FETCH_SEARCH_RESULTS = `${prefix}FETCH_SEARCH_RESULTS`;
const FETCH_SEARCH_RESULTS_CANCEL = `${prefix}FETCH_SEARCH_RESULTS_CANCEL`;
const FETCH_SEARCH_RESULTS_FAILURE = `${prefix}FETCH_SEARCH_RESULTS_FAILURE`;
const FETCH_SEARCH_RESULTS_SUCCESS = `${prefix}FETCH_SEARCH_RESULTS_SUCCESS`;
const UPDATE_ITEM = `${prefix}UPDATE_ITEM`;
const UPDATE_ITEM_FAILURE = `${prefix}UPDATE_ITEM_FAILURE`;
const UPDATE_ITEM_SUCCESS = `${prefix}UPDATE_ITEM_SUCCESS`;

export const types = {
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
};


/*
 * ACTIONS
 */

/**
 * Creates action for item removal.
 *
 * @method
 * @return {{type: string}}
 */
const clearAvailableTickets = () => ({
  type: CLEAR_AVAILABLE_TICKETS,
});

/**
 * Creates action for item removal.
 *
 * @method
 * @return {{type: string}}
 */
const clearItem = () => ({
  type: CLEAR_ITEM,
});

/**
 * Creates action for search results removal.
 *
 * @method
 * @return {{type: string}}
 */
const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

/**
 * Creates action with item creation request details.
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
 *
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
 *
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
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
 *
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
 *
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const createMainImageSuccess = data => ({
  type: CREATE_MAIN_IMAGE_SUCCESS,
  data,
});

/**
 * Creates action with main image creation request details.
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
 * Creates action for main image creation request failing.
 *
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
 * Creates action for successful main image creation request.
 *
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
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
 *
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
 *
 * @method
 * @return {{type: string}}
 */
const deleteItemSuccess = () => ({
  type: DELETE_ITEM_SUCCESS,
});

/**
 * Creates action with available tickets request details.
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
 *
 * @method
 * @return {{type: string}}
 */
const fetchAvailableTicketsCancel = () => ({
  type: FETCH_AVAILABLE_TICKETS_CANCEL,
});

/**
 * Creates action for available tickets request failing.
 *
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
 *
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
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
 *
 * @method
 * @return {{type: string}}
 */
const fetchItemCancel = () => ({
  type: FETCH_ITEM_CANCEL,
});

/**
 * Creates action for item request failing.
 *
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
 *
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
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
 * Creates action for list request cancellin
g.
 *
 * @method
 * @return {{type: string}}
 */
const fetchListCancel = () => ({
  type: FETCH_LIST_CANCEL,
});

/**
 * Creates action for list request failing.
 *
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
 *
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
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
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
const fetchSearchResults = ({
  data, options, onFailure, onSuccess,

} = {}) => ({
  type: FETCH_SEARCH_RESULTS,
  payload: {
    url: `${apiURL}/search`,
    method: 'post',
    ...options,
    data,
  },
  onFailure,
  onSuccess,
});

/**
 * Creates action for search request cancelling.
 *
 * @method
 * @return {{type: string}}
 */
const fetchSearchResultsCancel = () => ({
  type: FETCH_SEARCH_RESULTS_CANCEL,
});

/**
 * Creates action for search request failing.
 *
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
 *
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
 *
 * @method
 * @callback failureCallback
 * @callback successCallback
 * @param {Object} params
 * @param {Object} params.id - item id
 * @param {Object} params.data - request body
 * @param {Object} [params.options] - request config
 * @param {failureCallback} [params.onFailure
] - failure callback
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
 *
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
 *
 * @methoddeleteItemFailure
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const updateItemSuccess = data => ({
  type: UPDATE_ITEM_SUCCESS,
  data,
});

export const actions = {
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
 * @return {*}
 */
const getError = state => getState(state).error;

/**
 * Returns currently loaded SightEvent.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getSightEvent = state => getState(state).item;

/**
 * Returns currently loaded SightEvents list.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getSightEvents = state => getState(state).list;

/**
 * Returns SightEvent with specified id from SightEvents list.
 *
 * @method
 * @param {Object} state
 * @param {number} id - Sight id
 * @return {*}
 */
const getSightEventById = (state, id) => {
  const list = getSightEvents(state);

  return _find(list, { id }) || null;
};

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
  clearSearchResultsLogic,
  createItemLogic,
  createMainImageLogic,
  createPDFLogic,
  deleteItemLogic,
  fetchAvailableTicketsLogic,
  fetchItemLogic,
  fetchListLogic,
  fetchSearchResultsLogic,
  updateItemLogic,
};


/*
 * REDUCERS
 */

// export for test purposes
export const defaultInitialState = {
  error: null,
  item: {},
  list: [],
  availableTickets: {},
};

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
    case CREATE_ITEM_FAILURE:
    case CREATE_MAIN_IMAGE_FAILURE:
    case CREATE_PDF_FAILURE:
    case DELETE_ITEM_FAILURE:
    case FETCH_ITEM_FAILURE:
    case FETCH_AVAILABLE_TICKETS_FAILURE:
    case FETCH_LIST_FAILURE:
    case FETCH_SEARCH_RESULTS_FAILURE:
    case UPDATE_ITEM_FAILURE:
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
