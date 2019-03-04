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


class TicketModalStoreConnector extends React.Component {
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
    const { addItemToCart, onSubmit, updateCartItem } = this.props;
    const { itemId } = cartItem;

    if (itemId) {
      updateCartItem(cartItem);
    } else {
      addItemToCart(cartItem);
    }

    if (onSubmit) {
      onSubmit(cartItem);
    }
  };

  componentDidCatch() {
    this.setState({ hasCatchError: true });
  }

  render() {
    const {
      affiliationCode, availableTickets, cartItem, children, fetchAvailableTickets,
      open, sightEvent, fetchAvailableTicketsCancel,
    } = this.props;
    const showFallback = this.isFallbackRequired();

    if (!open) {
      return null;
    }

    if (showFallback) {
      return this.handleFallback();
    }

    return (
      <TicketModalController
        affiliationCode={affiliationCode}
        cartItem={cartItem}
        fetchAvailableTicketsByDate={fetchAvailableTickets}
        fetchAvailableTicketsCancel={fetchAvailableTicketsCancel}
        onSubmit={this.handleSubmit}
        sightEvent={sightEvent}
        availableTickets={availableTickets}
      >
        {children}
      </TicketModalController>
    );
  }
}

TicketModalStoreConnector.propTypes = {
  addItemToCart: PropTypes.func.isRequired,
  affiliationCode: PropTypes.string,
  availableTickets: PropTypes.shape({}),
  cartItem: PropTypes.shape({}),
  cartItemId: PropTypes.number, // eslint-disable-line
  children: PropTypes.func.isRequired,
  fallback: PropTypes.func,
  fetchAvailableTickets: PropTypes.func.isRequired,
  fetchAvailableTicketsCancel: PropTypes.func.isRequired,
  fetchSightEvent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  sightEvent: PropTypes.shape({}),
  sightEventId: PropTypes.number.isRequired,
  updateCartItem: PropTypes.func.isRequired,
};

TicketModalStoreConnector.defaultProps = {
  affiliationCode: null,
  availableTickets: {},
  onSubmit: null,
  cartItemId: null,
  cartItem: {},
  fallback: null,
  open: false,
  sightEvent: {},
};

const mapStateToProps = (state, { cartItemId }) => ({
  availableTickets: sightEventsSelectors.getAvailableTickets(state),
  cartItem: cartSelectors.getItem(state, cartItemId),
  sightEvent: sightEventsSelectors.getSightEvent(state),
});

const mapDispatchToProps = {
  addItemToCart: cartActions.addItem,
  fetchAvailableTickets: sightEventsActions.fetchAvailableTickets,
  fetchAvailableTicketsCancel: sightEventsActions.fetchAvailableTicketsCancel,
  fetchSightEvent: sightEventsActions.fetchItem,
  updateCartItem: cartActions.updateItem,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(TicketModalStoreConnector);
