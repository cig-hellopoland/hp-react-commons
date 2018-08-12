import { Component } from 'react';
import PropTypes from 'prop-types';
import exactProp from 'utils/exactProp';

class EntryPickerController extends Component {
  handleRemoveButtonClick = () => {
    const { onChange, value } = this.props;
    const entryId = this.props.entry.id;

    onChange({ entryId, value: value - 1 > 0 ? value - 1 : 0 });
  };

  handleAddButtonClick = () => {
    const { onChange, value } = this.props;
    const entryId = this.props.entry.id;

    onChange({ entryId, value: value + 1 });
  };

  render() {
    const { children, onChange, ...props } = this.props;
    return children({
      ...props,
      handleAddButtonClick: this.handleAddButtonClick,
      handleRemoveButtonClick: this.handleRemoveButtonClick,
    });
  }
}

EntryPickerController.propTypes = {
  children: PropTypes.func.isRequired,
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

EntryPickerController.propTypes = exactProp(EntryPickerController.propTypes);

EntryPickerController.defaultProps = {
  value: 0,
};


export default EntryPickerController;
