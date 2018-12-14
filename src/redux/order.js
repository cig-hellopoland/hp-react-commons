import { createLogic } from 'redux-logic';
import { types as userTypes } from './profile';

/**
 * Defines set of methods for managing order placement.
 * @module Order
 */

/**
 * Base API URL.
 * @type {string}
 */
export const apiURL = '/orders';

/**
 * Module name.
 * @type {string}
 */
export const name = 'order';

/**
 * Reducer prefix.
 * @type {string}
 */
const prefix = `commons/${name}/`;


/*
 * TYPES
 */

/**
 * Type used for resetting order's state.
 * @type {string}
 */
const CLEAR_ORDER = `${prefix}CLEAR_ORDER`;

/**
 * Type used for clearing transaction details.
 * @type {string}
 */
const CLEAR_TRANSACTION = `${prefix}CLEAR_TRANSACTION`;

/**
 * Type used for handling order submission.
 * @type {string}
 */
const SEND_ORDER = `${prefix}SEND_ORDER`;

/**
 * Type used for handling order cancellation.
 * @type {string}
 */
const SEND_ORDER_CANCEL = `${prefix}SEND_ORDER_CANCEL`;

/**
 * Type used for handling order failure.
 * @type {string}
 */
const SEND_ORDER_FAILURE = `${prefix}SEND_ORDER_FAILURE`;

/**
 * Type used for handling order success.
 * @type {string}
 */
const SEND_ORDER_SUCCESS = `${prefix}SEND_ORDER_SUCCESS`;

/**
 * Type used for handling order details update.
 * @type {string}
 */
const UPDATE_DETAILS = `${prefix}UPDATE_DETAILS`;

/**
 * Type used for handling order entries update.
 * @type {string}
 */
const UPDATE_ENTRIES = `${prefix}UPDATE_ENTRIES`;

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


/*
 * ACTIONS
 */

/**
 * Creates action for order removal.
 *
 * @method
 * @return {{type: string}}
 */
const clearOrder = () => ({
  type: CLEAR_ORDER,
});

/**
 * Creates action for transaction removal.
 *
 * @method
 * @return {{type: string}}
 */
const clearTransaction = () => ({
  type: CLEAR_TRANSACTION,
});

/**
 * Creates action with order request details.
 *
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
const sendOrder = ({
  data, options, onFailure, onSuccess,
} = {}) => ({
  type: SEND_ORDER,
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
 * Creates action for order request cancelling.
 *
 * @method
 * @return {{type: string}}
 */
const sendOrderCancel = () => ({
  type: SEND_ORDER_CANCEL,
});

/**
 * Creates action for order request failing.
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
const sendOrderFailure = ({ data, status } = {}) => ({
  type: SEND_ORDER_FAILURE,
  error: {
    data,
    status,
  },
});


/**
 * Creates action for successful order request.
 *
 * @method
 * @param {Object} data - response body
 * @return {{type: string, data: *}}
 */
const sendOrderSuccess = data => ({
  type: SEND_ORDER_SUCCESS,
  data,
});

/**
 * Creates action for successful order details information.
 *
 * @method
 * @param {Object} data - new details
 * @return {{type: string, data: *}}
 */
const updateDetails = data => ({
  type: UPDATE_DETAILS,
  data,
});

/**
 * Creates action for successful order entries information.
 *
 * @method
 * @param {Object[]} data - new entries
 * @return {{type: string, data: *}}
 */
const updateEntries = data => ({
  type: UPDATE_ENTRIES,
  data,
});

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


/*
 * SELECTORS
 */

/**
 * Returns current state.
 *
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getState = state => state[name];

/**
 * Returns request error.
 *
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getError = state => getState(state).error;

/**
 * Returns order details.
 *
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getDetails = state => getState(state).details;

/**
 * Returns order entries.
 *
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getEntries = state => getState(state).entries;

/**
 * Returns transaction details.
 *
 * @method
 * @param {Object} state - redux state
 * @return {*}
 */
const getTransaction = state => getState(state).transaction;

/**
 * Returns order information.
 *
 * @method
 * @param {Object} state - redux state
 * @return {{details: *, entries: *}}
 */
const getOrder = (state) => {
  const { details, entries } = getState(state);

  return {
    details,
    entries,
  };
};

export const selectors = {
  getDetails,
  getEntries,
  getError,
  getTransaction,
  getOrder,
  getState,
};


/*
 * LOGIC
 */

/**
 * Logic used for handling order clearing.
 *
 * @method
 */
const clearOrderLogic = createLogic({
  type: [
    userTypes.LOGIN_SUCCESS,
    userTypes.LOGOUT_SUCCESS,
  ],
  async process(options, dispatch, done) {
    dispatch(clearOrder());
    done();
  },
});

/**
 * Logic used for handling order submission.
 *
 * @method
 */
const sendOrderLogic = createLogic({
  type: [
    SEND_ORDER,
  ],
  cancelType: [
    SEND_ORDER_CANCEL,
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
        dispatch(sendOrderSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(sendOrderFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(sendOrderFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

export const logic = {
  clearOrderLogic,
  sendOrderLogic,
};


/*
 * REDUCERS
 */

/**
 * Default state model.
 *
 * @type {object}
 * @property {object} details - buyer's details
 * @property {object[]} entries - list of order entries
 * @property {object|null} error - submission error
 * @property {object} transaction - transaction details
 */
export const defaultInitialState = {
  details: {},
  entries: [],
  error: null,
  transaction: {},
};

/**
 * Module's reducer function.
 *
 * @method
 * @param {object} initialState - allows initializing reducer with custom state
 * @return {object}
 */
const reducer = (initialState = defaultInitialState) => (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_TRANSACTION:
      return {
        ...state,
        error: initialState.error,
        transaction: initialState.transaction,
      };
    case CLEAR_ORDER:
      return {
        ...initialState,
      };
    case SEND_ORDER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        error: initialState.error,
        transaction: action.data,
      };
    case UPDATE_DETAILS:
      return {
        ...state,
        details: {
          ...state.details,
          ...action.data,
        },
      };
    case UPDATE_ENTRIES:
      return {
        ...state,
        entries: action.data.map(entry => ({
          date: entry.date,
          id: entry.id,
          quantity: entry.quantity,
        })),
      };
    default:
      return state;
  }
};

export default reducer;
