import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

// id, title, isComplete

const Task = ( props ) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';
  
  const handleUpdateTaskCompletion = () => {
    props.updateTaskCompletion(props.id);
  };
  
  return (
    <li className="tasks__item">
      <button className={`tasks__item__toggle ${buttonClass}`} onClick={handleUpdateTaskCompletion}>
      {props.title}</button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  // tasks.PropTypes.arrayOf(
  //   PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTaskCompletion: PropTypes.func.isRequired,
// })
// )
};

export default Task;