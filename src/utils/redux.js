/**
 * Utility methods for handling Redux store.
 * @module Redux Utils
 */

/**
 * Converts multiple redux logic objects into single array to avoid naming conflicts.
 * @example
 * // services/redux/logic.js - root logic
 * import { parseReduxLogic } from '@hello-poland/commons/utils/redux';
 * import { logic as profileLogic } from '@hello-poland/commons/redux/profile';
 * import { logic as sightEventsLogic } from '@hello-poland/commons/redux/sightEvents';
 * import { logic as sightsLogic } from '@hello-poland/commons/redux/sights';
 *
 * export default parseReduxLogic({
 *   profileLogic,
 *   sightEventsLogic,
 *   sightsLogic,
 * });
 * @method
 * @param {object} props - object with multiple logic ducks
 * @return {object[]}
 */
export const parseReduxLogic = props => Object.values(props).reduce((acc, obj) => [
  ...acc, ...Object.values(obj),
], []);

export default {
  parseReduxLogic,
};
