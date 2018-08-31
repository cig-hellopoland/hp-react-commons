import format from 'date-fns/format';

export default dateObj => format(dateObj, 'YYYY-MM-DDTHH:mmZ');
