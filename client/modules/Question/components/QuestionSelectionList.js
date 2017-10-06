import React, { PropTypes } from 'react';

// Import Components
import QuestionSelectionListItem from './QuestionSelectionListItem/QuestionSelectionListItem';

function QuestionSelectionList(props) {
  return (
    <div className="listView">
      {
        props.questions.map(question => (
          <QuestionSelectionListItem
            question={question}
            key={question.cuid}
            onDelete={() => props.handleDeleteQuestion(question.cuid)}
          />
        ))
      }
    </div>
  );
}

QuestionSelectionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
};

export default QuestionSelectionList;
