// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_ADD_QUESTION = 'TOGGLE_ADD_QUESTION';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleAddQuestion() {
  return {
    type: TOGGLE_ADD_QUESTION,
  };
}
