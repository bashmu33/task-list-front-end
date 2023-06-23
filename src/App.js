import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';
import './App.css';
import axios from 'axios';

export const URL = 'https://task-list-api-c17.onrender.com/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    isComplete: false
  });

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const newTasks = response.data.map((task) => ({
            id: task.id,
            title: task.title,
            isComplete: task.isComplete || false,
        }));
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteTask = (taskId) => {
    return axios
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
    let endPoint = tasks.find((task) => task.id === taskId).isComplete ? 'mark_incomplete' : 'mark_complete';

    return axios
      .patch((`${URL}/${taskId}/${endPoint}`))
      .then(() => {
        setTasks((prevTasks) => {
          return prevTasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isComplete: !task.isComplete };
            }
            return task;
          });
        });
      })
      .catch((error) => console.log(error));

  };

  const addNewTask = (taskData) => {
    return axios
      .post(URL, taskData)
      .then((response) => {

        const newTasks = {
          id: response.data.id, 
          title: taskData.title, 
          description: taskData.description, 
          isComplete: taskData.isComplete, 
      };
          setTasks([...tasks, newTasks]);
          setTaskData({ title: '', description: '', isComplete: false });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList tasks={tasks} updateTaskCompletion={updateTaskCompletion} deleteTask={deleteTask}/>
        <NewTaskForm addNewTask={addNewTask}></NewTaskForm>
      </main>
    </div>
  );
};

export default App;
