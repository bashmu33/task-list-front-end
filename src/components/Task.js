import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = ( props ) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';
  
  const handleUpdateTaskCompletion = () => {
    props.updateTaskCompletion(props.id);
  };

  const handleDeleteTask = () => {
    props.deleteTask(props.id);
  };

  // const handleAddTask = () => {
  //   props.addNewTask(props);
  // }
  
  return (
    <li className="tasks__item">
      <button className={`tasks__item__toggle ${buttonClass}`} onClick={handleUpdateTaskCompletion}>
      {props.title}</button>
      <button className="tasks__item__remove button" onClick={handleDeleteTask}>x</button>
      {/* <button onClick={handleAddTask}>Add New Task!</button> */}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTaskCompletion: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  // addNewTask: PropTypes.func.isRequired,
};

export default Task;