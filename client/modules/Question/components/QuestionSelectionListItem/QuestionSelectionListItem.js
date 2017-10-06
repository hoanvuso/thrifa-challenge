import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './QuestionSelectionListItem.css';

function QuestionSelectionListItem(props) {
  return (
    <div className={styles['single-question']}>
      <h3 className={styles['question-title']}>
        <Link to={`/questions/${props.question.cuid}`} >
          {props.question.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.question.subTitle}</p>
      <p className={styles['question-desc']}>{props.question.questionType}</p>
      <p className={styles['question-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteQuestion" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

QuestionSelectionListItem.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QuestionSelectionListItem;
