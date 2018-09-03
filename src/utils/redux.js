/**
 * Converts multiple redux logic objects into single array.
 *
 * @method
 * @param {Object} props - object of multiple logic ducks
 * @return {Object[]}
 */
export const parseReduxLogic = props => Object.values(props).reduce((acc, obj) => [
  ...acc, ...Object.values(obj),
], []);

export default {
  parseReduxLogic,
};
