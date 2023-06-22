import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
    const [taskData, setTasks] = useState({
        title: '',
        description: '',
        isComplete: false,
    });


    const submitTaskData = (e) => {
        e.preventDefault();

        props.addNewTask(taskData);
        console.log(taskData);
        setTasks({ title: '', description: '', isComplete: false});
        };

    const handleAddNewTask = (e) => {
        const { id, value } = e.target;
        setTasks((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    // const handleAddNewTask = (e) => {
    //     setTasks({...taskData, [e.target.title]: e.target.value});
    //     };

    return (
        <form onSubmit={submitTaskData}>
            <h2>Add a Task Here:</h2>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={handleAddNewTask} value={taskData.title} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" onChange={handleAddNewTask} value={taskData.description} />
            <button type="submit">Submit</button>
        </form>
    );

};

NewTaskForm.propTypes = {
    addNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;

