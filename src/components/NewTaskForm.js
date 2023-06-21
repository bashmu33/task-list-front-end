import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
    const [taskData, setTasks] = useState({
        title: '',
        description: '',
        isComplete: false,
    });

    const handleAddNewTask = (e) => {
        setTasks(e.target.value);
    };

    const submitTaskData = (e) => {
        e.preventDefault();

        props.addNewTask(taskData);
        setTasks({ title: '', description: '', isComplete: false});
    };

    return (
        <form onSubmit={submitTaskData}>
            <h2>Add a Task Here:</h2>
            <input type="text" onChange={handleAddNewTask} value={taskData.title} />
        </form>
    );

};

NewTaskForm.propTypes = {
    addNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;

