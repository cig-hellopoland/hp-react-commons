import { Component } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import _find from 'lodash/find';
import _uniqBy from 'lodash/uniqBy';
import getClosestEventDate from '../utils/ticket-pool-parser/getClosestEventDate';
import constants from '../utils/ticket-pool-parser/constants';
import getClosestEventDateWithTimezone from '../utils/ticket-pool-parser/getClosestEventDateWithTimezone';
import getDateFromCalendar from '../utils/ticket-pool-parser/getDateFromCalendar';

class TicketModalController extends Component {
  constructor(props) {
    super(props);
    const { cartItem } = props;

    this.state = {
      activeStep: this.getInitialActiveStep(cartItem),
      checkedAgreements: {}, // [agreementId]: checked<Boolean>
      date: this.getInitialDate(cartItem), // "YYYY-MM-DDTHH:mmZ"
      entries: this.getInitialEntries(cartItem), // [entryId]: { [propName]: * }
      isFetching: false,
      poolId: this.getInitialPoolId(cartItem),
    };
  }

  componentDidMount() {
    const { sightEvent } = this.props;

    if (sightEvent && sightEvent.id) {
      const date = getClosestEventDate(sightEvent.ticketPoolDefinitions);

      this.fetchAvailableTickets(date);
    }
  }

  componentDidUpdate() {
    const { availableTickets } = this.props;

    this.setSinglePoolParams(availableTickets);
  }

  getInitialActiveStep = (cartItem) => {
    // TODO: handle this as it's stupid
    if (!this.isPoolValid()) {
      return 0;
    }

    const { sightEvent } = this.props;
    const { ticketPoolDefinitions } = sightEvent;
    const { id: poolId } = ticketPoolDefinitions[0];

    const isPoolSingle = this.isPoolSingle(ticketPoolDefinitions);
    const isPoolCyclic = this.isPoolCyclic(ticketPoolDefinitions, poolId);

    if ((cartItem && cartItem.id) || (isPoolSingle && !isPoolCyclic)) {
      return 3;
    }

    return 1;
  };

  getInitialDate = (cartItem) => {
    const { sightEvent } = this.props;
    const { ticketPoolDefinitions } = sightEvent;

    if (cartItem && cartItem.id) {
      const { date } = cartItem.entries[0];

      return date;
    }

    return getClosestEventDateWithTimezone(ticketPoolDefinitions);
  };

  getInitialEntries = (cartItem) => {
    if (cartItem && cartItem.entries) {
      return cartItem.entries.reduce((acc, entry) => {
        const nextValue = { ...acc };

        if (!nextValue[entry.id]) {
          nextValue[entry.id] = {};
        }

        if (entry.quantity) {
          nextValue[entry.id].quantity = entry.quantity;
        }

        return nextValue;
      }, {});
    }

    return {};
  };

  getInitialPoolId = (cartItem) => {
    if (cartItem && cartItem.id) {
      const { details, entries } = cartItem;
      const { id } = entries[0];
      const { poolId } = details[id];

      return poolId;
    }

    return null;
  };


  getTicketDefinitions = (poolId) => {
    const { availableTickets: { ticketPools } } = this.props;

    if (!ticketPools) {
      return [];
    }

    let ticketPoolInstances = [...ticketPools];

    if (poolId) {
      const ticketPool = this.getTicketPoolById(ticketPools, poolId);

      ticketPoolInstances = ticketPool ? [ticketPool] : [];
    }

    const ticketDefs = ticketPoolInstances.reduce((acc, pool) => {
      const { ticketDefinitions } = pool;

      if (ticketDefinitions && ticketDefinitions.length) {
        return [
          ...acc,
          ...ticketDefinitions,
        ];
      }

      return acc;
    }, []);

    return _uniqBy(ticketDefs, 'id');
  };

  getTicketPoolById = (ticketPools, poolId) => _find(ticketPools, { id: +poolId });

  getTotalPrice = () => {
    const { entries } = this.state;
    const ticketDefinitions = this.getTicketDefinitions();

    return Object.keys(entries).reduce((acc, entryId) => {
      const entry = _find(ticketDefinitions, { id: +entryId });
      const { quantity } = entries[entryId];

      let total = 0;

      if (entry && entry.price && quantity) {
        total = entry.price * quantity;
      }

      return acc + total;
    }, 0);
  };

