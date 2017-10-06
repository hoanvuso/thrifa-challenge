import React, { Component, PropTypes } from 'react';

class SelectionCreateItem extends Component {

  state = {
    itemValue: "",
  };

  onChangeItem = (event) => {
    this.setState({
      itemValue: event.target.value
    });

    const { handleSelectionCreateItemChange, itemKey } = this.props;
    handleSelectionCreateItemChange(itemKey, this.state.itemValue);
  }

  render() {
    const { itemKey, itemValue } = this.props;

    return (
      <div className="md-form pb-3">
          <input placeholder="Question Option"
                  type="text" className="form-control" 
                  value={this.state.itemValue}
                  ref={itemKey}
                  onChange={this.onChangeItem.bind(this)} />
      </div>
    );
  }
}

SelectionCreateItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  // itemValue: PropTypes.string,
  handleSelectionCreateItemChange: PropTypes.func.isRequired,
};

export default SelectionCreateItem;