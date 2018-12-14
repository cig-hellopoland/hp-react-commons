import { createLogic } from 'redux-logic';
import { types as userTypes } from './profile';

/**
 * Defines set of methods for managing Ticket entities.
 * @module Tickets
 */

/**
 * Base API URL.
 * @type {string}
 */
export const apiURL = '/tickets';

/**
 * Module name.
 * @type {string}
 */
export const name = 'tickets';

/**
 * Reducer prefix.
 * @type {string}
 */
const prefix = `commons/${name}/`;


/*
 * TYPES
 */

/**
 * Type used for clearing currently loaded entity.
 * @type {string}
 */
const CLEAR_ITEM = `${prefix}CLEAR_ITEM`;

/**
 * Type used for clearing currently loaded list of entities.
 * @type {string}
 */
const CLEAR_TICKETS = `${prefix}CLEAR_TICKETS`;

/**
 * Type used for handling barcode deletion.
 * @type {string}
 */
const DELETE_BARCODE = `${prefix}DELETE_BARCODE`;

/**
 * Type used for handling ticket deletion.
 * @type {string}
 */
const DELETE_TICKET = `${prefix}DELETE_TICKET`;

/**
 * Type used for handling ticket deletion cancellation.
 * @type {string}
 */
const DELETE_TICKET_CANCEL = `${prefix}DELETE_TICKET_CANCEL`;

/**
 * Type used for handling ticket deletion failure.
 * @type {string}
 */
const DELETE_TICKET_FAILURE = `${prefix}DELETE_TICKET_FAILURE`;

/**
 * Type used for handling ticket deletion success.
 * @type {string}
 */
const DELETE_TICKET_SUCCESS = `${prefix}DELETE_TICKET_SUCCESS`;

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
 * Type used for handling barcode deletion.
 * @type {string}
 */
const SET_BARCODE = `${prefix}SET_BARCODE`;

export const types = {
  CLEAR_ITEM,
  CLEAR_TICKETS,
  DELETE_BARCODE,
  DELETE_TICKET,
  DELETE_TICKET_CANCEL,
  DELETE_TICKET_FAILURE,
  DELETE_TICKET_SUCCESS,
  FETCH_ITEM,
  FETCH_ITEM_CANCEL,
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_SUCCESS,
  FETCH_LIST,
  FETCH_LIST_CANCEL,
  FETCH_LIST_FAILURE,
  FETCH_LIST_SUCCESS,
  SET_BARCODE,
};


/*
 * ACTIONS
 */

/**
 * Creates action for entity removal.
 * @method
 * @param {number} id - removable entity id.
 * @return {{
 *   type: string,
 *   data: { id: number }
 * }}
 */
const clearTicketItem = id => ({
  type: CLEAR_ITEM,
  data: {
    id,
  },
});

/**
 * Creates action for entity list removal.
 * @method
 * @return {{type: string}}
 */
const clearTickets = () => ({
  type: CLEAR_TICKETS,
});

/**
 * Creates action with item deletion request details.
 * @method
 * @param {number} id - item id
 * @param {Object} [.options] - request config
 * @param {failureCallback} [onFailure] - failure callback
 * @param {successCallback} [onSuccess] - success callback
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const deleteTicket = ({
  id, options, onSuccess, onFailure,
}) => ({
  type: DELETE_TICKET,
  payload: {
    url: `${apiURL}/${id}`,
    method: 'delete',
    ...options,
  },
  onSuccess,
  onFailure,
});

const deleteTicketCancel = () => ({
  type: DELETE_TICKET_CANCEL,
});

/**
 * Creates action for entity deletion request failing.
 * @method
 * @param {Object} params - axios response schema
 * @param params.data - response body
 * @param params.status - response status
 * @return {{
 *   type: string,
 *   error: {data, status: number}
 * }}
 */
const deleteTicketFailure = ({ data, status } = {}) => ({
  type: DELETE_TICKET_FAILURE,
  error: {
    data,
    status,
  },
});

