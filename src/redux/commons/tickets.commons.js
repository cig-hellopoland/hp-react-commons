const getTicketsAsList = tickets => tickets.reduce((acc, ticket) => {
  const { city, id, name } = ticket;

  const ticketEntries = ticket.entries.reduce((next, entry) => {
    const result = { ...next };

    if (next[entry.date]) {
      result[entry.date].push(entry);
    } else {
      result[entry.date] = [entry];
    }

    return result;
  }, {});

  const result = Object.values(ticketEntries).map(entries => ({
    city,
    entries,
    id,
    name,
  }));

  return [
    ...acc,
    ...result,
  ];
}, []);

export default {
  getTicketsAsList,
};