  getTotalTicketsQty = () => {
    const { entries } = this.state;

    return Object.values(entries).reduce((sum, { quantity }) => sum + quantity, 0);
  };

  getEntriesByPropName = (propertyName) => {
    const { entries } = this.state;

    return Object.keys(entries).reduce((acc, entryId) => {
      const propertyValue = entries[entryId][propertyName];

      if (propertyValue !== undefined) {
        acc[entryId] = propertyValue;
      }

      return acc;
    }, {});
  };

  setSinglePoolParams = ({ ticketPools } = {}) => {
    const { activeStep, date, poolId } = this.state;
    const { sightEvent: { ticketPoolDefinitions } } = this.props;
    const isPoolDefinitionSingle = this.isPoolSingle(ticketPoolDefinitions);
    const hasAvailableTickets = !!(ticketPools && ticketPools.length);

    if (activeStep === 3 && isPoolDefinitionSingle && hasAvailableTickets) {
      const { id, startDate } = ticketPools[0];
      const isPoolInstanceCyclic = this.isPoolCyclic(ticketPools, id);

      const nextState = {
        poolId: id,
      };

      if (isPoolInstanceCyclic) {
        nextState.date = getDateFromCalendar(date, startDate);
      }

      if (poolId !== id) {
        this.setState(nextState);
      }
    }
  };

  setStep = (step) => {
    this.setState({
      activeStep: step,
    });
  };

  hasAcceptedAgreements = () => {
    const { sightEvent: { agreements } } = this.props;
    const { checkedAgreements } = this.state;

    if (!agreements || agreements.length === 0) {
      return true;
    }

    return agreements.every(({ id, required }) => {
      if (required) {
        return checkedAgreements[id] === true;
      }

      return true;
    });
  };

  isDateValid = date => date != null;

  isModelValid = () => {
    const { sightEvent } = this.props;

    return !!(
      sightEvent
      && sightEvent
    );
  };

  isPoolCyclic = (ticketPools, poolId) => {
    const ticketPool = this.getTicketPoolById(ticketPools, poolId);

    return !!(ticketPool && ticketPool.frequencyData);
  };

  isPoolSingle = pool => pool && pool.length === 1;

  isPoolValid = () => {
    const { sightEvent: { ticketPoolDefinitions } } = this.props;

    return Array.isArray(ticketPoolDefinitions) && ticketPoolDefinitions.length > 0;
  };

  isNextButtonActive = () => {
    const { activeStep, poolId } = this.state;
    const { steps } = this.props;
    const hasAcceptedAgreements = this.hasAcceptedAgreements();
    const isPoolValid = this.isPoolValid();
    const totalTicketsQty = this.getTotalTicketsQty();

    const isMiddleStepValid = activeStep < steps;
    const isLastStepValid = activeStep === steps && totalTicketsQty > 0 && hasAcceptedAgreements;

    if (activeStep === 2) {
      return !!poolId;
    }

    return isPoolValid && (isMiddleStepValid || isLastStepValid);
  };

  isPrevButtonActive = () => {
    const {
      availableTickets: { ticketPools },
      sightEvent: { ticketPoolDefinitions },
    } = this.props;
    const { activeStep, poolId } = this.state;
    const isPoolValid = this.isPoolValid();
    const isPoolDefinitionSingle = this.isPoolSingle(ticketPoolDefinitions);
    const isPoolInstanceCyclic = this.isPoolCyclic(ticketPools, poolId);
    const hasMultipleEvents = !isPoolDefinitionSingle || isPoolInstanceCyclic;

    return activeStep !== 1 && isPoolValid && hasMultipleEvents;
  };

  fetchAvailableTickets = (date) => {
    const { fetchAvailableTicketsByDate, sightEvent } = this.props;
    const data = {
      id: sightEvent.id,
      query: {},
      onError: this.handleFetchError,
      onSuccess: this.handleFetchSuccess,
    };

    if (date) {
      data.query.date = format(date, constants.DATE_FORMAT);

      fetchAvailableTicketsByDate(data);

      this.setState({ isFetching: true });
    }
  };


