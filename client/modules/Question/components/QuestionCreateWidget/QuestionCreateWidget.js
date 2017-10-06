import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './QuestionCreateWidget.css';

export class QuestionCreateWidget extends Component {
  addQuestion = () => {
    const titleRef = this.refs.title;
    const subTitleRef = this.refs.subTitle;
    const questionTypeRef = this.refs.questionType;
    if (subTitleRef.value && titleRef.value && questionTypeRef.value) {
      this.props.addQuestion(subTitleRef.value, titleRef.value, questionTypeRef.value);
      subTitleRef.value = titleRef.value = questionTypeRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddQuestion ? styles.appear : '')}`;
    return (
      <div className={cls}>
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

QuestionCreateWidget.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  showAddQuestion: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(QuestionCreateWidget);
