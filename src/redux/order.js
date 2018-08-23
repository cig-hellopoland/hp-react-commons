import { createLogic } from 'redux-logic';
import { types as userTypes } from './profile';

export const name = 'order';
const prefix = `commons/${name}/`;


/*
 * TYPES
 */

const CLEAR_ORDER = `${prefix}CLEAR_ORDER`;
const CLEAR_TRANSACTION = `${prefix}CLEAR_TRANSACTION`;
const SEND_ORDER = `${prefix}SEND_ORDER`;
const SEND_ORDER_CANCEL = `${prefix}SEND_ORDER_CANCEL`;
const SEND_ORDER_FAILURE = `${prefix}SEND_ORDER_FAILURE`;
const SEND_ORDER_SUCCESS = `${prefix}SEND_ORDER_SUCCESS`;
const UPDATE_DETAILS = `${prefix}UPDATE_DETAILS`;
const UPDATE_ENTRIES = `${prefix}UPDATE_ENTRIES`;


/*
 * ACTIONS
 */

const clearTransaction = () => ({
  type: CLEAR_TRANSACTION,
});

const clearOrder = () => ({
  type: CLEAR_ORDER,
});

const sendOrder = (data, options) => ({
  type: SEND_ORDER,
  payload: {
    url: '/orders',
    method: 'post',
    ...options,
    data,
  },
});

const sendOrderCancel = () => ({
  type: SEND_ORDER_CANCEL,
});

const sendOrderFailure = (data, status) => ({
  type: SEND_ORDER_FAILURE,
  data,
  status,
});

const sendOrderSuccess = data => ({
  type: SEND_ORDER_SUCCESS,
  data,
});

const updateDetails = data => ({
  type: UPDATE_DETAILS,
  data,
});

const updateEntries = data => ({
  type: UPDATE_ENTRIES,
  data,
});


/*
 * REDUCERS
 */

const initialState = {
  details: {},
  entries: [],
  error: null,
  transaction: {},
};

function reducer(state = initialState, action) {
  const actions = {
    [CLEAR_TRANSACTION]: () => ({
      ...state,
      error: null,
      transaction: initialState.transaction,
    }),
    [CLEAR_ORDER]: () => ({
      ...initialState,
    }),
    [SEND_ORDER_FAILURE]: () => ({
      ...state,
      error: {
        ...action.data,
        status: action.status,
      },
    }),
    [SEND_ORDER_SUCCESS]: () => ({
      ...state,
      error: null,
      transaction: action.data,
    }),
    [UPDATE_DETAILS]: () => ({
      ...state,
      details: {
        ...state.details,
        ...action.data,
      },
    }),
    [UPDATE_ENTRIES]: () => ({
      ...state,
      entries: action.data.map(entry => ({
        date: entry.date,
        id: entry.id,
        quantity: entry.quantity,
      })),
    }),
  };

  return (actions[action.type] && actions[action.type]()) || state;
}


/*
 * LOGIC
 */

const clearOrderLogic = createLogic({
  type: [
    userTypes.LOGIN_SUCCESS,
    userTypes.LOGOUT_SUCCESS,
  ],
  process() {
    return clearOrder();
  },
});

const sendOrderLogic = createLogic({
  type: SEND_ORDER,
  cancelType: [
    SEND_ORDER_CANCEL,
  ],
  latest: true,
  process({ action: { payload }, httpClient, cancelled$ }) {
    return httpClient.cancellable(payload, cancelled$)
      .then(({ data }) => sendOrderSuccess(data))
      .catch(({ response: { data, status } }) => sendOrderFailure(data, status));
  },
});


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

const getDetails = state => getState(state).details;

const getEntries = state => getState(state).entries;

const getError = state => getState(state).error;

const getTransaction = state => getState(state).transaction;

const getOrder = (state) => {
  const { details, entries } = getState(state);

  return {
    details,
    entries,
  };
};


/*
 * EXPORTS
 */

export default reducer;

export const types = {
  CLEAR_TRANSACTION,
  CLEAR_ORDER,
  SEND_ORDER,
  SEND_ORDER_CANCEL,
  SEND_ORDER_FAILURE,
  SEND_ORDER_SUCCESS,
  UPDATE_DETAILS,
  UPDATE_ENTRIES,
};

export const actions = {
  clearTransaction,
  clearOrder,
  sendOrder,
  sendOrderCancel,
  sendOrderFailure,
  sendOrderSuccess,
  updateDetails,
  updateEntries,
};

export const logic = {
  clearOrderLogic,
  sendOrderLogic,
};

export const selectors = {
  getDetails,
  getEntries,
  getError,
  getTransaction,
  getOrder,
  getState,
};
