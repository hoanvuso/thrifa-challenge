import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/QuestionCreateWidget/QuestionCreateWidget.css';

// Import Actions
import { addQuestionRequest } from '../../QuestionActions';

// Import Selectors
import { getQuestionReducer } from '../../QuestionReducer';

class QuestionCreatePage extends Component {
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
    this.props.dispatch(addQuestionRequest({ title, subTitle, questionType }));
  };

  render() {
    return (
      <div className="appear">
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewQuestion" /></h2>
          <input placeholder={this.props.intl.messages.questionTitle} className={styles['form-field']} ref="title" />
          <input placeholder={this.props.intl.messages.questionSubTitle} className={styles['form-field']} ref="subTitle" />
          <textarea placeholder={this.props.intl.messages.questionType} className={styles['form-field']} ref="questionType" />
          <a className={styles['question-submit-button']} href="#" onClick={this.addQuestion}><FormattedMessage id="submit" /></a>
        </div>
      </div>
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
