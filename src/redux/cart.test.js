import reducer, {
  actions,
  name,
  selectors,
  types,
  defaultInitialState,
} from './cart';

describe('actions', () => {
  describe('using clear', () => {
    const { clear } = actions;
    const { CART_CLEAR } = types;

    it('should create action for clearing cart', () => {
      const expectedValue = {
        type: CART_CLEAR,
      };

      expect(clear()).toEqual(expectedValue);
    });
  });
  describe('using addItem', () => {
    const { addItem } = actions;
    const { ITEM_ADD } = types;

    it('should create details for item', () => {
      const data = {
        name: 'Lorem ipsum dolor',
        entries: [],
      };
      const expectedValue = {
        type: ITEM_ADD,
        data,
      };

      expect(addItem(data)).toEqual(expectedValue);
    });

    it('should create details for single entry', () => {
      const data = {
        entries: [{ id: 1, price: 100, quantity: 1 }],
      };
      const expectedValue = {
        type: ITEM_ADD,
        data,
      };

      expect(addItem(data)).toEqual(expectedValue);
    });

    it('should create details for multiple entries', () => {
      const data = {
        entries: [
          { id: 1, price: 100, quantity: 1 },
          { id: 2, price: 200, quantity: 2 },
        ],
      };
      const expectedValue = {
        type: ITEM_ADD,
        data,
      };

      expect(addItem(data)).toEqual(expectedValue);
    });
  });

  describe('using removeItem', () => {
    const { removeItem } = actions;
    const { ITEM_REMOVE } = types;

    it('should create details for item removal', () => {
      const data = 1;
      const expectedValue = {
        type: ITEM_REMOVE,
        itemId: data,
      };

      expect(removeItem(data)).toEqual(expectedValue);
    });
  });

  describe('using updateItem', () => {
    const { updateItem } = actions;
    const { ITEM_UPDATE } = types;

    it('should create details for item', () => {
      const data = {
        itemId: 1,
        name: 'Lorem ipsum dolor',
        entries: [],
      };
      const expectedValue = {
        type: ITEM_UPDATE,
        data,
      };

      expect(updateItem(data)).toEqual(expectedValue);
    });

    it('should create details for single entry', () => {
      const data = {
        itemId: 1,
        entries: [
          {
            entryId: 1, id: 1, price: 100, quantity: 1,
          },
        ],
      };
      const expectedValue = {
        type: ITEM_UPDATE,
        data,
      };

      expect(updateItem(data)).toEqual(expectedValue);
    });

    it('should create details for multiple entries', () => {
      const data = {
        itemId: 1,
        entries: [
          {
            entryId: 1, id: 1, price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, price: 200, quantity: 2,
          },
        ],
      };
      const expectedValue = {
        type: ITEM_UPDATE,
        data,
      };

      expect(updateItem(data)).toEqual(expectedValue);
    });
  });
});

