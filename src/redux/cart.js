import { createLogic } from 'redux-logic';
import _isEqual from 'lodash/isEqual';
import _uniq from 'lodash/uniq';
import { types as profileTypes } from './profile';

/**
 * Defines set of methods for managing cart.
 * @module Cart
 */

/**
 * Module name.
 * @type {string}
 */
export const name = 'cart';

/**
 * Reducer prefix.
 * @type {string}
 */
const prefix = `commons/${name}/`;

/*
 * TYPES
 */

/**
 * Type used for reseting cart's state.
 * @type {string}
 */
const CART_CLEAR = `${prefix}CART_CLEAR`;

/**
 * Type used for adding new item to cart.
 * @type {string}
 */
const ITEM_ADD = `${prefix}ITEM_ADD`;

/**
 * Type used for removing item from cart.
 * @type {string}
 */
const ITEM_REMOVE = `${prefix}ITEM_REMOVE`;

/**
 * Type used for updating cart's item.
 * @type {string}
 */
const ITEM_UPDATE = `${prefix}ITEM_UPDATE`;

export const types = {
  CART_CLEAR,
  ITEM_ADD,
  ITEM_REMOVE,
  ITEM_UPDATE,
};


/*
 * ACTIONS
 */

/**
 * Clears cart.
 *
 * @method
 * @return {{
 *   type: string
 * }}
 */
const clear = () => ({
  type: CART_CLEAR,
});

/**
 * Creates action for new cart item.
 *
 * @method
 * @param {object[]} entries - cart entries details
 * @param {number} entries[].price - entry price
 * @param {number} entries[].quantity - entry quantity
 * @param {*} * - extra item details
 * @return {{
 *   type: string,
 *   data: {entries: object[]}
 * }}
 */
const addItem = ({ entries, ...rest } = {}) => ({
  type: ITEM_ADD,
  data: {
    entries,
    ...rest,
  },
});

/**
 * Creates action for cart item removal.
 *
 * @method
 * @param {number} itemId
 * @return {{
 *   type: string,
 *   itemId: number
 * }}
 */
const removeItem = itemId => ({
  type: ITEM_REMOVE,
  itemId,
});

/**
 * Creates action with new cart item details.
 *
 * @method
 * @param {object[]} entries - cart entries details
 * @param {number} entries[].price - entry price
 * @param {number} entries[].quantity
 * @param {*} * - extra item details
 * @return {{
 *   type: string,
 *   data: {entries: object[]}
 * }}
 */
const updateItem = ({ entries, ...rest } = {}) => ({
  type: ITEM_UPDATE,
  data: {
    entries,
    ...rest,
  },
});

export const actions = {
  clear,
  addItem,
  removeItem,
  updateItem,
};


/*
 * SELECTORS
 */

/**
 * Returns current state.
 *
 * @method
 * @param {object} state - redux state
 * @return {*}
 */
const getState = state => state[name];

/**
 * Returns all available entries.
 *
 * @method
 * @param {object} state - redux state
 * @return {{
 *   entryId: number,
 *   price: number,
 *   quantity: number
 * }}
 */
const getEntries = state => getState(state).entries;

/**
 * Returns all available entries reduced by provided keys.
 *
 * @method
 * @param {object} state - redux state
 * @return {*}
 */
const getEntriesByKeys = state => (keys) => {
  const { entries } = getState(state);

  if (!entries.length || !keys || !keys.length) {
    return [];
  }

  return entries.reduce((acc, entry) => {
    const nextEntry = keys.reduce((acu, key) => ({ ...acu, [key]: entry[key] }), {});

    return [...acc, nextEntry];
  }, []);
};

/**
 * Get item with specified id.
 *
 * @method
 * @param {object} state - redux state
 * @param {number} itemId - id of cart's item
 * @return {{
 *   entries: object[],
 *   itemId: number
 * }}
 */
const getItem = (state, itemId) => {
  const { entries: stateEntries, items: stateItems } = getState(state);

  const stateItem = stateItems.find(i => i.itemId === itemId);

  if (!stateItem) {
    return stateItem;
  }

  const { entryIds, ...item } = stateItem;
  const entries = stateEntries.reduce((acc, entry) => {
    const next = [...acc];
    const hasEntry = entryIds.some(entryId => entryId === entry.entryId);

    if (hasEntry) {
      next.push(entry);
    }

    return next;
  }, []);

  return {
    ...item,
    entries,
  };
};

/**
 * Get all available items.
 *
 * @param {object} state - redux state
 * @return {{
 *   entries: object[],
 *   itemId: number
 * }}
 */
const getItems = (state) => {
  const { items } = getState(state);

  return items.map(({ itemId }) => getItem(state, itemId));
};

/**
 * Get number of total items in cart.
 *
 * @method
 * @param {object} state - redux state
 * @return {number}
 */
const getTotalItems = state => getState(state).items.length;

/**
 * Get total price of items in cart.
 *
 * @method
 * @param {object} state - redux state
 * @return {number}
 */
const getTotalPrice = (state) => {
  const { entries } = getState(state);

  return entries.reduce((acc, { price = 0, quantity = 0 }) => acc + price * quantity, 0);
};

export const selectors = {
  getEntries,
  getEntriesByKeys,
  getItem,
  getItems,
  getState,
  getTotalItems,
  getTotalPrice,
};


/*
 * LOGIC
 */

