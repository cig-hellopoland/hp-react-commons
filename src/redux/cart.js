import { createLogic } from 'redux-logic';
import { types as profleTypes } from './profile';
import ticketsCommons from './commons/tickets.commons';

export const name = 'cart';
const prefix = `shared/${name}/`;
// use always the same empty array reference for shallow equality check
const emptyArray = [];

/*
 * HELPERS
 */

/**
 * Removes old entries
 *
 * @method
 * @param {object[]} entries - persisted entries
 * @param {object[]} prevEntries - entries to be deleted
 * @return {object[]} - remaining entries
 */
function removeEntriesByDates(entries, prevEntries) {
  return entries.reduce((next, entry) => {
    const result = [...next];
    const hasEntry = prevEntries.some(item => item.date === entry.date);

    if (!hasEntry) {
      result.push(entry);
    }

    return result;
  }, []);
}


/*
 * TYPES
 */

const CLEAR_SIGHT_ENTRIES = `${prefix}CLEAR_SIGHT_ENTRIES`;
const DELETE_SIGHT_ENTRIES = `${prefix}DELETE_SIGHT_ENTRIES`;
const UPDATE_SIGHT_ENTRIES = `${prefix}UPDATE_SIGHT_ENTRIES`;


/*
 * ACTIONS
 */

const addSightEntries = data => ({
  type: UPDATE_SIGHT_ENTRIES,
  data: {
    nextSightEntry: data,
    prevSightEntry: null,
  },
});

const clearSightEntries = () => ({
  type: CLEAR_SIGHT_ENTRIES,
});

const deleteSightEntries = (sightId, entries) => ({
  type: DELETE_SIGHT_ENTRIES,
  data: {
    sightId,
    entries,
  },
});

const updateSightEntries = (prevSightEntry, nextSightEntry) => ({
  type: UPDATE_SIGHT_ENTRIES,
  data: {
    nextSightEntry,
    prevSightEntry,
  },
});


/*
 * REDUCERS
 */

const initialState = {
  sightEntries: emptyArray,
};

function reducer(state = initialState, action) {
  const actions = {
    [CLEAR_SIGHT_ENTRIES]: () => ({
      ...initialState,
    }),
    [DELETE_SIGHT_ENTRIES]: () => {
      const { sightEntries: stateSightEntries } = state;
      const sightEntries = [...stateSightEntries];
      const { data } = action;

      const entryIndex = stateSightEntries.findIndex(sight => sight.id === data.sightId);

      if (entryIndex !== -1) {
        const sightEntry = sightEntries[entryIndex];

        sightEntry.entries = removeEntriesByDates(sightEntry.entries, data.entries);
      }

      return {
        ...state,
        sightEntries,
      };
    },
    [UPDATE_SIGHT_ENTRIES]: () => {
      const { sightEntries: stateSightEntries } = state;
      const sightEntries = [...stateSightEntries];
      const { data: { nextSightEntry, prevSightEntry } } = action;

      const entryIndex = stateSightEntries.findIndex(sight => sight.id === nextSightEntry.id);

      // remove old entries
      if (prevSightEntry && entryIndex !== -1) {
        const sightEntry = sightEntries[entryIndex];

        sightEntry.entries = removeEntriesByDates(sightEntry.entries, prevSightEntry.entries);
      }

      // add new entries
      const entries = nextSightEntry.entries.filter(entry => entry.quantity && entry.quantity > 0);

      if (entryIndex !== -1) {
        entries.forEach((entry) => {
          const index = sightEntries[entryIndex].entries.findIndex(({ date, id }) => (
            date === entry.date && id === entry.id
          ));

          if (index !== -1) {
            let { quantity } = sightEntries[entryIndex].entries[index];
            quantity += entry.quantity;
            sightEntries[entryIndex].entries[index].quantity = quantity;
          } else {
            sightEntries[entryIndex].entries.push(entry);
          }
        });
      } else {
        sightEntries.push({
          ...nextSightEntry,
          entries,
        });
      }

      // sort entries by date
      sightEntries.forEach((sight) => {
        sight.entries.sort((a, b) => {
          const timestamp = (new Date(a.date)).getTime() - (new Date(b.date)).getTime();

          return timestamp || a.id - b.id;
        });
      });

      return {
        ...state,
        sightEntries,
      };
    },
  };

  return (actions[action.type] && actions[action.type]()) || state;
}


/*
 * LOGIC
 */

const clearSightEntriesLogic = createLogic({
  type: [
    profleTypes.LOGOUT_SUCCESS,
  ],
  process() {
    return clearSightEntries();
  },
});

/*
 * SELECTORS
 */

/**
 * Returns state
 *
 * @method
 * @param {object} state
 * @return {object}
 */
const getState = state => state[name];

const getSightEntries = state => getState(state).sightEntries;

const getSightEntriesAsTickets = (state) => {
  const tickets = getSightEntries(state);

  return ticketsCommons.getTicketsAsList(tickets);
};

const getTicketEntries = (state) => {
  const sightEntries = getSightEntries(state);

  return sightEntries.reduce((next, sight) => (
    [
      ...next,
      ...sight.entries,
    ]
  ), []);
};

const getTicketsQuantity = state => getSightEntriesAsTickets(state).length;

/*
 * EXPORTS
 */

export default reducer;

export const types = {
  CLEAR_SIGHT_ENTRIES,
  DELETE_SIGHT_ENTRIES,
  UPDATE_SIGHT_ENTRIES,
};

export const actions = {
  addSightEntries,
  clearSightEntries,
  deleteSightEntries,
  updateSightEntries,
};

export const logic = {
  clearSightEntriesLogic,
};

export const selectors = {
  getSightEntries,
  getSightEntriesAsTickets,
  getState,
  getTicketEntries,
  getTicketsQuantity,
};
