import isDefinitionsList from './isPoolDefinitionList';
import isCyclic from './isCyclic';
import isBefore from './isBefore';
import isAfter from './isAfter';
import isDateValid from './isDateValid';
import parse from './parse';

export default function getCyclicPoolDefinitions(poolDefinitions, options = {}) {
  if (!isDefinitionsList(poolDefinitions)) {
    return [];
  }

  const start = options.start && parse(options.start);
  const end = options.end && parse(options.end);

  return poolDefinitions.filter((poolDefinition) => {
    const isPoolCyclic = isCyclic(poolDefinition);

    if (!isPoolCyclic) {
      return isPoolCyclic;
    }

    const { frequencyData } = poolDefinition;

    let isAfterStartDate = true;
    let isBeforeEndDate = true;

    // TODO: Normalize dates?
    if (start && isDateValid(start)) {
      isBeforeEndDate = frequencyData.endDate
        ? !isBefore(frequencyData.endDate, start)
        : isBeforeEndDate;
    }

    if (end && isDateValid(end)) {
      isAfterStartDate = !isAfter(poolDefinition.startDate, end);
    }

    return isAfterStartDate && isBeforeEndDate;
  });
}
