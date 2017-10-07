import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import Helmet from 'react-helmet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Components
import SelectionCreateListItem from '../../components/SelectionCreateListItem';
import SelectionCreateItem from '../../components/SelectionCreateItem/SelectionCreateItem';

// Import Style
import styles from '../../components/QuestionCreateWidget/QuestionCreateWidget.css';

// Import Actions
import { addQuestionRequest } from '../../QuestionActions';

// Import Selectors
// import { getQuestionReducer } from '../../QuestionReducer';


class QuestionCreatePage extends Component {
  componentWillMount() {
    this.questionSelections = [
      {itemKey: "selectionItem1", itemValue: "", isCorrectAnswer: false},
      {itemKey: "selectionItem2", itemValue: "", isCorrectAnswer: false},
    ];
    this.currentOffset = 3;
    this.questionType = 'one-choice';
  };

  addQuestion = () => {
    const titleRef = this.refs.title;
    const subTitleRef = this.refs.subTitle;
    const questionTypeRef = this.refs.questionType;
    
    if (subTitleRef.value && titleRef.value && questionTypeRef.value) {
      this.handleAddQuestion(subTitleRef.value, titleRef.value, questionTypeRef.value);
      subTitleRef.value = titleRef.value = questionTypeRef.value = '';
    }
  };

  handleAddQuestion = ( title, subTitle, questionType) => {
    var selections = [];
    this.questionSelections.map(selection => selections.push(selection.itemValue));

    var desiredAnswerArr = [];
    for (var index in this.questionSelections) {
      if (this.questionSelections[index].isCorrectAnswer) {
        desiredAnswerArr.push(this.questionSelections[index].itemValue);
      }
    }

    var desiredAnswer = desiredAnswerArr.join('&');  
    
    this.props
        .dispatch(addQuestionRequest({ title, subTitle, questionType, desiredAnswer, selections }))
        .then((onSuccess, onFailure) => {
            browserHistory.push('/');
        });
  };

  onChangeQuestionType = () => {
    this.questionType = this.refs.questionType.value;
    this.questionSelections.map(selection => {
      selection.isCorrectAnswer = false;
    });
    this.forceUpdate();
  };

  handleSelectionCreateItemChange = (key, value) => {
    this.questionSelections.map(selection => {
      if (selection.itemKey == key) {
        selection.itemValue = value;
      }
    });
  };

  handleSelectCorrectAnswer = (key) => {
    const questionTypeRef = this.refs.questionType;
    if (questionTypeRef.value == 'one-choice') {
      this.questionSelections.map(selection => {
        if (selection.itemKey == key) {
          selection.isCorrectAnswer = true;
        }
        else {
          selection.isCorrectAnswer = false;
        }
      });
    } 
    else {
      this.questionSelections.map(selection => {
        if (selection.itemKey == key) {
          selection.isCorrectAnswer = !selection.isCorrectAnswer;
        }
      });
    }
    this.forceUpdate();
  };

  handleDeleteSelection = (key) => {
    for (var index in this.questionSelections) {
      if (this.questionSelections[index].itemKey == key) {
        this.questionSelections.splice(index, 1);
      }
    }
    this.forceUpdate();
  };

  handleAddSelection = () => {
    var itemKey = "selectionItem" + this.currentOffset;
    this.questionSelections.push({
      itemKey: itemKey,
      itemValue: "",
      isCorrectAnswer: false,
    });
    this.currentOffset++;
    this.forceUpdate();
  };

  render() {
    return (
      <section className="form-elegant">
          <div className="card">
              <div className="card-body mx-4">
                  <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                          <strong>Create Question</strong>
                      </h3>
                  </div>

                  <div className="md-form pb-3">
                      <select className={[styles['mdb-select'], 'custom-select'].join(' ')} 
                              ref="questionType"
                              onChange={this.onChangeQuestionType}>
                          <option value="one-choice">Selection Choice</option>
                          <option value="multi-choice">Multiple Choice</option>
                      </select>
                  </div>

                  <div className="md-form">
                      <input placeholder={this.props.intl.messages.questionTitle} 
                              type="text" className="form-control" id="field-question-title"
                              ref="title" />
                  </div>

                  <div className="md-form pb-3">
                      <input placeholder={this.props.intl.messages.questionSubTitle} 
                              type="text" className="form-control" id="field-question-sub-title"
                              ref="subTitle" />
                  </div>

                  <SelectionCreateListItem 
                    handleSelectionCreateItemChange={this.handleSelectionCreateItemChange} 
                    handleSelectCorrectAnswer={this.handleSelectCorrectAnswer} 
                    handleDeleteSelection={this.handleDeleteSelection} 
                    selections={this.questionSelections}
                    questionType={this.questionType} />

                  <div className="text-left mb-3">
                    <button type="button" className="btn btn-flat btn-md" onClick={this.handleAddSelection}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      Add new answer
                    </button>
                  </div>

                  <div className="text-center mb-3">
                      <button type="button" 
                              className="btn blue-gradient btn-block btn-rounded z-depth-1a"
                              onClick={this.addQuestion}>
                          Save
                      </button>
                  </div>
              </div>
          </div>
      </section>
    );
  }
}

QuestionCreatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(QuestionCreatePage));
