import parse from './parse';
import isAfter from './isAfter';
import isBefore from './isBefore';
import isCyclic from './isCyclic';
import isDateValid from './isDateValid';
import isPoolDefinitionList from './isPoolDefinitionList';

/**
 * Returns only non-cyclic ticket pools
 *
 * @method
 * @param {Object[]} poolDefinitions
 * @param {Object} [options]
 * @param {Date|string} [options.start] - earliest entry date to show
 * @param {Date|string} [options.end] - oldest entry date to show
 * @return {*}
 */
export default function getSinglePoolDefinitions(poolDefinitions, options = {}) {
  if (!isPoolDefinitionList(poolDefinitions)) {
    return [];
  }

  const start = options.start && parse(options.start);
  const end = options.end && parse(options.end);

  return poolDefinitions
    .filter((poolDefinition) => {
      const isPoolCyclic = isCyclic(poolDefinition);

      if (isPoolCyclic) {
        return !isPoolCyclic;
      }

      let isAfterStartDate = true;
      let isBeforeEndDate = true;

      // TODO: Normalize dates?
      if (start && isDateValid(start)) {
        isAfterStartDate = !isBefore(poolDefinition.startDate, start);
      }

      if (end && isDateValid(end)) {
        isBeforeEndDate = !isAfter(poolDefinition.endDate, end);
      }

      return isAfterStartDate && isBeforeEndDate;
    });
}