describe('selectors', () => {
  describe('using getState', () => {
    const { getState } = selectors;

    it(`should return ${name} state`, () => {
      const appState = {
        config: {},
        [name]: defaultInitialState,
      };
      expect(getState(appState)).toEqual(defaultInitialState);
    });
  });

  describe('using getEntries', () => {
    const { getEntries } = selectors;
    const state = {
      [name]: {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      },
    };

    it('should return empty array if no entries are present', () => {
      const appState = {
        [name]: defaultInitialState,
      };
      const expectedValue = [];

      expect(getEntries(appState)).toEqual(expectedValue);
    });

    it('should return all entries from state', () => {
      const expectedValue = [
        ...state[name].entries,
      ];

      expect(getEntries(state)).toEqual(expectedValue);
    });
  });

  describe('using getEntriesByKeys', () => {
    const { getEntriesByKeys } = selectors;
    const state = {
      [name]: {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      },
    };

    it('should return empty array if no entries are present', () => {
      const keys = ['id'];
      const appState = {
        [name]: defaultInitialState,
      };
      const expectedValue = [];

      expect(getEntriesByKeys(appState)(keys)).toEqual(expectedValue);
    });

    it('should return empty array if keys are missing', () => {
      const keys = [];
      const expectedValue = [];

      expect(getEntriesByKeys(state)(keys)).toEqual(expectedValue);
    });

    it('should return all entries with specified keys from state', () => {
      const keys = ['id', 'quantity'];
      const expectedValue = state[name].entries.map(({ id, quantity }) => ({ id, quantity }));

      expect(getEntriesByKeys(state)(keys)).toEqual(expectedValue);
    });
  });

  describe('using getItem', () => {
    const { getItem } = selectors;
    const state = {
      [name]: {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      },
    };

    it('should return undefined if no item was found', () => {
      const itemId = 1234567890;
      const expectedValue = undefined;

      expect(getItem(state, itemId)).toEqual(expectedValue);
    });

    it('should return item with associated entries', () => {
      const itemId = 1;
      const expectedValue = {
        itemId: 1,
        name: 'Lorem ipsum dolor',
        entries: [
          state[name].entries[0],
          state[name].entries[1],
        ],
      };

      expect(getItem(state, itemId)).toEqual(expectedValue);
    });
  });

  describe('using getItems', () => {
    const { getItems } = selectors;

    it('should return empty array if no items are present', () => {
      const state = {
        [name]: defaultInitialState,
      };
      const expectedValue = [];

      expect(getItems(state)).toEqual(expectedValue);
    });

    it('should return items with associated entries', () => {
      const state = {
        [name]: {
          items: [
            { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
            { itemId: 5, entryIds: [7] },
          ],
          entries: [
            {
              entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
            },
            {
              entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
            },
            {
              entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
            },
          ],
        },
      };
      const expectedValue = [
        {
          itemId: 1,
          name: 'Lorem ipsum dolor',
          entries: [state[name].entries[0], state[name].entries[1]],
        },
        {
          itemId: 5,
          entries: [state[name].entries[2]],
        },
      ];

      expect(getItems(state)).toEqual(expectedValue);
    });
  });

  describe('using getTotalItems', () => {
    const { getTotalItems } = selectors;

    it('should return 0 if no items are present', () => {
      const state = {
        [name]: defaultInitialState,
      };
      const expectedValue = 0;

      expect(getTotalItems(state)).toEqual(expectedValue);
    });

    it('should return number of items present in cart', () => {
      const state = {
        [name]: {
          items: [
            { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
            { itemId: 5, entryIds: [7] },
          ],
          entries: [
            {
              entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
            },
            {
              entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
            },
            {
              entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
            },
          ],
        },
      };
      const expectedValue = state[name].items.length;

      expect(getTotalItems(state)).toEqual(expectedValue);
    });
  });

  describe('using getTotalPrice', () => {
    const { getTotalPrice } = selectors;

    it('should return 0 if no items are present', () => {
      const state = {
        [name]: defaultInitialState,
      };
      const expectedValue = 0;

      expect(getTotalPrice(state)).toEqual(expectedValue);
    });

    it('should return total cost of entries present in cart', () => {
      const state = {
        [name]: {
          items: [
            { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
            { itemId: 5, entryIds: [7] },
          ],
          entries: [
            {
              entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
            },
            {
              entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
            },
            {
              entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
            },
          ],
        },
      };
      const expectedValue = 5400;

      expect(getTotalPrice(state)).toEqual(expectedValue);
    });
  });
});

describe('reducer', () => {
  it('should return default initial state', () => {
    expect(reducer()(undefined, {})).toEqual(defaultInitialState);
  });

  it('should return custom initial state', () => {
    const initialState = {
      items: [],
      entries: [],
    };

    expect(reducer(initialState)(undefined, {})).toEqual(initialState);
  });

  it('should return current state if action type was not found', () => {
    expect(reducer()(undefined, { type: 'INVALID_TYPE' })).toEqual(defaultInitialState);
  });

  describe('using ITEM_ADD', () => {
    it('should handle adding item details', () => {
      const data = {
        entries: [
          {
            id: 1, name: 'Example product', price: 100, quantity: 1,
          },
        ],
        name: 'Lorem ipsum dolor',
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          { itemId: 1, entryIds: [1], name: 'Lorem ipsum dolor' },
        ],
        entries: data.entries.map((entry, index) => ({ entryId: index + 1, ...entry })),
      };

      expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
    });

    it('should handle adding first cart item with single entry', () => {
      const data = {
        entries: [
          {
            id: 1, name: 'Example product', price: 100, quantity: 1,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          { itemId: 1, entryIds: [1] },
        ],
        entries: data.entries.map((entry, index) => ({ entryId: index + 1, ...entry })),
      };

      expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
    });

    it('should handle adding first cart item with multiple entries', () => {
      const data = {
        entries: [
          {
            id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
        ],
        entries: data.entries.map((entry, index) => ({ entryId: index + 1, ...entry })),
      };

      expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with unique single entry and dirty cart', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
        ],
      };
      const data = {
        entries: [
          {
            id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
          { itemId: 2, entryIds: [2] },
        ],
        entries: [
          ...initialState.entries,
          ...data.entries.map((entry, index) => ({ entryId: index + 2, ...entry })),
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with unique multiple entries and dirty cart', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          {
            id: 3, name: 'Example product 3', price: 300, quantity: 3,
          },
          {
            id: 4, name: 'Example product 4', price: 400, quantity: 4,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
          { itemId: 2, entryIds: [3, 4] },
        ],
        entries: [
          ...initialState.entries,
          ...data.entries.map((entry, index) => ({ entryId: index + 3, ...entry })),
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with unique single entry and dirty cart for non-linear internal id\'s', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      };
      const data = {
        entries: [
          {
            id: 3, name: 'Example product 3', price: 300, quantity: 3,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
          { itemId: 6, entryIds: [8] },
        ],
        entries: [
          ...initialState.entries,
          ...data.entries.map((entry, index) => ({ entryId: index + 8, ...entry })),
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with unique multiple entries and dirty cart for non-linear internal id\'s', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      };
      const data = {
        entries: [
          {
            id: 3, name: 'Example product 3', price: 300, quantity: 3,
          },
          {
            id: 9, name: 'Example product 9', price: 900, quantity: 9,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
          { itemId: 6, entryIds: [8, 9] },
        ],
        entries: [
          ...initialState.entries,
          ...data.entries.map((entry, index) => ({ entryId: index + 8, ...entry })),
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with known single entry and dirty cart', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
        ],
      };
      const data = {
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 3,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
        ],
        entries: [
          { ...initialState.entries[0], quantity: 4 },
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with known multiple entries and dirty cart', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 3,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 1,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
        ],
        entries: [
          { ...initialState.entries[0], quantity: 4 },
          { ...initialState.entries[1], quantity: 3 },
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with existing single entry and dirty cart', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
        ],
      };
      const data = {
        entries: [
          {
            id: 1, name: 'Example product 1', price: 100, quantity: 3,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
        ],
        entries: [
          { ...initialState.entries[0], quantity: 4 },
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with existing multiple entries and dirty cart', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          {
            id: 1, name: 'Example product 1', price: 100, quantity: 3,
          },
          {
            id: 2, name: 'Example product 2', price: 200, quantity: 1,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          ...initialState.items,
        ],
        entries: [
          { ...initialState.entries[0], quantity: 4 },
          { ...initialState.entries[1], quantity: 3 },
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding cart item with mixed multiple entries and dirty cart', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          {
            id: 1, name: 'Example product 1', price: 100, quantity: 3,
          },
          {
            id: 3, name: 'Example product 3', price: 300, quantity: 3,
          },
        ],
      };
      const action = actions.addItem(data);
      const expectedValue = {
        items: [
          { ...initialState.items[0], entryIds: [1, 2, 3] },
        ],
        entries: [
          { ...initialState.entries[0], quantity: 4 },
          initialState.entries[1],
          { entryId: 3, ...data.entries[1] },
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });
  });

  describe('using ITEM_UPDATE', () => {
    it('should do nothing if itemId was not provided', () => {
      const data = {
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
        ],
        name: 'Lorem ipsum dolor',
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        ...defaultInitialState,
      };

      expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
    });

    it('should do nothing if item with specified id was not found', () => {
      const data = {
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
        ],
        itemId: 1,
        name: 'Lorem ipsum dolor',
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        ...defaultInitialState,
      };

      expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
    });

    it('should handle updating item details', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          ...initialState.entries,
        ],
        id: 7,
        itemId: 1,
        name: 'Lorem ipsum dolor updated',
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        items: [
          {
            itemId: 1, entryIds: [1, 2], id: 7, name: 'Lorem ipsum dolor updated',
          },
        ],
        entries: [
          ...initialState.entries,
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle updating single known entry in existing item', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1 updated', price: 100, quantity: 3,
          },
          initialState.entries[1],
        ],
        itemId: 1,
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        items: [
          {
            ...initialState.items[0],
          },
        ],
        entries: [
          ...data.entries,
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle updating multiple known entries in existing item', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1 updated', price: 100, quantity: 3,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2 updated', price: 200, quantity: 4,
          },
        ],
        itemId: 1,
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        items: [
          {
            ...initialState.items[0],
          },
        ],
        entries: [
          ...data.entries,
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle adding new single entry to existing item', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          ...initialState.entries,
          {
            id: 3, name: 'Example product 3', price: 300, quantity: 3,
          },
        ],
        itemId: 1,
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        items: [
          {
            ...initialState.items[0], entryIds: [...initialState.items[0].entryIds, 3],
          },
        ],
        entries: [
          data.entries[0],
          data.entries[1],
          { ...data.entries[2], entryId: 3 },
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle updating with single entry and dirty cart for non-linear internal id\'s', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      };
      const data = {
        entries: [
          initialState.entries[2],
          {
            id: 3, name: 'Example product 3', price: 300, quantity: 3,
          },
        ],
        itemId: 5,
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        items: [
          initialState.items[0],
          { ...initialState.items[1], entryIds: [7, 8] },
        ],
        entries: [
          ...initialState.entries,
          { ...data.entries[1], entryId: 8 },
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should remove entries no longer present in item', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const data = {
        entries: [
          initialState.entries[1],
        ],
        itemId: 1,
      };
      const action = actions.updateItem(data);
      const expectedValue = {
        items: [
          {
            ...initialState.items[0], entryIds: [2],
          },
        ],
        entries: [
          data.entries[0],
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });
  });

  describe('using ITEM_REMOVE', () => {
    it('should do nothing if itemId was not provided', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const itemId = undefined;
      const action = actions.removeItem(itemId);
      const expectedValue = {
        ...initialState,
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should do nothing if item with specified id was not found', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2], name: 'Lorem ipsum dolor' },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
        ],
      };
      const itemId = 1234567;
      const action = actions.removeItem(itemId);
      const expectedValue = {
        ...initialState,
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });

    it('should handle removing item with it\'s entries from state', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      };
      const itemId = 1;
      const action = actions.removeItem(itemId);
      const expectedValue = {
        items: [
          initialState.items[1],
        ],
        entries: [
          initialState.entries[2],
        ],
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });
  });

  describe('using CART_CLEAR', () => {
    it('should clear cart contents', () => {
      const initialState = {
        items: [
          { itemId: 1, entryIds: [1, 2] },
          { itemId: 5, entryIds: [7] },
        ],
        entries: [
          {
            entryId: 1, id: 1, name: 'Example product 1', price: 100, quantity: 1,
          },
          {
            entryId: 2, id: 2, name: 'Example product 2', price: 200, quantity: 2,
          },
          {
            entryId: 7, id: 7, name: 'Example product 7', price: 700, quantity: 7,
          },
        ],
      };
      const action = actions.clear();
      const expectedValue = {
        ...defaultInitialState,
      };

      expect(reducer()(initialState, action)).toEqual(expectedValue);
    });
  });
});
