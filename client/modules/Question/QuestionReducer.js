import { ADD_QUESTION, ADD_QUESTIONS, DELETE_QUESTION } from './QuestionActions';

// Initial State
const initialState = { data: [] };

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION :
      return {
        data: [action.question, ...state.data],
      };

    case ADD_QUESTIONS :
      return {
        data: action.questions,
      };

    case DELETE_QUESTION :
      return {
        data: state.data.filter(question => question.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all questions
export const getQuestionsReducer = state => state.questions.data;

// Get question by cuid
export const getQuestionReducer = (state, cuid) => state.questions.data.filter(question => question.cuid === cuid)[0];

// Export Reducer
export default QuestionReducer;
