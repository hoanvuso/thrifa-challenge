import React, { PropTypes } from 'react';

// Import Components
import SelectionCreateItem from './SelectionCreateItem/SelectionCreateItem';

// Import CSS
import styles from './SelectionCreateItem/SelectionCreateItem.css';

function SelectionCreateListItem(props) {
  return (
    <div className={styles['selection-items']}>
      {
        props.selections.map(selection => (
          <SelectionCreateItem
            itemKey={selection.itemKey}
            itemValue={selection.itemValue}
            isCorrectAnswer={selection.isCorrectAnswer}
            questionType={props.questionType}
            handleSelectionCreateItemChange={props.handleSelectionCreateItemChange}
            handleSelectCorrectAnswer={props.handleSelectCorrectAnswer}
            handleDeleteSelection={props.handleDeleteSelection}
          />
        ))
      }
    </div>
  );
}

SelectionCreateListItem.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.shape({
    itemKey: PropTypes.string.isRequired,
    itemValue: PropTypes.string,
    isCorrectAnswer: PropTypes.bool,
  })).isRequired,
  questionType: PropTypes.string.isRequired,
  handleDeleteSelection: PropTypes.func.isRequired,
  handleSelectionCreateItemChange: PropTypes.func.isRequired,
  handleSelectCorrectAnswer: PropTypes.func.isRequired,
};

export default SelectionCreateListItem;
