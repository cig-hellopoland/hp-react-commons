import _isPlainObject from 'lodash/isPlainObject';
import validateFnArguments from './validateFnArguments';

/**
 * Checks if provided argument is valid TicketPoolDefinition
 *
 * @method
 * @param {Object} poolDefinition
 * @param {string} poolDefinition.name
 * @param {string} poolDefinition.startDate
 * @param {string} poolDefinition.endDate
 * @return {boolean}
 */
export default function isPoolDefinition(poolDefinition) {
  validateFnArguments(arguments.length, 1);

  return !!(_isPlainObject(poolDefinition)
    && (poolDefinition.name && poolDefinition.name.length)
    && (poolDefinition.startDate && poolDefinition.startDate.length) // TODO: Date format check
    && (poolDefinition.endDate && poolDefinition.endDate.length)); // TODO: Date format check
}
