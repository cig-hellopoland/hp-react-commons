/**
 * Validates number of arguments passed to the function
 *
 * @method
 * @param {number} argsCount - length of function arguments variable
 * @param {number} expected - number of expected arguments
 */
export default function validateFnArguments(argsCount, expected) {
  if (argsCount < expected) {
    const msg = `${expected} argument${expected === 1 ? '' : 's'} required, but only ${argsCount} present`;

    throw new Error(msg);
  }
}
