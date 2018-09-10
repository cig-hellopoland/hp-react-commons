import _uniq from 'lodash/uniq';

import getCyclicPoolDefinitionsAsDates from './getCyclicPoolDefinitionsAsDates';
import getSinglePoolDefinitionsAsDates from './getSinglePoolDefinitionsAsDates';

export default function getPoolDefinitionsAsDates(poolDefinitions) {
  const result = [
    ...getSinglePoolDefinitionsAsDates(poolDefinitions),
    ...getCyclicPoolDefinitionsAsDates(poolDefinitions),
  ].sort();

  return _uniq(result);
}
