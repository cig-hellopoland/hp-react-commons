import reducer, {
  actions,
  helpers,
  name,
  selectors,
  types,
  defaultInitialState,
} from './cart';

/*
 * Initial state
 */

const initialState = {
  items: [],
  details: {},
  entries: [],
  products: [],
  merchants: [],
};

const appState = {
  config: {},
  [name]: initialState,
};

const dirtyState = {
  items: [
    { id: 1, entries: [1, 5] },
    { id: 2, entries: [13] },
    { id: 3, entries: [33] },
    { id: 7, entries: [2] },
  ],
  details: {
    1: {
      price: 1000,
      currency: 'PLN',
      name: 'Soft cover',
    },
    2: {
      price: 2000,
      currency: 'PLN',
    },
    5: {
      price: 5000,
      currency: 'PLN',
      name: 'Hard cover',
    },
    33: {
      price: 33000,
      currency: 'PLN',
      name: 'Bumper sticker',
    },
  },
  entries: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
    { id: 5, quantity: 1 },
    { id: 13, quantity: 20 },
    { id: 33, quantity: 1 },
  ],
  products: [
    {
      id: 79,
      name: 'Incredible book',
      description: 'Lorem ipsum dolor',
      entries: [1, 5],
      merchantId: 99,
    },
    {
      id: 12,
      name: 'Random plush toy',
      description: 'Hug it hard',
      entries: [2],
      merchantId: undefined,
    },
    {
      id: 334,
      name: 'Hello World bumper sticker',
      entries: [33],
      merchantId: 231,
    },
  ],
  merchants: [
    {
      id: 44,
      name: 'Book Publishing Inc.',
      products: [79],
    },
    {
      id: 231,
      name: 'Sticker producer',
      products: [334],
    },
  ],
};

// TEST HELPERS

describe('actions', () => {
  it('should create an action to add new cart item', () => {
    const { cartItemAdd } = actions;
    const { CART_ITEM_ADD } = types;
    const data = {
      details: {
        1: { price: 1000, currency: 'PLN' },
      },
      entries: [{ id: 1, quantity: 1 }],
      product: { id: 123, name: 'Paper book' },
      merchant: { id: 323, name: 'Book shop or editor' },
    };
    const expectedValue = {
      type: CART_ITEM_ADD,
      data,
    };

    expect(cartItemAdd(data)).toEqual(expectedValue);
  });

  it('should create an action to delete cart item', () => {
    const { cartItemDelete } = actions;
    const { CART_ITEM_DELETE } = types;
    const data = 3;
    const expectedValue = {
      type: CART_ITEM_DELETE,
      data: {
        id: 3,
      },
    };

    expect(cartItemDelete(data)).toEqual(expectedValue);
  });

  it('should create an action to update cart item', () => {
    const { cartItemUpdate } = actions;
    const { CART_ITEM_UPDATE } = types;
    const data = {
      id: 123,
      details: {
        1: { price: 1000, currency: 'USD' },
      },
      entries: [{ id: 1, quantity: 2 }],
    };
    const expectedValue = {
      type: CART_ITEM_UPDATE,
      data,
    };

    expect(cartItemUpdate(data)).toEqual(expectedValue);
  });

  it('should create an action to clear cart', () => {
    const { clearCart } = actions;
    const { CLEAR_CART } = types;
    const expectedValue = {
      type: CLEAR_CART,
    };

    expect(clearCart()).toEqual(expectedValue);
  });
});

