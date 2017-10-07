import React, { Component, PropTypes } from 'react';

class OneChoiceSelectionItem extends Component {

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
          <input type="radio" name={itemName} id={itemKey}
                onClick={this.onSelectItem.bind(this)} />
          <label htmlFor={itemKey}>{itemValue}</label>
      </div>
    );
  }
}

OneChoiceSelectionItem.propTypes = {
  itemType: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemValue: PropTypes.string.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
};

export default OneChoiceSelectionItem;