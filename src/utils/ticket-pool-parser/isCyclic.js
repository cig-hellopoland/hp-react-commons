import validateFnArguments from './validateFnArguments';
import validatePoolDefinition from './validatePoolDefinition';

/**
 * Checks if provided pool is cyclic
 *
 * @method
 * @param {Object} poolDefinition
 * @param {Object} [poolDefinition.frequencyData]
 * @return {boolean}
 */
export default function isCyclic(poolDefinition) {
  validateFnArguments(arguments.length, 1);
  validatePoolDefinition(poolDefinition);

  return !!poolDefinition.frequencyData;
}
