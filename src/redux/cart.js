import { createLogic } from 'redux-logic';
import { types as profileTypes } from './profile';

export const name = 'cart';
const prefix = `commons/${name}/`;
// use always the same empty array reference for shallow equality check
const emptyArray = [];

/*
 * HELPERS
 */

/**
 * Removes old entries
 *
 * @method
 * @param {Object[]} entries - persisted entries
 * @param {Object[]} prevEntries - entries to be deleted
 * @return {Object[]} - remaining entries
 */
function removeEntriesByDates(entries, prevEntries) {
  return entries.reduce((acc, entry) => {
    const result = [...acc];
    const hasEntry = prevEntries.some(item => item.date === entry.date);

    if (!hasEntry) {
      result.push(entry);
    }

    return result;
  }, []);
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
  getTicketsAsList,
  removeEntriesByDates,
};


/*
 * TYPES
 */

const CLEAR_SIGHT_ENTRIES = `${prefix}CLEAR_SIGHT_ENTRIES`;
const DELETE_SIGHT_ENTRIES = `${prefix}DELETE_SIGHT_ENTRIES`;
const UPDATE_SIGHT_ENTRIES = `${prefix}UPDATE_SIGHT_ENTRIES`;

export const types = {
  CLEAR_SIGHT_ENTRIES,
  DELETE_SIGHT_ENTRIES,
  UPDATE_SIGHT_ENTRIES,
};


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

export const actions = {
  addSightEntries,
  clearSightEntries,
  deleteSightEntries,
  updateSightEntries,
};


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

  return getTicketsAsList(tickets);
};

const getTicketEntries = (state) => {
  const sightEntries = getSightEntries(state);

  return sightEntries.reduce((acc, { entries }) => ([
    ...acc,
    ...entries,
  ]), []);
};

const getTicketsQuantity = state => getSightEntriesAsTickets(state).length;

const getTotalPrice = (state) => {
  const entries = getTicketEntries(state);

  return entries.reduce((acc, { price, quantity }) => acc + (price * quantity), 0);
};

export const selectors = {
  getSightEntries,
  getSightEntriesAsTickets,
  getState,
  getTicketEntries,
  getTicketsQuantity,
  getTotalPrice,
};


/*
 * LOGIC
 */

const clearSightEntriesLogic = createLogic({
  type: [
    profileTypes.LOGOUT_SUCCESS,
  ],
  process() {
    return clearSightEntries();
  },
});

export const logic = {
  clearSightEntriesLogic,
};


/*
 * REDUCERS
 */

export const defaultInitialState = {
  sightEntries: emptyArray,
};

const reducer = (initialState = defaultInitialState) => (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SIGHT_ENTRIES:
      return {
        ...initialState,
      };
    case DELETE_SIGHT_ENTRIES:
      return (function deleteSightEntriesReducer() {
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
      }());
    case UPDATE_SIGHT_ENTRIES:
      return (function updateSightEntriesReducer() {
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
        const entries = nextSightEntry.entries.filter(({ quantity }) => quantity && quantity > 0);

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
      }());
    default:
      return state;
  }
};

export default reducer;