  generateCartItem = () => {
    const { date, entries, poolId } = this.state;
    const { sightEvent: product } = this.props;
    const ticketDefinitions = this.getTicketDefinitions();

    const detailedEntries = Object.keys(entries).reduce((acc, entryId) => {
      const entry = _find(ticketDefinitions, { id: +entryId });

      return {
        details: {
          ...acc.details,
          [entryId]: {
            name: entry.name,
            price: entry.price,
            poolId,
          },
        },
        entries: [
          ...acc.entries,
          {
            id: entry.id,
            date: format(date, constants.DATE_FORMAT),
            quantity: entries[entry.id].quantity,
          },
        ],
      };
    }, { details: {}, entries: [] });

    return {
      ...detailedEntries,
      product,
    };
  };

  nextStep = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  prevStep = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleFetchError = () => this.setState({ isFetching: false });

  handleFetchSuccess = () => this.setState({ isFetching: false });

  handleNextButtonClick = () => {
    const { activeStep, date } = this.state;
    const { steps, onSubmit } = this.props;

    if (this.isPoolValid()) {
      if (activeStep <= steps - 1) {
        const { sightEvent: { ticketPoolDefinitions } } = this.props;
        const isPoolDefinitionSingle = this.isPoolSingle(ticketPoolDefinitions);

        if (activeStep === 1 && isPoolDefinitionSingle) {
          this.setStep(3);
        } else {
          this.nextStep();
        }
      } else if (onSubmit && this.isDateValid(date)) {
        const cartItem = this.generateCartItem();
        onSubmit(cartItem);
      }
    }
  };

  handlePrevButtonClick = () => {
    const { activeStep } = this.state;

    if (activeStep > 1) {
      const { sightEvent: { ticketPoolDefinitions } } = this.props;
      const isPoolDefinitionSingle = this.isPoolSingle(ticketPoolDefinitions);

      if (activeStep === 3 && isPoolDefinitionSingle) {
        this.setStep(1);
      } else {
        this.prevStep();
      }
    }
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleEntryChange = (id, values) => {
    this.setState(state => ({
      entries: {
        ...state.entries,
        [id]: {
          ...state.entries[id],
          ...values,
        },
      },
    }));
  };

  handleAgreementChange = (agreementId, value) => {
    this.setState(state => ({
      checkedAgreements: {
        ...state.checkedAgreements,
        [agreementId]: value,
      },
    }));
  };

  handlePoolChange = (poolId) => {
    const { availableTickets: { ticketPools } } = this.props;

    const { startDate } = this.getTicketPoolById(ticketPools, poolId);
    const isPoolCyclic = this.isPoolCyclic(ticketPools, poolId);

    this.setState(state => ({
      date: isPoolCyclic ? getDateFromCalendar(state.date, startDate) : startDate,
      // clear entries on pool change
      entries: {},
      poolId,
    }));
  };

  render() {
    const { children, ...props } = this.props;

    return children({
      ...props,
      ...this.state,
      totalPrice: this.getTotalPrice(),
      totalTicketsQty: this.getTotalTicketsQty(),
      fetchAvailableTickets: this.fetchAvailableTickets,
      handleAgreementChange: this.handleAgreementChange,
      handleEntryChange: this.handleEntryChange,
      handleDateChange: this.handleDateChange,
      handlePoolChange: this.handlePoolChange,
      handlePrevButtonClick: this.handlePrevButtonClick,
      handleNextButtonClick: this.handleNextButtonClick,
      getEntriesByPropName: this.getEntriesByPropName,
      getTicketDefinitions: this.getTicketDefinitions,
      isNextButtonActive: this.isNextButtonActive(),
      isPrevButtonActive: this.isPrevButtonActive(),
    });
  }
}

TicketModalController.propTypes = {
  availableTickets: PropTypes.shape({}),
  cartItem: PropTypes.shape({}),
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetchAvailableTicketsByDate: PropTypes.func.isRequired,
  sightEvent: PropTypes.shape({}).isRequired,
  steps: PropTypes.number,
};

TicketModalController.defaultProps = {
  availableTickets: {},
  cartItem: {},
  steps: 3,
};


export default TicketModalController;
