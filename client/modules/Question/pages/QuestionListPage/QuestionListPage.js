import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import QuestionList from '../../components/QuestionList';
// import QuestionCreateWidget from '../../components/QuestionCreateWidget/QuestionCreateWidget';

// Import Actions
import { addQuestionRequest, fetchQuestions, deleteQuestionRequest } from '../../QuestionActions';
import { toggleAddQuestion } from '../../../App/AppActions';

// Import Selectors
import { getShowAddQuestionReducer } from '../../../App/AppReducer';
import { getQuestionsReducer } from '../../QuestionReducer';

class QuestionListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  handleDeleteQuestion = question => {
    if (confirm('Do you want to delete this question')) { // eslint-disable-line
      this.props.dispatch(deleteQuestionRequest(question));
    }
  };

  handleAddQuestion = ( title, subTitle, questionType) => {
    this.props.dispatch(toggleAddQuestion());
    this.props.dispatch(addQuestionRequest({ title, subTitle, questionType }));
  };

  render() {
    return (
      <div>
        <QuestionList 
            handleDeleteQuestion={this.handleDeleteQuestion} 
            questions={this.props.questions} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
QuestionListPage.need = [() => { return fetchQuestions(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddQuestion: getShowAddQuestionReducer(state),
    questions: getQuestionsReducer(state),
  };
}

QuestionListPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
  })).isRequired,
  showAddQuestion: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

QuestionListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(QuestionListPage);
