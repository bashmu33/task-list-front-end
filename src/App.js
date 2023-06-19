import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

export const URL = 'https://task-list-api-c17.onrender.com/';

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

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


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={tasks} updateTaskCompletion={updateTaskCompletion} /></div>
      </main>
    </div>
  );
};

export default App;
