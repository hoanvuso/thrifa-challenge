import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const DELETE_QUESTION = 'DELETE_QUESTION';

// Export Actions
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addQuestionRequest(question) {
  return (dispatch) => {
    return callApi('questions', 'post', {
      question: {
        title: question.title,
        subTitle: question.subTitle,
        questionType: question.questionType,
        desiredAnswer: question.desiredAnswer,
        selections: question.selections,
      },
    }).then(res => dispatch(addQuestion(res.question)));
  };
}

export function addQuestions(questions) {
  return {
    type: ADD_QUESTIONS,
    questions,
  };
}

export function fetchQuestions() {
  return (dispatch) => {
    return callApi('questions').then(res => {
      dispatch(addQuestions(res.questions));
    });
  };
}

export function fetchQuestion(cuid) {
  return (dispatch) => {
    return callApi(`questions/${cuid}`).then(res => dispatch(addQuestion(res.question)));
  };
}

export function deleteQuestion(cuid) {
  return {
    type: DELETE_QUESTION,
    cuid,
  };
}

export function deleteQuestionRequest(cuid) {
  return (dispatch) => {
    return callApi(`questions/${cuid}`, 'delete').then(() => dispatch(deleteQuestion(cuid)));
  };
}
