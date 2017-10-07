import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Components
import OneChoiceSelectionItem from '../OneChoiceSelectionItem/OneChoiceSelectionItem';
import MultiChoiceSelectionItem from '../MultiChoiceSelectionItem/MultiChoiceSelectionItem';

// Import Style
import styles from './QuestionListItem.css';

class QuestionListItem extends Component {

  componentWillMount() {
    this.resultMessage = "";
    this.questionType = this.props.question.questionType;
    this.selectionAnswers = [];
    this.props.question.selections.map((title, key) => {
      this.selectionAnswers.push({
        itemType: this.questionType,
        itemKey: [this.props.question.cuid, key.toString()].join('-'),
        itemName: [this.props.question.cuid, 'selection'].join('-'),
        itemValue: title,
        isSelected: false,
      });
    });

    console.log("componentWillMount", this.selectionAnswers);
  };

  handleSelectItem = (key) => {
    if (this.questionType == 'one-choice') {
      this.selectionAnswers.map((selection) => {
        if (selection.itemKey == key) {
          selection.isSelected = true;
        }
        else {
          selection.isSelected = false;
        }
      });
    }
    else {
      this.selectionAnswers.map((selection) => {
        if (selection.itemKey == key) {
          selection.isSelected = !selection.isSelected;
        }
      });
    }

    console.log("handleSelectItem", this.selectionAnswers);
  }

  handleOnSubmit = (event) => {
    var answerArr = [];
    for (var index in this.selectionAnswers) {
      if (this.selectionAnswers[index].isSelected) {
        answerArr.push(this.selectionAnswers[index].itemValue);
      }
    }

    var answer = answerArr.join('&');
    if (answer == this.props.question.desiredAnswer) {
      this.resultMessage = "Correct Answer.";
    }
    else {
      this.resultMessage = "Incorrect Answer!!!!!";
    }
    this.forceUpdate();
  }

  renderOneChoiceSelectionItem = () => {
    return(
      <form>
        <p className="h3 text-left mb-4">{this.props.question.title}</p>
        <p className="text-left mb-4">{this.props.question.subTitle}</p>

        {
          this.selectionAnswers.map((selection) => (
            <OneChoiceSelectionItem
              itemType={selection.questionType}
              itemKey={selection.itemKey}
              itemName={selection.itemName}
              itemValue={selection.title}
              handleSelectItem={this.handleSelectItem}
            />
          ))
        }

        <div className="text-center">
          <p className="text-left text-danger">{this.resultMessage}</p>
          <a className="btn btn-deep-orange" onClick={this.handleOnSubmit.bind(this)}>Submit</a>
        </div>
      
      </form>
    )
  }

  renderMultiChoiceSelectionItem = () => {
    return (
      <form>
        <p className="h3 text-left mb-4">{this.props.question.title}</p>
        <p className="text-left mb-4">{this.props.question.subTitle}</p>

        {
          this.props.question.selections.map((title, key) => (
            <MultiChoiceSelectionItem
              itemType={this.props.question.questionType}
              itemKey={[this.props.question.cuid, key.toString()].join('-')}
              itemName={[this.props.question.cuid, 'selection'].join('-')}
              itemValue={title}
              handleSelectItem={this.handleSelectItem}
            />
          ))
        }

        <div className="text-center">
            <p className="text-left text-danger">{this.resultMessage}</p>
            <a className="btn btn-deep-orange" onClick={this.handleOnSubmit.bind(this)}>Submit</a>
        </div>
      
      </form>
    )
  }

  render() {
    const {questionType} = this.props.question;
    if (questionType == 'one-choice') {
      return this.renderOneChoiceSelectionItem();
    }
    else {
      return this.renderMultiChoiceSelectionItem()
    }
  }
}

QuestionListItem.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    desiredAnswer: PropTypes.string.isRequired,
    selections: PropTypes.arrayOf(PropTypes.string).isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QuestionListItem;
