import reducer, {
  actions,
  apiURL,
  name,
  selectors,
  types,
  defaultInitialState,
} from './order';


/*
 * Initial state
 */

const initialState = {
  details: null,
  entries: null,
  error: null,
  transaction: null,
};

const appState = {
  config: {},
  [name]: initialState,
};

function onFailure() {}
function onSuccess() {}

const axiosResponseError = {
  data: {
    a: 1,
  },
  status: 500,
};


/*
 * Helper functions
 */

function generateState(data) {
  return {
    ...initialState,
    ...data,
  };
}

function generateAppState(data) {
  return {
    ...appState,
    [name]: {
      ...generateState(data),
    },
  };
}


/*
 * Tests
 */

describe('actions', () => {
  it('should create an action to clear order from state', () => {
    const { clearOrder } = actions;
    const { CLEAR_ORDER } = types;
    const expectedValue = {
      type: CLEAR_ORDER,
    };

    expect(clearOrder()).toEqual(expectedValue);
  });

  it('should create an action to clear order from state', () => {
    const { clearTransaction } = actions;
    const { CLEAR_TRANSACTION } = types;
    const expectedValue = {
      type: CLEAR_TRANSACTION,
    };

    expect(clearTransaction()).toEqual(expectedValue);
  });

  it('should create an action to make order placement request', () => {
    const { sendOrder } = actions;
    const { SEND_ORDER } = types;
    const data = { a: 1 };
    const options = { b: 2 };
    const expectedValue = {
      type: SEND_ORDER,
      payload: {
        url: apiURL,
        method: 'post',
        data,
      },
    };

    expect(sendOrder({ data })).toEqual(expectedValue);

    expectedValue.payload = {
      ...expectedValue.payload,
      ...options,
    };

    expect(sendOrder({ data, options })).toEqual(expectedValue);

    expectedValue.onFailure = onFailure;
    expectedValue.onSuccess = onSuccess;

    expect(sendOrder({
      data, options, onFailure, onSuccess,
    })).toEqual(expectedValue);
  });

  it('should create an action to cancel order placement request', () => {
    const { sendOrderCancel } = actions;
    const { SEND_ORDER_CANCEL } = types;
    const expectedValue = {
      type: SEND_ORDER_CANCEL,
    };

    expect(sendOrderCancel()).toEqual(expectedValue);
  });

  it('should create an action to fail order placement request', () => {
    const { sendOrderFailure } = actions;
    const { SEND_ORDER_FAILURE } = types;
    const expectedValue = {
      type: SEND_ORDER_FAILURE,
      error: {},
    };

    expect(sendOrderFailure()).toEqual(expectedValue);

    expectedValue.error = axiosResponseError;

    expect(sendOrderFailure(axiosResponseError)).toEqual(expectedValue);
  });

  it('should create an action to succeed item request', () => {
    const { sendOrderSuccess } = actions;
    const { SEND_ORDER_SUCCESS } = types;
    const data = { a: 1 };
    const expectedValue = {
      type: SEND_ORDER_SUCCESS,
      data,
    };

    expect(sendOrderSuccess(data)).toEqual(expectedValue);
  });

  it('should create an action to update order details information', () => {
    const { updateDetails } = actions;
    const { UPDATE_DETAILS } = types;
    const data = { a: 1 };
    const expectedValue = {
      type: UPDATE_DETAILS,
      data,
    };

    expect(updateDetails(data)).toEqual(expectedValue);
  });

  it('should create an action to update order entries information', () => {
    const { updateEntries } = actions;
    const { UPDATE_ENTRIES } = types;
    const data = { a: 1 };
    const expectedValue = {
      type: UPDATE_ENTRIES,
      data,
    };

    expect(updateEntries(data)).toEqual(expectedValue);
  });
});

describe('selectors', () => {
  describe('using getState', () => {
    it(`should return ${name} state`, () => {
      const { getState } = selectors;

      expect(getState(appState)).toEqual(initialState);
    });
  });

  describe('using getError', () => {
    it('should return null if there was no error', () => {
      const { getError } = selectors;

      expect(getError(appState)).toBeNull();
    });

    it('should return some error message if there was an error', () => {
      const { getError } = selectors;
      const error = 'omg';
      const state = generateAppState({ error });

      expect(getError(state)).toEqual(error);
    });
  });

  describe('using getDetails', () => {
    it('should return null if there is no order details', () => {
      const { getDetails } = selectors;

      expect(getDetails(appState)).toBeNull();
    });

    it('should return order details', () => {
      const { getDetails } = selectors;
      const expectedValue = { id: 1 };
      const state = generateAppState({ details: expectedValue });

      expect(getDetails(state)).toEqual(expectedValue);
    });
  });

  describe('using getEntries', () => {
    it('should return null if there are no ticket entries', () => {
      const { getEntries } = selectors;

      expect(getEntries(appState)).toBeNull();
    });

    it('should return order entries', () => {
      const { getEntries } = selectors;
      const expectedValue = [
        { id: 1 },
        { id: 2 },
      ];
      const state = generateAppState({ entries: expectedValue });

      expect(getEntries(state)).toEqual(expectedValue);
    });
  });

  describe('using getTransaction', () => {
    it('should return null if there is no transaction data', () => {
      const { getTransaction } = selectors;

      expect(getTransaction(appState)).toBeNull();
    });

    it('should return list data', () => {
      const { getTransaction } = selectors;
      const expectedValue = { id: 1 };
      const state = generateAppState({ transaction: expectedValue });

      expect(getTransaction(state)).toEqual(expectedValue);
    });
  });

  describe('using getOrder', () => {
    it('should return null keys if there is no transaction data', () => {
      const { getOrder } = selectors;
      const expectedValue = {
        details: null,
        entries: null,
      };

      expect(getOrder(appState)).toEqual(expectedValue);
    });

    it('should return list data', () => {
      const { getOrder } = selectors;
      const expectedValue = {
        details: { id: 1 },
        entries: [
          { id: 2 },
        ],
      };
      const state = generateAppState({
        details: expectedValue.details,
        entries: expectedValue.entries,
      });

      expect(getOrder(state)).toEqual(expectedValue);
    });
  });
});

describe('reducer', () => {
  it('should return default initial state', () => {
    expect(reducer()(undefined, {})).toEqual(defaultInitialState);
  });

  it('should return custom initial state', () => {
    expect(reducer(initialState)(undefined, {})).toEqual(initialState);
  });

  it('should return current state if action type was not found', () => {
    expect(reducer()(undefined, { type: 'INVALID_TYPE' })).toEqual(defaultInitialState);
  });

  it('should handle CLEAR_TRANSACTION', () => {
    const action = actions.clearTransaction();
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle SEND_ORDER_FAILURE', () => {
    let action = actions.sendOrderFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.sendOrderFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle SEND_ORDER_SUCCESS', () => {
    const transaction = { id: 1 };
    const action = actions.sendOrderSuccess(transaction);
    const expectedValue = {
      ...defaultInitialState,
      transaction,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle UPDATE_DETAILS', () => {
    const details = { id: 1 };
    const action = actions.updateDetails(details);
    const expectedValue = {
      ...defaultInitialState,
      details,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle UPDATE_ENTRIES', () => {
    const entries = [{ id: 1 }];
    const action = actions.updateEntries(entries);
    const expectedValue = {
      ...defaultInitialState,
      entries,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });
});
