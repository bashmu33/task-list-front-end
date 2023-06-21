import React, { useState } from "react";
import axios from "axios";
import './NewTaskForm.css';

const NewTaskForm = ({ addTask }) => {
    const [taskData, setTasks] = useState({
        title: '',
        description: '',
        isComplete: false,
    });

    const submitTaskData = (e) => {
        e.preventDefault();

        addTask(taskData);
    }
}