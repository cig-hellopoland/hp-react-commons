import { Component } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import getISOStringWithoutSeconds from '../utils/getISOStringWithoutSeconds';

class TicketModalController extends Component {
  constructor(props) {
    super(props);
    const { poolDefinition } = this.props;

    this.state = {
      activeStep: poolDefinition.frequencyData ? 1 : 2,
      date: poolDefinition.frequencyData
        ? new Date()
        : new Date(poolDefinition.startDate),
      entries: {}, // [entryId]: { quantity: <Number> }
      checkedAgreements: {}, // [agreementId]: checked<Boolean>
    };
  }

  getTotalPrice = () => {
    const { entries } = this.state;
    const { poolDefinition: { ticketDefinitions } } = this.props;

    return Object.keys(entries).reduce((acc, entryId) => {
      const entry = _find(ticketDefinitions, { id: +entryId });
      const { quantity } = entries[entryId];

      let total = 0;

      if (quantity) {
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

  generateCartItem = () => {
    const { date, entries } = this.state;
    const { poolDefinition, sightEvent } = this.props;
    const { ticketDefinitions } = poolDefinition;

    const entriesArray = Object.keys(entries).map((entryId) => {
      const entry = _find(ticketDefinitions, { id: +entryId });
      return {
        id: entry.id,
        name: entry.name,
        price: entry.price,
        quantity: entries[entryId].quantity,
        date: getISOStringWithoutSeconds(date),
      };
    });

    return {
      id: sightEvent.id,
      name: sightEvent.name,
      city: sightEvent.city,
      entries: entriesArray,
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

  handleNextButtonClick = () => {
    const { activeStep } = this.state;
    const { steps, onSubmit } = this.props;

    if (activeStep <= steps - 1) {
      this.nextStep();
    } else if (onSubmit) {
      const cartItem = this.generateCartItem();
      onSubmit(cartItem);
    }
  };

  handlePrevButtonClick = () => {
    const { activeStep } = this.state;
    if (activeStep > 1) {
      this.prevStep();
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

  render() {
    const { children, ...props } = this.props;

    return children({
      ...props,
      ...this.state,
      totalPrice: this.getTotalPrice(),
      totalTicketsQty: this.getTotalTicketsQty(),
      handleAgreementChange: this.handleAgreementChange,
      handleEntryChange: this.handleEntryChange,
      handleDateChange: this.handleDateChange,
      handlePrevButtonClick: this.handlePrevButtonClick,
      handleNextButtonClick: this.handleNextButtonClick,
      getEntriesByPropName: this.getEntriesByPropName,
    });
  }
}

TicketModalController.propTypes = {
  children: PropTypes.func.isRequired,
  poolDefinition: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticketDefinitions: PropTypes.arrayOf((
      PropTypes.shape({})
    )).isRequired,
    frequencyData: PropTypes.shape({}).isRequired,
    startDate: PropTypes.string.isRequired,
  }).isRequired,
  sightEvent: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  steps: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

TicketModalController.defaultProps = {
  steps: 2,
};


export default TicketModalController;
