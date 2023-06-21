import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';
import './App.css';
import PropTypes from 'prop-types';
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
    let endPoint = '';
    const updateEndPoint = tasks.map((task) => {
      if (task.id === taskId && !tasks.isComplete) {
        return endPoint = 'mark_incomplete';
      } else if (task.id === taskId && tasks.isComplete) {
        return endPoint = 'mark_complete';
      }
    });

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

  // {
  //   setTasks(prevTasks) => {
  //     prevTasks.map((task) => {
  //       if (task.id === taskId) {
  //         {...task, isComplete: !task.isComplete};
  //       }
  //     });
    
  // });
  // }
  // const updateTaskCompletion = (taskId) => {
  //   setTasks((prevTasks) => {
  //     return prevTasks.map((task) => {
  //       if (task.id === taskId) {
  //         return { ...task, isComplete: !task.isComplete };
  //       }
  //       return task;
  //     });
  //   });
  // };

  const addNewTask = (taskData) => {
    return axios
      .post(URL, taskData)
      .then((response) => {
        const newTasks = [...tasks];
        newTasks.push({ id: response.data.id, title: '', description: '', isComplete: false, ...tasks });
        setTasks(newTasks);
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
        <NewTaskForm addNewTask={addNewTask}/>
      </main>
    </div>
  );
};

export default App;