/**
 * Creates action for successful entity deletion request.
 * @method
 * @return {{
 *   type: string,
 *   payload: { url: string, method: string }
 * }}
 */
const deleteTicketSuccess = () => ({
  type: DELETE_TICKET_SUCCESS,
  payload: {
    url: apiURL,
    method: 'get',
  },
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
const fetchTicketItem = ({
  id, options, onSuccess, onFailure,
} = {}) => ({
  type: FETCH_ITEM,
  payload: {
    url: `${apiURL}/${id}`,
    method: 'get',
    ...options,
  },
  onSuccess,
  onFailure,
});

/**
 * Creates action for item request cancelling.
 * @method
 * @return {{type: string}}
 */
const fetchTicketItemCancel = () => ({
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
const fetchTicketItemFailure = ({ data, status } = {}) => ({
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
const fetchTicketItemSuccess = data => ({
  type: FETCH_ITEM_SUCCESS,
  data,
});

/**
 * Creates action with list request details.
 * @method
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
const fetchTicketsList = ({ options, onSuccess, onFailure } = {}) => ({
  type: FETCH_LIST,
  payload: {
    url: apiURL,
    method: 'get',
    ...options,
  },
  onSuccess,
  onFailure,
});

/**
 * Creates action for list request cancelling.
 * @method
 * @return {{type: string}}
 */
const fetchTicketsListCancel = () => ({
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
const fetchTicketsListFailure = ({ data, status } = {}) => ({
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
const fetchTicketsListSuccess = data => ({
  type: FETCH_LIST_SUCCESS,
  data,
});

/**
 * Creates action for saving barcode details.
 * @method
 * @param {Object} data - barcode code
 * @return {{type: string, data: *}}
 */
const setBarcode = data => ({
  type: SET_BARCODE,
  data,
});

export const actions = {
  clearTicketItem,
  clearTickets,
  deleteTicket,
  deleteTicketCancel,
  deleteTicketFailure,
  deleteTicketSuccess,
  fetchTicketItem,
  fetchTicketItemCancel,
  fetchTicketItemFailure,
  fetchTicketItemSuccess,
  fetchTicketsList,
  fetchTicketsListCancel,
  fetchTicketsListFailure,
  fetchTicketsListSuccess,
  setBarcode,
};


/*
 * SELECTORS
 */

/**
 * Returns current state.
 * @method
 * @param {object} state - redux state
 * @return {*}
 */
const getState = state => state[name];

/**
 * Returns saved barcodes.
 * @method
 * @param {object} state - redux state
 * @return {object[]}
 */
const getBarcodes = state => getState(state).barcodes;

/**
 * Returns saved barcode with given id.
 * @method
 * @param {object} state - redux state
 * @param {number} id - barcode id
 * @return {object}
 */
const getBarcodeById = (state, id) => {
  const barcodes = getBarcodes(state);

  return barcodes.find(({ id: barcodeId }) => barcodeId === +id) || {};
};

/**
 * Returns saved barcode with given ticket id.
 * @method
 * @param {object} state - redux state
 * @param {number} id - ticket id
 * @return {object}
 */
const getBarcodesByTicketId = (state, id) => {
  const barcodes = getBarcodes(state);

  return barcodes.filter(({ ticketId }) => ticketId === +id);
};

/**
 * Returns saved ticket with given id.
 * @method
 * @param {object} state - redux state
 * @param {number} id - ticket id
 * @return {object}
 */
const getTicketById = (state, id) => {
  const { items } = getState(state);

  return items.find(({ id: itemId }) => itemId === +id) || {};
};

/**
 * Returns list of saved tickets.
 * @method
 * @param {object} state - redux state
 * @return {object[]}
 */
const getTickets = state => getState(state).list;

export const selectors = {
  getBarcodeById,
  getBarcodes,
  getBarcodesByTicketId,
  getState,
  getTicketById,
  getTickets,
};


/*
 * LOGIC
 */

/**
 * Logic used for handling entity clearing.
 * @method
 */
const clearTicketsLogic = createLogic({
  type: [
    userTypes.LOGOUT_SUCCESS,
  ],
  process() {
    return clearTickets();
  },
});

/**
 * Logic used for handling entity deletion.
 * @method
 */
const deleteTicketLogic = createLogic({
  type: [
    DELETE_TICKET,
  ],
  cancelType: [
    DELETE_TICKET_CANCEL,
  ],
  latest: true,
  async process(
    { action: { payload, onSuccess, onFailure }, httpClient, cancelled$ },
    dispatch,
    done,
  ) {
    try {
      await httpClient.cancellable(payload, cancelled$);
      dispatch(deleteTicketSuccess());

      if (onSuccess) {
        onSuccess();
      }
    } catch ({ response }) {
      dispatch(deleteTicketFailure(response));

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
const fetchTicketsItemLogic = createLogic({
  type: [
    FETCH_ITEM,
  ],
  cancelType: [
    FETCH_ITEM_CANCEL,
    CLEAR_TICKETS,
    userTypes.LOGOUT_SUCCESS,
  ],
  latest: true,
  process(
    { action: { payload, onSuccess, onFailure }, httpClient, cancelled$ },
    dispatch,
    done,
  ) {
    return httpClient.cancellable(payload, cancelled$)
      .then(({ data }) => {
        dispatch(fetchTicketItemSuccess(data));
        if (onSuccess) {
          onSuccess();
        }
        done();
      })
      .catch(({ response }) => {
        dispatch(fetchTicketItemFailure(response));
        if (onFailure) {
          onFailure();
        }
        done();
      });
  },
});

/**
 * Logic used for handling entity list fetching.
 * @method
 */
const fetchTicketsListLogic = createLogic({
  type: [
    FETCH_LIST,
    DELETE_TICKET_SUCCESS,
  ],
  cancelType: [
    FETCH_LIST_CANCEL,
    CLEAR_TICKETS,
    userTypes.LOGOUT_SUCCESS,
  ],
  latest: true,
  process(
    { action: { payload, onSuccess, onFailure }, httpClient, cancelled$ },
    dispatch,
    done,
  ) {
    return httpClient.cancellable(payload, cancelled$)
      .then(({ data }) => {
        dispatch(fetchTicketsListSuccess(data));
        if (onSuccess) {
          onSuccess();
        }
        done();
      })
      .catch(({ response }) => {
        dispatch(fetchTicketsListFailure(response));
        if (onFailure) {
          onFailure();
        }
        done();
      });
  },
});

export const logic = {
  clearTicketsLogic,
  deleteTicketLogic,
  fetchTicketsItemLogic,
  fetchTicketsListLogic,
};


/*
 * REDUCERS
 */

/**
 * Default state model.
 * @type {object}
 * @property {object[]} barcodes - list of barcodes
 * @property {object[]} items - current entity data
 * @property {object[]} list - entity list data
 */
const initialState = {
  barcodes: [],
  items: [],
  list: [],
};

/**
 * Module's reducer function.
 * @method
 * @param {object} state - redux state
 * @param {object} action - redux action
 * @return {object}
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ITEM:
      return {
        ...state,
        barcodes: [],
        items: [],
        list: [],
      };
    case CLEAR_TICKETS:
      return {
        ...initialState,
      };
    case DELETE_BARCODE: {
      const { barcodes } = state;
      const { data: { value } } = action;
      const index = barcodes.findIndex(({ value: barcodeValue }) => barcodeValue === value);

      return {
        ...state,
        barcodes: [
          ...barcodes.slice(0, index < 0 ? 0 : index),
          ...barcodes.slice(index + 1),
        ],
      };
    }
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items,
          action.data,
        ],
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.data,
      };
    case SET_BARCODE: {
      const { barcodes } = state;
      const { value } = action.data;
      const index = barcodes.findIndex(({ value: barcodeValue }) => barcodeValue === value);

      return {
        ...state,
        barcodes: [
          ...barcodes.slice(0, index < 0 ? 0 : index),
          action.data,
          ...barcodes.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
};

export default reducer;
