import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Components
import OneChoiceSelectionItem from '../OneChoiceSelectionItem/OneChoiceSelectionItem';
import MultiChoiceSelectionItem from '../MultiChoiceSelectionItem/MultiChoiceSelectionItem';

// Import Style
import styles from './QuestionListItem.css';

class QuestionListItem extends Component {

  handleSelectItem = (key, value) => {
    this.questionSelections[key] = value;
  }

  handleOnSubmit = (event) => {
    console.log(event);
  }

  renderOneChoiceSelectionItem = () => {
    return(
      <form>
        <p className="h3 text-left mb-4">{this.props.question.title}</p>
        <p className="text-left mb-4">{this.props.question.subTitle}</p>

        {
          this.props.question.selections.map((title, key) => (
            <OneChoiceSelectionItem
              itemType={this.props.question.questionType}
              itemKey={[this.props.question.cuid, key.toString()].join('-')}
              itemName={[this.props.question.cuid, 'selection'].join('-')}
              itemValue={title}
              handleSelectItem={this.handleSelectItem}
            />
          ))
        }

        <div className="text-center">
            <a href="#" className="btn btn-deep-orange" onClick={this.handleOnSubmit.bind(this)}>Submit</a>
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
            <a href="#" className="btn btn-deep-orange" onClick={this.handleOnSubmit.bind(this)}>Submit</a>
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
