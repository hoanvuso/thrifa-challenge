import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import Helmet from 'react-helmet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Components
import SelectionCreateItem from '../../components/SelectionCreateItem/SelectionCreateItem';

// Import Style
import styles from '../../components/QuestionCreateWidget/QuestionCreateWidget.css';

// Import Actions
import { addQuestionRequest } from '../../QuestionActions';

// Import Selectors
// import { getQuestionReducer } from '../../QuestionReducer';


class QuestionCreatePage extends Component {
  componentWillMount() {
    this.questionSelections = {};
  };

  addQuestion = () => {
    const titleRef = this.refs.title;
    const subTitleRef = this.refs.subTitle;
    const questionTypeRef = this.refs.questionType;
    const desiredAnswerRef = this.refs.desiredAnswer;
    console.log(this.refs);
    if (subTitleRef.value && titleRef.value && questionTypeRef.value) {
      this.handleAddQuestion(subTitleRef.value, titleRef.value, questionTypeRef.value, desiredAnswerRef.value);
      subTitleRef.value = titleRef.value = questionTypeRef.value = '';
    }
  };

  handleAddQuestion = ( title, subTitle, questionType, desiredAnswer) => {
    var selections = Object.values(this.questionSelections);
    this.props
        .dispatch(addQuestionRequest({ title, subTitle, questionType, desiredAnswer, selections }))
        .then((onSuccess, onFailure) => {
            browserHistory.push('/');
        });
  };

  handleSelectionCreateItemChange = (key, value) => {
    this.questionSelections[key] = value;
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
                      <select className={styles['mdb-select']} ref="questionType">
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

                  <div className="md-form pb-3">
                      <input placeholder={this.props.intl.messages.questionDesiredAnswer} 
                              type="text" className="form-control" id="field-question-desired-answer"
                              ref="desiredAnswer" />
                  </div>

                  <SelectionCreateItem
                    itemKey="selectionItem1"
                    handleSelectionCreateItemChange={this.handleSelectionCreateItemChange}
                    itemValue=""
                  />

                  <SelectionCreateItem
                    itemKey="selectionItem2"
                    handleSelectionCreateItemChange={this.handleSelectionCreateItemChange}
                    itemValue=""
                  />

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
