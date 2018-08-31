import { createLogic } from 'redux-logic';
import { types as userTypes } from './profile';

export const apiURL = '/tickets';

export const name = 'tickets';
const prefix = `commons/${name}/`;


/*
 * TYPES
 */

const CLEAR_ITEM = `${prefix}CLEAR_ITEM`;
const CLEAR_TICKETS = `${prefix}CLEAR_TICKETS`;
const DELETE_BARCODE = `${prefix}DELETE_BARCODE`;
const DELETE_TICKET = `${prefix}DELETE_TICKET`;
const DELETE_TICKET_CANCEL = `${prefix}DELETE_TICKET_CANCEL`;
const DELETE_TICKET_FAILURE = `${prefix}DELETE_TICKET_FAILURE`;
const DELETE_TICKET_SUCCESS = `${prefix}DELETE_TICKET_SUCCESS`;
const FETCH_ITEM = `${prefix}FETCH_ITEM`;
const FETCH_ITEM_CANCEL = `${prefix}FETCH_ITEM_CANCEL`;
const FETCH_ITEM_FAILURE = `${prefix}FETCH_ITEM_FAILURE`;
const FETCH_ITEM_SUCCESS = `${prefix}FETCH_ITEM_SUCCESS`;
const FETCH_LIST = `${prefix}FETCH_LIST`;
const FETCH_LIST_CANCEL = `${prefix}FETCH_LIST_CANCEL`;
const FETCH_LIST_FAILURE = `${prefix}FETCH_LIST_FAILURE`;
const FETCH_LIST_SUCCESS = `${prefix}FETCH_LIST_SUCCESS`;
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

const clearTicketItem = id => ({
  type: CLEAR_ITEM,
  data: {
    id,
  },
});

const clearTickets = () => ({
  type: CLEAR_TICKETS,
});

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

const deleteTicketFailure = ({ data, status } = {}) => ({
  type: DELETE_TICKET_FAILURE,
  error: {
    data,
    status,
  },
});

const deleteTicketSuccess = () => ({
  type: DELETE_TICKET_SUCCESS,
  payload: {
    url: apiURL,
    method: 'get',
  },
});

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

const fetchTicketItemCancel = () => ({
  type: FETCH_ITEM_CANCEL,
});

const fetchTicketItemFailure = ({ data, status } = {}) => ({
  type: FETCH_ITEM_FAILURE,
  error: {
    data,
    status,
  },
});

const fetchTicketItemSuccess = data => ({
  type: FETCH_ITEM_SUCCESS,
  data,
});

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

const fetchTicketsListCancel = () => ({
  type: FETCH_LIST_CANCEL,
});

const fetchTicketsListFailure = ({ data, status } = {}) => ({
  type: FETCH_LIST_FAILURE,
  error: {
    data,
    status,
  },
});

const fetchTicketsListSuccess = data => ({
  type: FETCH_LIST_SUCCESS,
  data,
});

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
 * Returns state
 *
 * @method
 * @param {object} state
 * @return {object}
 */
const getState = state => state[name];

const getBarcodes = state => getState(state).barcodes;

const getBarcodeById = (state, id) => {
  const barcodes = getBarcodes(state);

  return barcodes.find(({ id: barcodeId }) => barcodeId === +id) || {};
};

const getBarcodesByTicketId = (state, id) => {
  const barcodes = getBarcodes(state);

  return barcodes.filter(({ ticketId }) => ticketId === +id);
};

const getTicketById = (state, id) => {
  const { items } = getState(state);

  return items.find(({ id: itemId }) => itemId === +id) || {};
};

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

const clearTicketsLogic = createLogic({
  type: [
    userTypes.LOGOUT_SUCCESS,
  ],
  process() {
    return clearTickets();
  },
});

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

const initialState = {
  barcodes: [],
  items: [],
  list: [],
};

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
