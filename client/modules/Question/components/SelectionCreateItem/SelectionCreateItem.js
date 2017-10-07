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
    handleSelectionCreateItemChange(itemKey, event.target.value);
  };

  onSelectCorrectAnswer = (event) => {
    const { handleSelectCorrectAnswer, itemKey } = this.props;
    handleSelectCorrectAnswer(itemKey);
  };

  onDeleteItem = () => {
    const { handleDeleteSelection, itemKey } = this.props;
    handleDeleteSelection(itemKey);    
  };

  render() {
    const { itemKey, itemValue, isCorrectAnswer, questionType } = this.props;

    var checked = isCorrectAnswer ? "checked" : false;

    var correctAnswerInput = (
      <input type="radio" name="correctAnswer" id={itemKey} 
          onClick={this.onSelectCorrectAnswer.bind(this)}
          checked={checked} />
    );
    if (questionType == 'multi-choice') {
      var correctAnswerInput = (
        <input type="checkbox" name="correctAnswer" id={itemKey} 
            onClick={this.onSelectCorrectAnswer.bind(this)}
            checked={checked} />
      );
    }
    
    return (
      <div className="md-form pb-3">
        <div className="row">
          <div className="col-sm-7">
            <input placeholder="Answer Option"
                  type="text" className="form-control" 
                  value={this.state.itemValue}
                  ref={itemKey}
                  onChange={this.onChangeItem.bind(this)} />
          </div>
          <div className="col-sm-3">
            {correctAnswerInput}
            <label htmlFor={itemKey}>Correct Answer</label>
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
  isCorrectAnswer: PropTypes.bool,
  questionType: PropTypes.string.isRequired,
  handleSelectionCreateItemChange: PropTypes.func.isRequired,
  handleSelectCorrectAnswer: PropTypes.func.isRequired,
  handleDeleteSelection: PropTypes.func.isRequired,
};

export default SelectionCreateItem;