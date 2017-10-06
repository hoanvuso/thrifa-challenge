// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_QUESTION } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddQuestion: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };

    case TOGGLE_ADD_QUESTION:
      return {
        showAddQuestion: !state.showAddQuestion,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Get showAddQuestion
export const getShowAddQuestionReducer = state => state.app.showAddQuestion;

// Export Reducer
export default AppReducer;
