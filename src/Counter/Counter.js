import { Component } from 'react';
import PropTypes from 'prop-types';
import exactProp from '../utils/exactProp';

/**
 * Component used for selecting ticket amount.
 * @example
  <Counter
    value={this.state.value}
    onChange={this.handlePickerChange}
    id={entry.id} // optional, will be passed to onChange callback
    step={2} // optional
    minValue={10} // optional
    maxValue={20} // optional
  >
   {({ value, increase, decrease }) => (
      // implement view (web / native)
      <div>
        <p>{entry.name}</p>
        <button onClick={decrease}>-</button>
        <span>{value}</span>
        <button onClick={increase}>+</button>
      </div>
    )}
  </Counter>
 */
class Counter extends Component {
  decrease = () => {
    const {
      onChange, value, minValue, step, id,
    } = this.props;

    onChange({
      id,
      value: value - step >= minValue ? value - step : value,
    });
  };

  increase = () => {
    const {
      onChange, value, maxValue, step, id,
    } = this.props;

    onChange({
      id,
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
  id: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.number,
};

Counter.propTypes = exactProp(Counter.propTypes);

Counter.defaultProps = {
  id: null,
  maxValue: 99,
  minValue: 0,
  step: 1,
  value: 0,
};


export default Counter;
