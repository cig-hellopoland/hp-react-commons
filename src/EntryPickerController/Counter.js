import { Component } from 'react';
import PropTypes from 'prop-types';
import exactProp from '../utils/exactProp';

class Counter extends Component {
  decrease = () => {
    const {
      onChange, value, minValue, step, counterId,
    } = this.props;

    onChange({
      counterId,
      value: value - step >= minValue ? value - step : value,
    });
  };

  increase = () => {
    const {
      onChange, value, maxValue, step, counterId,
    } = this.props;

    onChange({
      counterId,
      value: value + step <= maxValue ? value + step : value,
    });
  };

  render() {
    const { children, value } = this.props;
    return children({
      value,
      increase: this.increase,
      decrease: this.decrease,
    });
  }
}

Counter.propTypes = {
  children: PropTypes.func.isRequired,
  counterId: PropTypes.number.isRequired,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.number,
};

Counter.propTypes = exactProp(Counter.propTypes);

Counter.defaultProps = {
  maxValue: 99,
  minValue: 0,
  step: 1,
  value: 0,
};


export default Counter;
