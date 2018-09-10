import isPoolDefinition from './isPoolDefinition';
import validateFnArguments from './validateFnArguments';

/**
 * Validates TicketPoolDefinition
 *
 * @method
 * @param {Object} poolDefinition
 */
export default function validatePoolDefinition(poolDefinition) {
  validateFnArguments(arguments.length, 1);

  if (!isPoolDefinition(poolDefinition)) {
    const msg = 'Provided argument is not a valid TicketPoolDefinition';

    throw new TypeError(msg);
  }
}
