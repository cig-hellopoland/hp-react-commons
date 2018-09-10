import isPoolDefinition from './isPoolDefinition';
import validateFnArguments from './validateFnArguments';

/**
 * Checks if provided list has valid TicketPoolDefinitions
 *
 * @method
 * @param {Object[]} poolDefinitions
 * @return {boolean}
 */
export default function isPoolDefinitionList(poolDefinitions) {
  validateFnArguments(arguments.length, 1);

  return !!(Array.isArray(poolDefinitions)
    && poolDefinitions.length > 0
    && poolDefinitions.every(item => isPoolDefinition(item)));
}
