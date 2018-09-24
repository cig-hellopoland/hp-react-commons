import _uniq from 'lodash/uniq';

import getCyclicPoolDefinitionsAsDates from './getCyclicPoolDefinitionsAsDates';
import getSinglePoolDefinitionsAsDates from './getSinglePoolDefinitionsAsDates';

export default function getPoolDefinitionsAsDates(poolDefinitions, options = {}) {
  const result = [
    ...getSinglePoolDefinitionsAsDates(poolDefinitions, options),
    ...getCyclicPoolDefinitionsAsDates(poolDefinitions, options),
  ].sort();

  return _uniq(result);
}
