/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  actions as cartActions,
  selectors as cartSelectors,
} from '../redux/cart';
import {
  actions as sightEventsActions,
  selectors as sightEventsSelectors,
} from '../redux/sightEvents';
import TicketModalController from './TicketModalController';
import FALLBACK_TYPES from './fallbackTypes';


class TicketModalStateConnector extends React.Component {
  state = {
    isFetching: false,
    hasCatchError: false,
    hasRequestError: false,
  };

  componentDidMount() {
    const { open, sightEvent, sightEventId } = this.props;

    if (open && sightEvent.id !== sightEventId) {
      this.fetchSightEventById(sightEventId);
    }
  }

  componentDidUpdate(prevProps) {
    const { sightEventId: prevSightEventId } = prevProps;
    const { open, sightEventId, sightEvent } = this.props;

    if (open && prevSightEventId !== sightEventId && sightEvent.id !== sightEventId) {
      this.fetchSightEventById(sightEventId);
    }
  }

  hasError = () => {
    const { hasCatchError, hasRequestError } = this.state;

    return hasCatchError || hasRequestError;
  };

  hasFallback = () => {
    const { fallback } = this.props;

    return !!fallback;
  };

  isFallbackRequired = () => {
    const hasError = this.hasError();
    const hasFallback = this.hasFallback();
    const isLoading = this.isLoading();

    return hasFallback && (isLoading || hasError);
  };

  isLoading = () => {
    const { isFetching } = this.state;

    return isFetching;
  };

  fetchSightEventById = (id) => {
    const { fetchSightEvent } = this.props;

    fetchSightEvent({
      id,
      onError: this.handleFetchError,
      onSuccess: this.handleFetchSuccess,
    });

    this.handleFetchRequest();
  };

  handleFallback = () => {
    const { fallback } = this.props;
    const hasError = this.hasError();
    const isLoading = this.isLoading();

    const cb = {};

    if (isLoading) {
      cb.type = FALLBACK_TYPES.LOADING;
    } else if (hasError) {
      cb.type = FALLBACK_TYPES.ERROR;
    }

    return fallback(cb);
  };

  handleFetchError = () => this.setState({
    hasCatchError: false, hasRequestError: true, isFetching: false,
  });

  handleFetchRequest = () => this.setState({
    hasCatchError: false, hasRequestError: false, isFetching: true,
  });

  handleFetchSuccess = () => this.setState({
    hasCatchError: false, hasRequestError: false, isFetching: false,
  });

  handleSubmit = (cartItem) => {
    const { addItemToCart, onSubmit } = this.props;

    addItemToCart(cartItem);

    if (onSubmit) {
      onSubmit(cartItem);
    }
  };

  componentDidCatch() {
    this.setState({ hasCatchError: true });
  }

  render() {
    const {
      availableTickets, cartItem, children, fetchAvailableTickets, open, sightEvent,
    } = this.props;
    const isFallbackRequired = this.isFallbackRequired();

    if (!open) {
      return null;
    }

    if (isFallbackRequired) {
      return this.handleFallback();
    }

    return (
      <TicketModalController
        cartItem={cartItem}
        fetchAvailableTicketsByDate={fetchAvailableTickets}
        onSubmit={this.handleSubmit}
        sightEvent={sightEvent}
        availableTickets={availableTickets}
      >
        {children}
      </TicketModalController>
    );
  }
}

TicketModalStateConnector.propTypes = {
  addItemToCart: PropTypes.func.isRequired,
  availableTickets: PropTypes.shape({}),
  cartItem: PropTypes.shape({}),
  // cartItemId: PropTypes.number,
  children: PropTypes.func.isRequired,
  fallback: PropTypes.func,
  fetchAvailableTickets: PropTypes.func.isRequired,
  fetchSightEvent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  sightEvent: PropTypes.shape({}),
  sightEventId: PropTypes.number.isRequired,
};

TicketModalStateConnector.defaultProps = {
  availableTickets: {},
  onSubmit: null,
  // cartItemId: null,
  cartItem: {},
  fallback: null,
  open: false,
  sightEvent: {},
};

const mapStateToProps = (state, { cartItemId }) => ({
  availableTickets: sightEventsSelectors.getAvailableTickets(state),
  cartItem: cartSelectors.getCartItem(state, cartItemId),
  sightEvent: sightEventsSelectors.getSightEvent(state),
});

const mapDispatchToProps = {
  addItemToCart: cartActions.cartItemAdd,
  fetchAvailableTickets: sightEventsActions.fetchAvailableTickets,
  fetchSightEvent: sightEventsActions.fetchItem,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(TicketModalStateConnector);
