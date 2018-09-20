import { createLogic } from 'redux-logic';
import _find from 'lodash/find';
import _uniq from 'lodash/uniq';
import { types as profileTypes } from './profile';

export const name = 'cart';
const prefix = `commons/${name}/`;

/*
 * HELPERS
 */

function getDetailsFromState(state, entries) {
  return Object.entries(state.details).reduce((acc, detail) => {
    const [key, value] = detail;

    if (entries.indexOf(+key) === -1) {
      return acc;
    }

    return { ...acc, [key]: value };
  }, {});
}

function getEntriesFromState(state, entries) {
  return state.entries.filter(entry => entries.indexOf(entry.id) !== -1);
}

function getMerchantFromState(state, merchantId) {
  return _find(state.merchants, { id: merchantId });
}

function getProductFromState(state, entries) {
  return state.products.filter(
    product => product.entries.every(entryId => entries.indexOf(entryId) !== -1),
  )[0];
}

const getTicketsAsList = tickets => tickets.reduce((acc, ticket) => {
  const { city, id, name: ticketName } = ticket;

  const ticketEntries = ticket.entries.reduce((entryAcc, entry) => {
    const result = { ...entryAcc };

    if (entryAcc[entry.date]) {
      result[entry.date].push(entry);
    } else {
      result[entry.date] = [entry];
    }

    return result;
  }, {});

  const result = Object.values(ticketEntries).map(entries => ({
    city,
    entries,
    id,
    name: ticketName,
  }));

  return [
    ...acc,
    ...result,
  ];
}, []);

export const helpers = {
  getDetailsFromState,
  getEntriesFromState,
  getMerchantFromState,
  getProductFromState,
  getTicketsAsList,
};


/*
 * TYPES
 */

const CLEAR_SIGHT_ENTRIES = `${prefix}CLEAR_SIGHT_ENTRIES`;
const DELETE_SIGHT_ENTRIES = `${prefix}DELETE_SIGHT_ENTRIES`;
const UPDATE_SIGHT_ENTRIES = `${prefix}UPDATE_SIGHT_ENTRIES`;
const CART_ITEM_ADD = `${prefix}CART_ITEM_ADD`;
const CART_ITEM_DELETE = `${prefix}CART_ITEM_DELETE`;
const CART_ITEM_UPDATE = `${prefix}CART_ITEM_UPDATE`;
const CLEAR_CART = `${prefix}CLEAR_CART`;

export const types = {
  CART_ITEM_ADD,
  CART_ITEM_DELETE,
  CART_ITEM_UPDATE,
  CLEAR_CART,
  CLEAR_SIGHT_ENTRIES,
  DELETE_SIGHT_ENTRIES,
  UPDATE_SIGHT_ENTRIES,
};


/*
 * ACTIONS
 */

/**
 * Creates action with new cart item details
 *
 * @method
 * @param {Object} [details] - extra information about entries
 * @param {Object[]} entries - order information
 * @param {Object} [product] - product details
 * @param {Object} [merchant] - merchant details
 * @return {{
 *   type: string,
 *   data: {details, entries: Object[], product, merchant}
 * }}
 */
const cartItemAdd = ({
  details, entries, product, merchant,
} = {}) => ({
  type: CART_ITEM_ADD,
  data: {
    details,
    entries,
    product,
    merchant,
  },
});

/**
 * Creates an action for cart item deletion
 *
 * @method
 * @param {number} id - cart item id
 * @return {{
 *   type: string,
 *   data: {id: number}
 * }}
 */
const cartItemDelete = id => ({
  type: CART_ITEM_DELETE,
  data: {
    id,
  },
});

/**
 * Creates an action for cart item updates
 *
 * @method
 * @param {number} id - cart item id
 * @param {Object} [details] - extra information about entries
 * @param {Object[]} entries - order information
 * @return {{
 *   type: string,
 *   data: {id: number, details, entries: Object[]}
 * }}
 */
