import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/QuestionListItem/QuestionListItem.css';

// Import Actions
import { fetchQuestion } from '../../QuestionActions';

// Import Selectors
import { getQuestionReducer } from '../../QuestionReducer';

export function QuestionDetailPage(props) {
  return (
    <div>
      <Helmet title={props.question.title} />
      <div className={`${styles['single-question']} ${styles['question-detail']}`}>
        <h3 className={styles['question-title']}>{props.question.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.question.subTitle}</p>
        <p className={styles['question-desc']}>{props.question.questionType}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
QuestionDetailPage.need = [params => {
  return fetchQuestion(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    question: getQuestionReducer(state, props.params.cuid),
  };
}

QuestionDetailPage.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(QuestionDetailPage);
