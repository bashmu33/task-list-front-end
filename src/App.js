import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

export const URL = 'https://task-list-api-c17.onrender.com/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const newTasks = response.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.isComplete,
          };
        });
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteTask = (taskId) => {
    console.log('yellow');
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTaskCompletion = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isComplete: !task.isComplete };
        }
        return task;
      });
    });
  };

  // const addNewTask = (TASKS) => {

  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={tasks} updateTaskCompletion={updateTaskCompletion} deleteTask={deleteTask}/></div>
      </main>
    </div>
  );
};

export default App;
