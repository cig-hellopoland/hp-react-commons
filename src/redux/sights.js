/* eslint-disable-next-line no-unused-vars */
import regeneratorRuntime from '@babel/runtime/regenerator';
import { createLogic } from 'redux-logic';
import _find from 'lodash/find';
import { actions as sightEventsActions } from './sightEvents';

const debounceTime = 500;

export const name = 'sights';
const prefix = `commons/${name}/`;

/*
 * TYPES
 */

const CLEAR_SEARCH_RESULTS = `${prefix}CLEAR_SEARCH_RESULTS`;
const CLEAR_ITEM = `${prefix}CLEAR_ITEM`;
const CREATE_ITEM = `${prefix}CREATE_ITEM`;
const CREATE_ITEM_FAILURE = `${prefix}CREATE_ITEM_FAILURE`;
const CREATE_ITEM_SUCCESS = `${prefix}CREATE_ITEM_SUCCESS`;
const DELETE_ITEM = `${prefix}DELETE_ITEM`;
const DELETE_ITEM_FAILURE = `${prefix}DELETE_ITEM_FAILURE`;
const DELETE_ITEM_SUCCESS = `${prefix}DELETE_ITEM_SUCCESS`;
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
  CLEAR_SEARCH_RESULTS,
  CLEAR_ITEM,
  CREATE_ITEM,
  CREATE_ITEM_FAILURE,
  CREATE_ITEM_SUCCESS,
  DELETE_ITEM,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
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
 * Creates action for search results removal.
 *
 * @method
 * @return {{type: string}}
 */
const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
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
 * Creates action with item creation request details.
 *
 * @method
 * @param {Object} data - request data
 * @param {Object} [options] - request config
 * @return {{type: string, payload: {url: string, method: string}}}
 */
const createItem = (data, options) => ({
  type: CREATE_ITEM,
  payload: {
    url: '/sights',
    method: 'post',
    ...options,
    data,
  },
});

/**
 * Creates action for item creation request failing.
 *
 * @method
 * @param {Object} error
 * @return {{type: string, error: *}}
 */
