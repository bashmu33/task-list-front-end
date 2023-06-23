import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        isComplete: false,
    });


    const submitTaskData = (e) => {
        e.preventDefault();

        props.addNewTask(taskData);
        setTaskData({ title: '', description: '', isComplete: false});
        };

        const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevTaskData) => ({
            ...prevTaskData,
            [name]: value,
        }));
        };
        

    return (
        <form onSubmit={submitTaskData}>
            <h2>Add a Task Here:</h2>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" onChange={handleChange} value={taskData.title} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" 
            onChange={handleChange} value={taskData.description} />
            <button type="submit">Submit</button>
        </form>
    );

};

NewTaskForm.propTypes = {
    addNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;

