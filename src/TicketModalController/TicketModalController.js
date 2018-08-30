import { Component } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import getISOStringWithoutSeconds from '../utils/getISOStringWithoutSeconds';

class TicketModalController extends Component {
  state = {
    activeStep: this.props.poolDefinition.isCyclic ? 1 : 2,
    date: this.props.poolDefinition.isCyclic
      ? new Date()
      : new Date(this.props.poolDefinition.startDate),
    ticketsQty: {}, // [entryId]: ticketsQty<Number>
    checkedAgreements: {}, // [agreementId]: checked<Boolean>
  };

  getTotalPrice = () => {
    const { ticketsQty } = this.state;
    const { poolDefinition: { ticketDefinitions } } = this.props;

    return Object.keys(ticketsQty).reduce((acc, entryId) => {
      const entry = _find(ticketDefinitions, { id: +entryId });
      const quantity = ticketsQty[entryId];

      let total = 0;

      if (quantity) {
        total = entry.price * quantity;
      }

      return acc + total;
    }, 0);
  };

  getTotalTickertsQty = () => {
    const { ticketsQty } = this.state;
    return Object.values(ticketsQty).reduce((sum, qty) => sum + qty, 0);
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
    if (this.state.activeStep <= this.props.steps - 1) {
      this.nextStep();
    } else if (this.props.onSubmit) {
      const { poolDefinition, sightEvent } = this.props;
      const { ticketDefinitions } = poolDefinition;
      const date = getISOStringWithoutSeconds(this.state.date);

      const entries = Object.keys(this.state.ticketsQty).map((entryId) => {
        const entry = _find(ticketDefinitions, { id: +entryId });
        return {
          id: entry.id,
          name: entry.name,
          price: entry.price,
          quantity: this.state.ticketsQty[entryId],
          date,
        };
      });

      this.props.onSubmit({
        id: sightEvent.id,
        name: sightEvent.name,
        city: sightEvent.city,
        entries,
      });
    }
  };

  handlePrevButtonClick = () => {
    if (this.state.activeStep > 1) {
      this.prevStep();
    }
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleTicketsQtyChange = ({ id, value }) => {
    this.setState(state => ({
      ticketsQty: {
        ...state.ticketsQty,
        [id]: value,
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
      totalTicketsQty: this.getTotalTickertsQty(),
      handleAgreementChange: this.handleAgreementChange,
      handleTicketsQtyChange: this.handleTicketsQtyChange,
      handleDateChange: this.handleDateChange,
      handlePrevButtonClick: this.handlePrevButtonClick,
      handleNextButtonClick: this.handleNextButtonClick,
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
    isCyclic: PropTypes.bool.isRequired,
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