describe('selectors', () => {
  describe('using getState', () => {
    it(`should return ${name} state`, () => {
      const { getState } = selectors;

      expect(getState(appState)).toEqual(initialState);
    });
  });

  describe('using getCartItem', () => {
    it('should return undefined if no item was found', () => {
      const { getCartItem } = selectors;
      const cartItemId = 42;
      const expectedValue = undefined;

      expect(getCartItem(appState, cartItemId)).toEqual(expectedValue);
    });

    it('should return cart item', () => {
      const { getCartItem } = selectors;
      const cartItemId = 1;
      const cartItem = dirtyState.items.filter(item => item.id === cartItemId)[0];
      const state = {
        ...appState,
        [name]: dirtyState,
      };
      const product = helpers.getProductFromState(dirtyState, cartItem.entries);
      const expectedValue = {
        id: cartItemId,
        entries: helpers.getEntriesFromState(dirtyState, cartItem.entries),
        details: helpers.getDetailsFromState(dirtyState, cartItem.entries),
        merchant: helpers.getMerchantFromState(dirtyState, product.merchantId),
        product,
      };

      expect(getCartItem(state, cartItemId)).toEqual(expectedValue);
    });

    // TODO: should return cart item when multiple products are found

    // TODO: should return cart item when multiple merchants are found
  });

  describe('using getCartItems', () => {
    it('should return empty list if no items were found', () => {
      const { getCartItems } = selectors;
      const expectedValue = [];

      expect(getCartItems(appState)).toEqual(expectedValue);
    });

    it('should return list of all cart items', () => {
      const { getCartItem, getCartItems } = selectors;
      const state = {
        ...appState,
        [name]: dirtyState,
      };
      const expectedValue = dirtyState.items.map(item => getCartItem(state, item.id));

      expect(getCartItems(state)).toEqual(expectedValue);
    });
  });

  describe('using getTotalItems', () => {
    it('should return the length of items array', () => {
      const { getTotalItems } = selectors;
      let expectedValue = 0;

      expect(getTotalItems(appState)).toEqual(expectedValue);

      const state = {
        ...appState,
        [name]: dirtyState,
      };

      expectedValue = 4;

      expect(getTotalItems(state)).toEqual(expectedValue);
    });
  });

  describe('using getTotalPrice', () => {
    it('should return total price of cart items', () => {
      const { getTotalPrice } = selectors;
      let expectedValue = 0;

      expect(getTotalPrice(appState)).toEqual(expectedValue);

      const state = {
        ...appState,
        [name]: dirtyState,
      };

      expectedValue = 42000;

      expect(getTotalPrice(state)).toEqual(expectedValue);
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

  describe('using CART_ITEM_ADD', () => {
    const newCartItem = {
      entries: [
        { id: 999, quantity: 1 },
      ],
      details: {
        999: {
          price: 999000,
          currency: 'PLN',
          name: 'Hard cover',
        },
      },
      product: {
        id: 912,
        name: 'Oldschool book',
      },
      merchant: {
        id: 934,
        name: 'Book Publishing Ltd.',
      },
    };

    it('should handle adding first cart item', () => {
      const data = newCartItem;
      const action = actions.cartItemAdd(data);
      const expectedValue = {
        ...defaultInitialState,
        items: [
          { id: 1, entries: data.entries.map(entry => entry.id) },
        ],
        details: data.details,
        entries: data.entries,
        products: [
          { ...data.product, entries: [data.entries[0].id], merchantId: data.merchant.id },
        ],
        merchants: [
          { ...data.merchant, products: [data.product.id] },
        ],
      };

      expect(reducer()(defaultInitialState, action)).toEqual(expectedValue);
    });

    it('should handle adding unique cart item to dirty cart', () => {
      const data = newCartItem;
      const action = actions.cartItemAdd(data);
      const latestCartItemId = dirtyState.items[dirtyState.items.length - 1].id;
      const expectedValue = {
        items: [
          ...dirtyState.items,
          { id: latestCartItemId + 1, entries: data.entries.map(entry => entry.id) },
        ],
        details: {
          ...dirtyState.details,
          ...data.details,
        },
        entries: [
          ...dirtyState.entries,
          ...data.entries,
        ],
        products: [
          ...dirtyState.products,
          { ...data.product, entries: [data.entries[0].id], merchantId: data.merchant.id },
        ],
        merchants: [
          ...dirtyState.merchants,
          { ...data.merchant, products: [data.product.id] },
        ],
      };

      expect(reducer()(dirtyState, action)).toEqual(expectedValue);
    });

    it('should handle adding known entry to dirty cart', () => {
      const entryIndex = 4;
      const entryId = dirtyState.entries[entryIndex].id;
      const data = {
        entries: [{ ...dirtyState.entries[entryIndex], quantity: 3 }],
        details: {
          [entryId]: {
            ...dirtyState.details[entryId],
            currency: 'USD',
            price: 10000,
          },
        },
        product: dirtyState.products[2],
        merchant: dirtyState.merchants[1],
      };
      const action = actions.cartItemAdd(data);
      const expectedValue = {
        items: dirtyState.items,
        details: {
          ...dirtyState.details,
          [entryId]: {
            ...data.details[entryId],
            price: 10000,
            currency: 'USD',
          },
        },
        entries: dirtyState.entries.map(entry => ({ ...entry })),
        products: dirtyState.products,
        merchants: dirtyState.merchants,
      };

      expectedValue.entries[entryIndex] = { ...data.entries[0] };

      expect(reducer()(dirtyState, action)).toEqual(expectedValue);
    });

    // TODO: should handle adding known entry with different entries
    // TODO: should handle adding known entry with removed entries
  });

  describe('using CART_ITEM_DELETE', () => {
    it('should do nothing if cartItemId was not found', () => {
      const cartItemId = 9876;
      const action = actions.cartItemDelete(cartItemId);
      const expectedValue = { ...dirtyState };

      expect(reducer()(dirtyState, action)).toEqual(expectedValue);
    });

    it('should remove cart item with it\'s dependencies', () => {
      const cartItemId = dirtyState.items[0].id;
      const cartItemEntries = dirtyState.items[0].entries;
      const action = actions.cartItemDelete(cartItemId);
      const expectedValue = {
        items: [
          ...dirtyState.items.slice(1),
        ],
        details: {
          ...Object.entries(dirtyState.details).reduce((acc, detail) => {
            const key = detail[0];
            const value = detail[1];

            if (cartItemEntries.indexOf(+key) !== -1) {
              return acc;
            }

            return {
              ...acc,
              [key]: value,
            };
          }, {}),
        },
        entries: [
          dirtyState.entries[1],
          ...dirtyState.entries.slice(3),
        ],
        products: [
          ...dirtyState.products.slice(1),
        ],
        merchants: dirtyState.merchants.slice(1),
      };

      expect(reducer()(dirtyState, action)).toEqual(expectedValue);
    });

    // TODO: should leave dependencies
  });

  describe('using CLEAR_CART', () => {
    it('should clear cart contents', () => {
      const action = actions.clearCart();
      const expectedValue = { ...initialState };

      expect(reducer()(dirtyState, action)).toEqual(expectedValue);
    });
  });
});
