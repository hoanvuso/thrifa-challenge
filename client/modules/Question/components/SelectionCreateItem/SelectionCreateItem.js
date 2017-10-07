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
  };

  onDeleteItem = () => {
    const { handleDeleteSelection, itemKey } = this.props;
    handleDeleteSelection(itemKey);    
  };

  render() {
    const { itemKey, itemValue } = this.props;
    
    return (
      <div className="md-form pb-3">
        <div className="row">
          <div className="col-sm-10">
            <input placeholder="Question Option"
                  type="text" className="form-control" 
                  value={this.state.itemValue}
                  ref={itemKey}
                  onChange={this.onChangeItem.bind(this)} />
          </div>
          <div className="col-sm-2">
            <button type="button" className="btn btn-flat btn-sm" onClick={this.onDeleteItem}>
              <i className="fa fa-remove" aria-hidden="true"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SelectionCreateItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  itemValue: PropTypes.string,
  handleSelectionCreateItemChange: PropTypes.func.isRequired,
  handleDeleteSelection: PropTypes.func.isRequired,
};

export default SelectionCreateItem;