/**
 * Logic used for handling cart clearing.
 *
 * @method
 */
const clearCartLogic = createLogic({
  type: [
    profileTypes.LOGOUT_SUCCESS,
  ],
  process() {
    return clear();
  },
});

export const logic = {
  clearCartLogic,
};


/*
 * REDUCERS
 */

/**
 * Default state model.
 *
 * @type {object}
 * @property {object[]} items - cart items
 * @property {number} items[].itemId - internal cart id
 * @property {number[]} items[].entryIds - id's of referenced entries
 * @property {*} [items[].*] - any data required by the app
 * @property {object[]} entries - order entries
 * @property {number} entries[].entryId - internal cart id
 * @property {number} entries[].quantity - entry quantity
 * @property {number} entries[].price - entry's unit price
 * @property {*} [entries[].*] - any data required by the app
 */
export const defaultInitialState = {
  entries: [],
  items: [],
};


/**
 * Module's reducer function.
 *
 * @method
 * @param initialState
 * @return {object}
 */
const reducer = (initialState = defaultInitialState) => (state = initialState, action) => {
  switch (action.type) {
    case CART_CLEAR: {
      return defaultInitialState;
    }
    case ITEM_ADD: {
      const { entries: stateEntries, items: stateItems } = state;
      const { entries: actionEntries, type, ...itemDetails } = action.data;

      // ENTRIES
      const entries = [...stateEntries];
      const latestEntry = entries[entries.length - 1] || {};
      let latestEntryId = latestEntry.entryId ? latestEntry.entryId : 0;
      let hasExistingEntries = false;
      const entryIds = [];

      actionEntries.forEach((entry) => {
        const { entryId, quantity, ...rest } = entry;
        const existingEntryIndex = entries.findIndex((fEntry) => {
          const { entryId: fEntryId, quantity: fQuantity, ...fRest } = fEntry;

          return fEntryId === entryId || _isEqual(rest, fRest);
        });

        if (existingEntryIndex !== -1) {
          entries[existingEntryIndex].quantity += quantity;

          entryIds.push(entries[existingEntryIndex].entryId);

          hasExistingEntries = true;
        } else if (quantity > 0) {
          latestEntryId += 1;

          entries.push({
            ...entry,
            entryId: latestEntryId,
          });
          entryIds.push(latestEntryId);
        }
      });

      // ITEMS
      const items = [...stateItems];

      if (hasExistingEntries) {
        const itemIndex = items.findIndex(
          item => item.entryIds.some(entryId => entryIds.indexOf(entryId) !== -1),
        );

        items[itemIndex].entryIds = _uniq([...items[itemIndex].entryIds, ...entryIds]);
      } else if (entries.length) {
        const latestItem = items[items.length - 1] || {};
        const itemId = latestItem.itemId ? latestItem.itemId + 1 : 1;

        items.push({ ...itemDetails, itemId, entryIds });
      }

      return {
        entries,
        items,
      };
    }
    case ITEM_REMOVE: {
      const { entries: stateEntries, items: stateItems } = state;
      const { itemId: actionItemId } = action;
      const entries = [...stateEntries];
      const items = [...stateItems];
      const itemIndex = items.findIndex(item => item.itemId === actionItemId);

      if (itemIndex !== -1) {
        items[itemIndex].entryIds.forEach((entryId) => {
          const entryIndex = entries.findIndex(entry => entry.entryId === entryId);

          if (entryIndex !== -1) {
            entries.splice(entryIndex, 1);
          }
        });

        items.splice(itemIndex, 1);
      }

      return {
        entries,
        items,
      };
    }
    case ITEM_UPDATE: {
      const { entries: stateEntries, items: stateItems } = state;
      const {
        entries: actionEntries, itemId: actionItemId, ...itemDetails
      } = action.data;
      const entries = [...stateEntries];
      const items = [...stateItems];
      const itemIndex = items.findIndex(item => item.itemId === actionItemId);

      if (itemIndex !== -1) {
        // ENTRIES
        const latestEntry = entries[entries.length - 1] || {};
        let latestEntryId = latestEntry.entryId ? latestEntry.entryId : 0;
        const entryIds = [];

        items[itemIndex].entryIds.forEach((entryId) => {
          const itemEntryIndex = actionEntries.findIndex(entry => entry.entryId === entryId);
          const zeroQtyEntryIndex = actionEntries
            .findIndex(entry => entry.entryId === entryId && entry.quantity === 0);

          if (itemEntryIndex === -1 || zeroQtyEntryIndex !== -1) {
            const entryIndex = entries.findIndex(entry => entry.entryId === entryId);

            if (entryIndex !== -1) {
              entries.splice(entryIndex, 1);
            }
          } else {
            entryIds.push(entryId);
          }
        });

        actionEntries.forEach((entry) => {
          const { entryId, quantity } = entry;
          const entryIndex = entries.findIndex(item => item.entryId === entryId);

          if (entryIndex !== -1) {
            entries[entryIndex] = entry;
          } else if (quantity > 0) {
            latestEntryId += 1;

            entries.push({
              ...entry,
              entryId: latestEntryId,
            });
            entryIds.push(latestEntryId);
          }
        });

        // ITEMS
        items[itemIndex] = {
          ...items[itemIndex],
          entryIds,
          ...itemDetails,
        };
      }

      return {
        items,
        entries,
      };
    }
    default:
      return state;
  }
};

export default reducer;
