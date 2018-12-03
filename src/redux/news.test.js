import reducer, {
  actions,
  apiURL,
  name,
  selectors,
  types,
  defaultInitialState,
} from './news';


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

  it('should create an action to clear item from state', () => {
    const { clearItem } = actions;
    const { CLEAR_ITEM } = types;
    const expectedValue = {
      type: CLEAR_ITEM,
    };

    expect(clearItem()).toEqual(expectedValue);
  });

  it('should create an action to make item request', () => {
    const { fetchItem } = actions;
    const { FETCH_ITEM } = types;
    const id = 1;
    const options = { a: 1 };
    const expectedValue = {
      type: FETCH_ITEM,
      payload: {
        url: `${apiURL}/fanpage/posts/${id}`,
        method: 'get',
      },
    };

    expect(fetchItem({ id })).toEqual(expectedValue);

    expectedValue.payload = {
      ...expectedValue.payload,
      ...options,
    };

    expect(fetchItem({ id, options })).toEqual(expectedValue);

    expectedValue.onFailure = onFailure;
    expectedValue.onSuccess = onSuccess;

    expect(fetchItem({
      id, options, onFailure, onSuccess,
    })).toEqual(expectedValue);
  });

  it('should create an action to cancel item request', () => {
    const { fetchItemCancel } = actions;
    const { FETCH_ITEM_CANCEL } = types;
    const expectedValue = {
      type: FETCH_ITEM_CANCEL,
    };

    expect(fetchItemCancel()).toEqual(expectedValue);
  });

  it('should create an action to fail item request', () => {
    const { fetchItemFailure } = actions;
    const { FETCH_ITEM_FAILURE } = types;
    const expectedValue = {
      type: FETCH_ITEM_FAILURE,
      error: {},
    };

    expect(fetchItemFailure()).toEqual(expectedValue);

    expectedValue.error = axiosResponseError;

    expect(fetchItemFailure(axiosResponseError)).toEqual(expectedValue);
  });

  it('should create an action to succeed item request', () => {
    const { fetchItemSuccess } = actions;
    const { FETCH_ITEM_SUCCESS } = types;
    const data = { a: 1 };
    const expectedValue = {
      type: FETCH_ITEM_SUCCESS,
      data,
    };

    expect(fetchItemSuccess(data)).toEqual(expectedValue);
  });

  it('should create an action to make list request', () => {
    const { fetchList } = actions;
    const { FETCH_LIST } = types;
    const data = { a: 1 };
    const options = { b: 2 };
    const expectedValue = {
      type: FETCH_LIST,
      payload: {
        url: `${apiURL}/fanpage/posts`,
        method: 'get',
      },
    };

    expect(fetchList()).toEqual(expectedValue);

    expectedValue.payload = {
      ...expectedValue.payload,
      data,
      ...options,
    };

    expect(fetchList({ data, options })).toEqual(expectedValue);

    expectedValue.onFailure = onFailure;
    expectedValue.onSuccess = onSuccess;

    expect(fetchList({
      data, options, onFailure, onSuccess,
    })).toEqual(expectedValue);
  });

  it('should create an action to cancel list request', () => {
    const { fetchListCancel } = actions;
    const { FETCH_LIST_CANCEL } = types;
    const expectedValue = {
      type: FETCH_LIST_CANCEL,
    };

    expect(fetchListCancel()).toEqual(expectedValue);
  });

  it('should create an action to fail list request', () => {
    const { fetchListFailure } = actions;
    const { FETCH_LIST_FAILURE } = types;
    const expectedValue = {
      type: FETCH_LIST_FAILURE,
      error: {},
    };

    expect(fetchListFailure()).toEqual(expectedValue);

    expectedValue.error = axiosResponseError;

    expect(fetchListFailure(axiosResponseError)).toEqual(expectedValue);
  });

  it('should create an action to succeed list request', () => {
    const { fetchListSuccess } = actions;
    const { FETCH_LIST_SUCCESS } = types;
    const data = { a: 1 };
    const expectedValue = {
      type: FETCH_LIST_SUCCESS,
      data,
    };

    expect(fetchListSuccess(data)).toEqual(expectedValue);
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

  describe('using getPost', () => {
    it('should return null if there is no item data', () => {
      const { getPost } = selectors;

      expect(getPost(appState)).toBeNull();
    });

    it('should return item data', () => {
      const { getPost } = selectors;
      const expectedValue = { id: 1 };
      const state = generateAppState({ item: expectedValue });

      expect(getPost(state)).toEqual(expectedValue);
    });
  });

  describe('using getPosts', () => {
    it('should return null if there is no list data', () => {
      const { getPosts } = selectors;

      expect(getPosts(appState)).toBeNull();
    });

    it('should return list data', () => {
      const { getPosts } = selectors;
      const expectedValue = [
        { id: 1 },
        { id: 2 },
      ];
      const state = generateAppState({ list: expectedValue });

      expect(getPosts(state)).toEqual(expectedValue);
    });
  });

  describe('using getPostById', () => {
    it('should return null if there is no item data', () => {
      const { getPostById } = selectors;

      expect(getPostById(appState)).toBeNull();
      expect(getPostById(appState, 1)).toBeNull();
    });

    it('should return list data', () => {
      const { getPostById } = selectors;
      const id = 1;
      const expectedValue = [
        { id: 1 },
        { id: 2 },
      ];
      const state = generateAppState({ list: expectedValue });

      expect(getPostById(state, id)).toEqual(expectedValue[0]);
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
    expect(reducer()(initialState, { type: 'INVALID_TYPE' })).toEqual(initialState);
  });

  it('should handle CLEAR_ITEM', () => {
    const action = actions.clearItem();
    const expectedValue = {
      ...defaultInitialState,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_ITEM_FAILURE', () => {
    let action = actions.fetchItemFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.fetchItemFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_LIST_FAILURE', () => {
    let action = actions.fetchListFailure();
    const expectedValue = {
      ...defaultInitialState,
      error: {},
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);

    action = actions.fetchListFailure(axiosResponseError);
    expectedValue.error = axiosResponseError;

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_ITEM_SUCCESS', () => {
    const data = { id: 1 };
    const action = actions.fetchItemSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
      item: data,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });

  it('should handle FETCH_LIST_SUCCESS', () => {
    const data = {
      config: {},
      items: [
        { id: 1 },
        { id: 2 },
      ],
    };
    const action = actions.fetchListSuccess(data);
    const expectedValue = {
      ...defaultInitialState,
      list: data.items,
    };

    expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
  });
});