const createItemFailure = (error = {}) => ({
  type: CREATE_ITEM_FAILURE,
  error,
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
 * Creates action with item deletion request details.
 *
 * @method
 * @param {number} id - item id
 * @param {Object} [options] - request config
 * @return {{type: string, payload: {url: string, method: string}}}
 */
const deleteItem = (id, options) => ({
  type: DELETE_ITEM,
  payload: {
    url: `/sights/${id}`,
    method: 'delete',
    ...options,
  },
});

/**
 * Creates action for item deletion request failing.
 *
 * @method
 * @param {Object} [error]
 * @return {{type: string, error: *}}
 */
const deleteItemFailure = (error = {}) => ({
  type: DELETE_ITEM_FAILURE,
  error,
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
 * Creates action with item request details.
 *
 * @method
 * @param {number} id - item id
 * @param {Object} [options] - request config
 * @return {{type: string, payload: {url: string, method: string}}}
 */
const fetchItem = (id, options) => ({
  type: FETCH_ITEM,
  payload: {
    url: `/sights/${id}`,
    method: 'get',
    ...options,
  },
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
 * @param {Object} [error]
 * @return {{type: string, error: *}}
 */
const fetchItemFailure = (error = {}) => ({
  type: FETCH_ITEM_FAILURE,
  error,
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
 * @param {Object} [data] - request data
 * @param {Object} [options] - request config
 * @return {{type: string, payload: {url: string, method: string}}}
 */
const fetchList = (data, options) => ({
  type: FETCH_LIST,
  payload: {
    url: '/sights',
    method: 'get',
    ...options,
    data,
  },
});

/**
 * Creates action for list request cancelling.
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
 * @param {Object} error
 * @return {{type: string, error: *}}
 */
const fetchListFailure = (error = {}) => ({
  type: FETCH_LIST_CANCEL,
  error,
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
 * @param {Object} data - request data
 * @param {Object} [options] - request config
 * @return {{type: string, payload: {url: string, method: string}}}
 */
const fetchSearchResults = (data, options) => ({
  type: FETCH_SEARCH_RESULTS,
  payload: {
    url: '/sights/search',
    method: 'post',
    ...options,
    data,
  },
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
 * @param {Object} [error]
 * @return {{type: string, error: *}}
 */
const fetchSearchResultsFailure = (error = {}) => ({
  type: FETCH_SEARCH_RESULTS_FAILURE,
  error,
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
 * @param {Object} id - item id
 * @param {Object} data - request body
 * @param {Object} [options] - request config
 * @return {{type: string, payload: {url: string, method: string}}}
 */
const updateItem = (id, data, options) => ({
  type: UPDATE_ITEM,
  payload: {
    url: `/sights/${id}`,
    method: 'put',
    ...options,
    data,
  },
});

/**
 * Creates action for item update request failing.
 *
 * @method
 * @param {Object} [error]
 * @return {{type: string, error: *}}
 */
const updateItemFailure = (error = {}) => ({
  type: UPDATE_ITEM_FAILURE,
  error,
});

/**
 * Creates action for successful item creation request.
 *
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const updateItemSuccess = data => ({
  type: UPDATE_ITEM_SUCCESS,
  data,
});

export const actions = {
  clearSearchResults,
  clearItem,
  createItem,
  createItemFailure,
  createItemSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
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
 * Returns currently loaded Sight.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getSight = state => getState(state).item;

/**
 * Returns currently loaded Sights list.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getSights = state => getState(state).list;

/**
 * Returns Sight with specified id from Sights list.
 *
 * @method
 * @param {Object} state
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

const clearSightSearchResultsLogic = createLogic({
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

const createSightItemLogic = createLogic({
  type: [
    CREATE_ITEM,
  ],
  latest: true,
  async process({ action: { payload }, httpClient, cancelled$ }, dispatch, done) {
    try {
      const { data, status } = await httpClient.cancellable(payload, cancelled$);

      if (status === 200 || status === 201) {
        dispatch(createItemSuccess(data));
        dispatch(fetchList());
        dispatch(sightEventsActions.fetchList());
      } else {
        dispatch(createItemFailure());
      }
    } catch (error) {
      dispatch(createItemFailure());
    }

    done();
  },
});

const deleteSightItemLogic = createLogic({
  type: [
    DELETE_ITEM,
  ],
  latest: true,
  async process({ action: { payload }, httpClient, cancelled$ }, dispatch, done) {
    try {
      const { status } = await httpClient.cancellable(payload, cancelled$);

      if (status === 200 || status === 204) {
        dispatch(deleteItemSuccess());
        dispatch(fetchList());
        dispatch(sightEventsActions.fetchList());
      } else {
        dispatch(deleteItemFailure());
      }
    } catch (error) {
      dispatch(deleteItemFailure());
    }

    done();
  },
});

const fetchSightItemLogic = createLogic({
  type: [
    FETCH_ITEM,
  ],
  cancelType: [
    FETCH_ITEM_CANCEL,
  ],
  latest: true,
  async process({ action: { payload }, httpClient, cancelled$ }, dispatch, done) {
    try {
      const { data, status } = await httpClient.cancellable(payload, cancelled$);

      if (status === 200 || status === 204) {
        dispatch(fetchItemSuccess(data));
      } else {
        dispatch(fetchListFailure());
      }
    } catch (error) {
      dispatch(fetchListFailure());
    }

    done();
  },
});

const fetchSightListLogic = createLogic({
  type: [
    FETCH_LIST,
  ],
  cancelType: [
    FETCH_LIST_CANCEL,
  ],
  latest: true,
  async process({ action: { payload }, httpClient, cancelled$ }, dispatch, done) {
    try {
      const { data, status } = await httpClient.cancellable(payload, cancelled$);

      if (status === 200 || status === 204) {
        dispatch(fetchListSuccess(data));
      } else {
        dispatch(fetchListFailure());
      }
    } catch (error) {
      dispatch(fetchListFailure());
    }

    done();
  },
});

const fetchSightSearchResultsLogic = createLogic({
  type: [
    FETCH_SEARCH_RESULTS,
  ],
  cancelType: [
    FETCH_SEARCH_RESULTS_CANCEL,
  ],
  latest: true,
  async process({ action: { payload }, httpClient, cancelled$ }, dispatch, done) {
    try {
      const { data, status } = await httpClient.cancellable(payload, cancelled$);

      if (status === 200 || status === 204) {
        dispatch(fetchSearchResultsSuccess(data));
      } else {
        dispatch(fetchListFailure());
      }
    } catch (error) {
      dispatch(fetchListFailure());
    }

    done();
  },
});

const updateSightItemLogic = createLogic({
  type: [
    UPDATE_ITEM,
  ],
  latest: true,
  async process({ action: { payload }, httpClient, cancelled$ }, dispatch, done) {
    try {
      const { data, status } = await httpClient.cancellable(payload, cancelled$);

      if (status === 200) {
        dispatch(updateItemSuccess(data));
        dispatch(fetchList());
        dispatch(sightEventsActions.fetchList());
      } else {
        dispatch(updateItemFailure());
      }
    } catch (error) {
      dispatch(updateItemFailure());
    }

    done();
  },
});

export const logic = {
  clearSightSearchResultsLogic,
  createSightItemLogic,
  deleteSightItemLogic,
  fetchSightItemLogic,
  fetchSightListLogic,
  fetchSightSearchResultsLogic,
  updateSightItemLogic,
};


/*
 * REDUCERS
 */
// export for test purposes
export const defaultInitialState = {
  error: false,
  item: {},
  list: [],
};

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
    case CREATE_ITEM_FAILURE:
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
