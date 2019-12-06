import { createLogic } from 'redux-logic';

/**
 * Defines set of methods for managing bookings.
 * @module Bookings
 */

/**
 * Base API URL.
 * @type {string}
 */
export const apiURL = '/bookings';


/**
 * Module name.
 * @type {string}
 */
export const name = 'bookings';

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
 * Type used for send tickets emails.
 * @type {string}
 */
const SEND_TICKETS_EMAIL = `${prefix}SEND_TICKETS_EMAIL`;

/**
 * Type used for handling send tickets emails request failure.
 * @type {string}
 */
const SEND_TICKETS_EMAIL_FAILURE = `${prefix}SEND_TICKETS_EMAIL_FAILURE`;

/**
 * Type used for handling send tickets emails request success.
 * @type {string}
 */
const SEND_TICKETS_EMAIL_SUCCESS = `${prefix}SEND_TICKETS_EMAIL_SUCCESS`;

export const types = {
  CLEAR_ERROR,
  SEND_TICKETS_EMAIL,
  SEND_TICKETS_EMAIL_FAILURE,
  SEND_TICKETS_EMAIL_SUCCESS,
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
 * Creates action with email tickets sending request details.
 * @method
 * @param {Object} params
 * @param {Object} [params.options] - request config
 * @param {failureCallback} [params.onFailure] - failure callback
 * @param {successCallback} [params.onSuccess] - success callback
 * @param {String} [params.p24Statement] - title of trsnsaction
 * @return {{
 *   type: string,
 *   payload: {url: string, method: string, data: *, options: *},
 *   onFailure: failureCallback,
 *   onSuccess: successCallback
 * }}
 */
const sendTicketsEmail = ({
  options, onFailure, onSuccess, orderId,
} = {}) => ({
  type: SEND_TICKETS_EMAIL,
  payload: {
    url: `${apiURL}/${orderId}/sendTicketCopy`,
    method: 'get',
    ...options,
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
const sendTicketsEmailFailure = ({ data, status } = {}) => ({
  type: SEND_TICKETS_EMAIL_FAILURE,
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
const sendTicketsEmailSuccess = data => ({
  type: SEND_TICKETS_EMAIL_SUCCESS,
  data,
});

export const actions = {
  clearError,
  sendTicketsEmail,
  sendTicketsEmailFailure,
  sendTicketsEmailSuccess,
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

const sendTicketsEmailLogic = createLogic({
  type: [
    SEND_TICKETS_EMAIL,
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
        dispatch(sendTicketsEmailSuccess(data));

        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch(sendTicketsEmailFailure(response));

        if (onFailure) {
          onFailure();
        }
      }
    } catch ({ response }) {
      dispatch(sendTicketsEmailFailure(response));

      if (onFailure) {
        onFailure();
      }
    }

    done();
  },
});

export const logic = {
  sendTicketsEmailLogic,
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
    case SEND_TICKETS_EMAIL_SUCCESS:
      return {
        ...state,
        error: initialState.error,
      };
    case SEND_TICKETS_EMAIL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