const cartItemUpdate = ({ id, details, entries } = {}) => ({
  type: CART_ITEM_UPDATE,
  data: {
    id,
    details,
    entries,
  },
});

const clearCart = () => ({
  type: CLEAR_CART,
});

const addSightEntries = data => ({ // TODO: delete method
  type: UPDATE_SIGHT_ENTRIES,
  data: {
    nextSightEntry: data,
    prevSightEntry: null,
  },
});

const clearSightEntries = clearCart;

const updateSightEntries = (prevSightEntry, nextSightEntry) => ({ // TODO: delete method
  type: UPDATE_SIGHT_ENTRIES,
  data: {
    nextSightEntry,
    prevSightEntry,
  },
});

export const actions = {
  cartItemAdd,
  cartItemDelete,
  cartItemUpdate,
  clearCart,
  addSightEntries,
  clearSightEntries,
  updateSightEntries,
};


/*
 * SELECTORS
 */

/**
 * Returns current state.
 *
 * @method
 * @param {Object} state
 * @return {*}
 */
const getState = state => state[name];

/**
 * Get single cart item.
 *
 * @method
 * @param {Object} state
 * @param {number} cartItemId
 * @return {{
 *   id: number,
 *   details,
 *   entries: Object[],
 *   entries,
 *   product
 * }}
 */
const getCartItem = (state, cartItemId) => {
  const localState = getState(state);
  const { items } = localState;

  const cartItem = _find(items, { id: cartItemId });

  if (!cartItem) {
    return cartItem;
  }

  const product = getProductFromState(localState, cartItem.entries);

  return {
    id: cartItemId,
    details: getDetailsFromState(localState, cartItem.entries),
    entries: getEntriesFromState(localState, cartItem.entries),
    merchant: getMerchantFromState(localState, product && product.merchantId),
    product,
  };
};

/**
 * Returns list of cart items.
 *
 * @method
 * @param {Object} state
 * @return {Object[]}
 */
const getCartItems = (state) => {
  const { items } = getState(state);

  return items.map(item => getCartItem(state, item.id));
};

const getSightEntriesAsTickets = (state) => {
  const cartItems = getCartItems(state);

  return cartItems.map(({
    id, details, entries, product,
  }) => ({
    cartItemId: id,
    id: product && product.id,
    city: product && product.location && product.location.city,
    name: product && product.name,
    entries: entries.map(entry => ({ ...entry, ...details[entry.id] })),
  }));
};

/**
 * Returns order entries.
 *
 * @method
 * @param state
 * @return {Object[]}
 */
const getEntries = state => getState(state).entries;

const getSightEntries = getCartItems;

const getTicketEntries = getEntries;

/**
 * Get number of total items in cart.
 *
 * @method
 * @param state
 * @return {number}
 */
const getTotalItems = state => getState(state).items.length;

const getTicketsQuantity = getTotalItems;

/**
 * Get total price of cart items as basic monetary value.
 *
 * @method
 * @param state
 * @return {number}
 */
const getTotalPrice = (state) => {
  const { details, entries } = getState(state);

  return entries.reduce((acc, { id, quantity }) => {
    const { price } = details[id] || {};

    if (price) {
      return acc + price * quantity;
    }

    return acc;
  }, 0);
};

export const selectors = {
  getCartItem,
  getCartItems,
  getEntries,
  getState,
  getTotalItems,
  getTotalPrice,
  getSightEntries,
  getSightEntriesAsTickets,
  getTicketEntries,
  getTicketsQuantity,
};


/*
 * LOGIC
 */

const clearCartLogic = createLogic({
  type: [
    profileTypes.LOGOUT_SUCCESS,
  ],
  process() {
    return clearCart();
  },
});

export const logic = {
  clearCartLogic,
};


/*
 * REDUCERS
 */

/**
 * Cart model
 *
 * items: Array<{ id: number, entries: Array<entryId> }>
 * entries: Array<{ id: number, quantity: number, *}> - entries for order API
 * details: { [entryId]: {price: number, *} } - extra information about entries
 * merchants: Array<{ id: number, products: Array<productId>, *}>
 * products: Array<{ id: number, merchantId: number, entries: Array<entryId>, *}>
 *
 */
