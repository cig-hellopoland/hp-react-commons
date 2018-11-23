import { createLogic } from 'redux-logic';
import _isEqual from 'lodash/isEqual';
import _uniq from 'lodash/uniq';

export const name = 'cart';
const prefix = `commons/${name}/`;

/*
 * TYPES
 */
const CART_CLEAR = `${prefix}CART_CLEAR`;
const ITEM_ADD = `${prefix}ITEM_ADD`;
const ITEM_REMOVE = `${prefix}ITEM_REMOVE`;
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
 * Clears cart
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
 * Creates action for new cart item
 *
 * @method
 * @param {object[]} entries - cart entries details
 * @param {number} entries[].price - entry price
 * @param {number} entries[].quantity
 * @param {*} * - extra item details
 * @return {{
 *   type: string,
 *   data: {entries: object[], ...}
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
 * Creates action for cart item removal
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
 * Creates action with new cart item details
 *
 * @method
 * @param {object[]} entries - cart entries details
 * @param {number} entries[].price - entry price
 * @param {number} entries[].quantity
 * @param {*} * - extra item details
 * @return {{
 *   type: string,
 *   data: {entries: object[], ...}
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
 * @param {object} state
 * @return {*}
 */
const getState = state => state[name];

export const selectors = {
  getState,
};


/*
 * LOGIC
 */


export const logic = {
};


/*
 * REDUCERS
 */

/**
 * Cart model
 *
 * @param {object[]} items - cart items
 * @param {number} items[].itemId - internal cart id
 * @param {number[]} items[].entryIds - id's of referenced entries
 * @param {*} [items[].*] - any data required by the app
 * @param {object[]} entries - order entries
 * @param {number} entries[].entryId - internal cart id
 * @param {number} entries[].quantity - entry quantity
 * @param {number} entries[].price - entry's unit price
 * @param {*} [entries[].*] - any data required by the app
 *
 */
export const defaultInitialState = {
  entries: [],
  items: [],
};

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
        } else {
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
      } else {
        const latestItem = items[items.length - 1] || {};
        const itemId = latestItem.itemId ? latestItem.itemId + 1 : 1;

        items.push({ itemId, entryIds, ...itemDetails });
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

          if (itemEntryIndex === -1) {
            const entryIndex = entries.findIndex(entry => entry.entryId === entryId);

            if (entryIndex !== -1) {
              entries.splice(entryIndex, 1);
            }
          } else {
            entryIds.push(entryId);
          }
        });

        actionEntries.forEach((entry) => {
          const { entryId } = entry;
          const entryIndex = entries.findIndex(item => item.entryId === entryId);

          if (entryIndex !== -1) {
            entries[entryIndex] = entry;
          } else {
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
