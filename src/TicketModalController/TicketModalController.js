import { Component } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import _find from 'lodash/find';
import _uniqBy from 'lodash/uniqBy';
import getClosestEventDate from '../utils/ticket-pool-parser/getClosestEventDate';

class TicketModalController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: this.getInitialActiveStep(),
      poolId: this.getInitialPoolId(),
      date: this.getInitialDate(), // "YYYY-MM-dd'T'HH:mmZ"
      entries: this.getInitialEntries(props.cartItem), // [entryId]: { [propName]: * }
      checkedAgreements: {}, // [agreementId]: checked<Boolean>
    };
  }

  getInitialActiveStep = () => {
    const { sightEvent } = this.props;
    const { ticketPoolDefinitions } = sightEvent;

    if (!this.isPoolValid()) {
      return 0;
    }

    const isPoolSingle = this.isPoolSingle();
    const isPoolCyclic = this.isPoolCyclic(ticketPoolDefinitions[0].id);

    if (isPoolSingle && !isPoolCyclic) {
      return 3;
      // return 1;
    }

    return 1;
  };

  getInitialDate = () => {
    const { sightEvent } = this.props;
    const { ticketPoolDefinitions } = sightEvent;

    return new Date(getClosestEventDate(ticketPoolDefinitions));
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

  getInitialPoolId = () => {
    const { sightEvent: { ticketPoolDefinitions } } = this.props;

    if (this.isPoolSingle(ticketPoolDefinitions)) {
      return ticketPoolDefinitions[0].id;
    }

    return null;
  };

  getTicketDefinitions = (poolId) => {
    const { sightEvent: { ticketPoolDefinitions } } = this.props;

    let pools = [...ticketPoolDefinitions];

    if (poolId) {
      pools = [_find(ticketPoolDefinitions, { id: +poolId })];
    }

    const ticketDefs = pools.reduce((acc, pool) => {
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

  isPoolCyclic = (poolId) => {
    const { sightEvent: { ticketPoolDefinitions } } = this.props;
    const poolDefinition = _find(ticketPoolDefinitions, { id: +poolId });

    return !!(poolDefinition && poolDefinition.frequencyData);
  };

  isPoolSingle = () => {
    const { sightEvent: { ticketPoolDefinitions } } = this.props;

    return ticketPoolDefinitions.length === 1;
  };

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
    const { poolId } = this.state;

    return this.isPoolValid() && (!this.isPoolSingle() || this.isPoolCyclic(poolId));
  };

  generateCartItem = () => {
    const { date, entries } = this.state;
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
          },
        },
        entries: [
          ...acc.entries,
          {
            id: entry.id,
            date: format(date, 'YYYY-MM-DDTHH:mmZ'),
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

  handleNextButtonClick = () => {
    const { activeStep, date } = this.state;
    const { steps, onSubmit } = this.props;

    if (this.isPoolValid()) {
      if (activeStep <= steps - 1) {
        if (activeStep === 1 && this.isPoolSingle()) {
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
      if (activeStep === 3 && this.isPoolSingle()) {
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
    this.setState({
      poolId,
      // clear entries on pool change
      entries: {},
    });
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
  fetchAvailableTickets: PropTypes.func.isRequired,
  sightEvent: PropTypes.shape({}).isRequired,
  steps: PropTypes.number,
};

TicketModalController.defaultProps = {
  availableTickets: {},
  cartItem: {},
  steps: 3,
};


export default TicketModalController;