export const defaultInitialState = {
  items: [],
  details: {},
  entries: [],
  products: [],
  merchants: [],
};

const reducer = (initialState = defaultInitialState) => (state = initialState, action) => {
  switch (action.type) {
    case CART_ITEM_ADD: {
      const {
        details: nextDetails, entries: nextEntries, product: nextProduct, merchant: nextMerchant,
      } = action.data;

      let cartItemId = 1;

      if (state.items.length) {
        const latestItem = state.items[state.items.length - 1];

        cartItemId = latestItem.id + 1;
      }


      // ITEMS
      let items = [...state.items];

      const hasEntries = items.some(
        item => nextEntries.every(entry => item.entries.indexOf(entry.id) !== -1),
      );

      if (!hasEntries) {
        items = [
          ...items,
          { id: cartItemId, entries: nextEntries.map(entry => entry.id) },
        ];
      }


      // DETAILS
      const details = {
        ...state.details,
        ...nextDetails,
      };


      // ENTRIES
      const entries = [
        ...state.entries.filter(entry => !_find(nextEntries, { id: entry.id })),
        ...nextEntries,
      ];


      // MERCHANTS
      let merchants = [...state.merchants];

      if (nextMerchant) {
        const isMerchantInState = !!_find(merchants, { id: nextMerchant.id });

        if (isMerchantInState) {
          merchants = merchants.map((merchant) => {
            if (merchant.id === nextMerchant.id) {
              return {
                ...merchant,
                products: _uniq([
                  ...merchant.products,
                  nextProduct.id,
                ]),
              };
            }

            return merchant;
          });
        } else {
          merchants.push({
            ...nextMerchant, // WAT
            products: [nextProduct.id],
          });
        }
      }


      // PRODUCTS
      let products = [...state.products];

      if (nextProduct) {
        const isProductInState = !!_find(products, { id: nextProduct.id });

        if (isProductInState) {
          products = products.map((product) => {
            const merchant = _find(merchants, m => m.products.indexOf(nextProduct.id) !== -1);

            if (product.id === nextProduct.id) {
              return {
                ...nextProduct,
                entries: nextEntries.map(entry => entry.id),
                merchantId: merchant && merchant.id,
              };
            }

            return product;
          });
        } else {
          const merchant = _find(merchants, m => m.products.indexOf(nextProduct.id) !== -1);

          products.push({
            ...nextProduct, // WAT
            entries: nextEntries.map(entry => entry.id),
            merchantId: merchant && merchant.id,
          });
        }
      }

      return {
        ...state,
        entries,
        details,
        items,
        merchants,
        products,
      };
    }
    case CART_ITEM_DELETE: {
      const { id } = action.data;
      const cartItem = _find(state.items, { id });

      if (!cartItem) {
        return {
          ...state,
        };
      }


      // DETAILS
      const details = Object.entries(state.details).reduce((acc, detail) => {
        const key = detail[0];
        const value = detail[1];

        if (cartItem.entries.indexOf(+key) !== -1) {
          return acc;
        }

        return {
          ...acc,
          [key]: value,
        };
      }, {});


      // ENTRIES
      const entries = state.entries.filter(entry => cartItem.entries.indexOf(entry.id) === -1);


      // ITEMS
      const items = state.items.filter(item => item.id !== id);


      // PRODUCTS
      const products = state.products
        .map(product => ({
          ...product,
          entries: product.entries.filter(entryId => cartItem.entries.indexOf(entryId) === -1),
        }))
        .filter(product => product.entries.length !== 0);


      // MERCHANTS
      const merchants = state.merchants
        .filter(merchant => products.some(({ merchantId }) => merchantId === merchant.id));

      return {
        ...state,
        details,
        entries,
        items,
        merchants,
        products,
      };
    }
    case CLEAR_CART:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
