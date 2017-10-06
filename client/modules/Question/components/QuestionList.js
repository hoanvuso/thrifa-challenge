import React, { PropTypes } from 'react';

// Import Components
import QuestionListItem from './QuestionListItem/QuestionListItem';

function QuestionList(props) {
  return (
    <div className="listView">
      {
        props.questions.map(question => (
          <QuestionListItem
            question={question}
            key={question.cuid}
            onDelete={() => props.handleDeleteQuestion(question.cuid)}
          />
        ))
      }
    </div>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
};

export default QuestionList;
