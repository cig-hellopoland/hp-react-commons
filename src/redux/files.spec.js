import reducer, {
  actions,
  apiURL,
  name,
  selectors,
  types,
  defaultInitialState,
} from './files';


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
  describe('using crate file action', () => {
    it('should create an action to make request', () => {
      const { createFile } = actions;
      const { CREATE_FILE } = types;
      const data = 'hello world';
      const options = {
        a: 1,
        headers: {
          b: 2,
        },
        params: {
          c: 3,
        },
      };

      const expectedValue = {
        type: CREATE_FILE,
        payload: {
          url: `${apiURL}/files`,
          method: 'post',
          data,
          ...options,
        },
      };

      expect(createFile({ data, options })).toEqual(expectedValue);

      expectedValue.payload = {
        ...expectedValue.payload,
        ...options,
      };

      expectedValue.onFailure = onFailure;
      expectedValue.onSuccess = onSuccess;

      expect(createFile({
        data, options, onFailure, onSuccess,
      })).toEqual(expectedValue);
    });

    it('should create an action for failed request', () => {
      const { createFileFailure } = actions;
      const { CREATE_FILE_FAILURE } = types;
      const expectedValue = {
        type: CREATE_FILE_FAILURE,
        error: {},
      };

      expect(createFileFailure()).toEqual(expectedValue);

      expectedValue.error = axiosResponseError;

      expect(createFileFailure(axiosResponseError)).toEqual(expectedValue);
    });

    it('should create an action for successful request', () => {
      const { createFileSuccess } = actions;
      const { CREATE_FILE_SUCCESS } = types;
      const data = { a: 1 };
      const expectedValue = {
        type: CREATE_FILE_SUCCESS,
        data,
      };

      expect(createFileSuccess(data)).toEqual(expectedValue);
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

  it('should handle CREATE_FILE_FAILURE', () => {
    let action = actions.createFileFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.createFileFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle CREATE_FILE_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.createFileSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });
});
