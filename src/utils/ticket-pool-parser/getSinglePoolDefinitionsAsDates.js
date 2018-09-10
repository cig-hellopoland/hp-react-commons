import _uniq from 'lodash/uniq';
import getSinglePoolDefinitions from './getSinglePoolDefinitions';
import constants from './constants';
import format from './format';

/**
 * Returns non-cyclic pools as list of available days
 *
 * @method
 * @param poolDefinitions
 * @param options
 * @return {string[]}
 */
export default function getSinglePoolDefinitionsAsDays(poolDefinitions, options = {}) {
  const result = getSinglePoolDefinitions(poolDefinitions, options)
    .map(poolDefinition => format(poolDefinition.startDate, constants.DAY_FORMAT))
    .sort();

  return _uniq(result);
}
