import React, { Component, PropTypes } from 'react';

class MultiChoiceSelectionItem extends Component {

  state = {
    isChecked: false,
  }

  onSelectItem = (event) => {
    const { handleSelectItem, itemKey} = this.props;
    handleSelectItem(itemKey);
  }

  render() {
    const { itemKey, itemName, itemValue } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="form-group">
          <input type="checkbox" name={itemName} id={itemKey}
                onClick={this.onSelectItem.bind(this)} />
          <label htmlFor={itemKey}>{itemValue}</label>
      </div>
    );
  }
}

MultiChoiceSelectionItem.propTypes = {
  itemType: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemValue: PropTypes.string.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
};

export default MultiChoiceSelectionItem;