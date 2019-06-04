import reducer, {
  actions,
  apiURL,
  name,
  selectors,
  types,
  defaultInitialState,
} from './bookings';


/*
 * Initial state
 */

const initialState = {
  error: null,
  item: null,
  list: null,
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
  describe('using send tickets email action', () => {
    it('should create an action to make request', () => {
      const { sendTicketsEmail } = actions;
      const { SEND_TICKETS_EMAIL } = types;
      const p24Statement = 'p24-J11-A13-A41';
      const options = { a: 1 };

      const expectedValue = {
        type: SEND_TICKETS_EMAIL,
        payload: {
          url: `${apiURL}/${p24Statement}/sendTicketCopy`,
          method: 'get',
          ...options,
        },
      };

      expect(sendTicketsEmail({ p24Statement, options })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expect(sendTicketsEmail({ p24Statement, options })).toEqual(expectedValue);

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(sendTicketsEmail({
        p24Statement, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { sendTicketsEmailFailure } = actions;
      const { SEND_TICKETS_EMAIL_FAILURE } = types;
      const expectedValue = {
        type: SEND_TICKETS_EMAIL_FAILURE,
        error: {},
      };

      expect(sendTicketsEmailFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(sendTicketsEmailFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { sendTicketsEmailSuccess } = actions;
      const { SEND_TICKETS_EMAIL_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: SEND_TICKETS_EMAIL_SUCCESS,
        data,
      };

      expect(sendTicketsEmailSuccess(data)).toEqual(expectedValue);
    });
  });
});

describe('selectors', () => {
  describe('using getState', () => {
    const { getState } = selectors;

    it(`should return ${name} state`, () => {
      expect(getState(appState)).toEqual(initialState);
    });
  });

  describe('using getError', () => {
    const { getError } = selectors;

    it('should return null if there was no error', () => {
      expect(getError(appState)).toBeNull();
    });

    it('should return some error message if there was an error', () => {
      const error = 'omg';
      const state = generateAppState({ error });

      expect(getError(state)).toEqual(error);
    });
  });
});

describe('reducer', () => {
  it('should return default initial state', () => {
    expect(reducer()(undefined, {})).toEqual(defaultInitialState);
  });

  it('should handle CLEAR_ERROR', () => {
    const action = actions.clearError();
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle SEND_TICKETS_EMAIL_FAILURE', () => {
    let action = actions.sendTicketsEmailFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.sendTicketsEmailFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle SEND_TICKETS_EMAIL_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.sendTicketsEmailSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });
});
