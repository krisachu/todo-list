import React, { useState, useEffect } from 'react';
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';
import taskService from './services/tasks';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editableTask, setEditableTask] = useState(null);

    useEffect(() => {
        console.log('Effect');
        taskService.getAll().then((initialTasks) => {
            setTasks(initialTasks);
        });
    }, []);

    const addTask = (event) => {
        event.preventDefault();

        const taskObject = {
            content: newTask,
            done: false,
        };

        taskService.create(taskObject).then((returnedTask) => {
            console.log('returnedTask', returnedTask);
            setTasks(tasks.concat(returnedTask));
            setNewTask('');
        });
    };

    const removeTask = (id) => {
        const taskFound = tasks.find((task) => task.id === id);

        if (taskFound) {
            taskService
                .remove(id)
                .then((response) => {
                    setTasks(tasks.filter((task) => task.id !== id));
                })
                .catch((error) => {
                    alert(
                        `The task '${taskFound.content}' was already deleted from server`
                    );
                    setTasks(tasks.filter((task) => task.id !== id));
                });
        }
    };

    const switchStateOfTask = (id) => {
        // find etsii ensimmäisen arvon listasta, joka vastaa käyttäjän klikkaamaa arvoa
        // kopioidaan klikkaama arvo ja asetetaan tilaksi vastakohta, koska klikkauksesta arvo muuttuu tehdyksi/ei tehdyksi
        const task = tasks.find((task) => task.id === id);
        const changedTask = { ...task, done: !task.done };

        // päivitetään kantaan käyttäjän muuttama arvo
        // jos id:t vastaavat (setTasks-kohta), palautetaan päivitetty arvo (returnedTask) listan joukkoon
        taskService.update(id, changedTask).then((returnedTask) => {
            setTasks(
                tasks.map((task) => (task.id === id ? returnedTask : task))
            );
        });
    };

    const handleTaskChange = (event) => {
        console.log(event.target.value);
        setNewTask(event.target.value);
    };

    // etsitään eka arvo listasta, joka vastaa käyttäjän klikkaamaa arvoa
    // tallennetaan klimmaama arvo steittiin

    const onEditStart = (id) => {
        const taskForEdit = tasks.find((task) => task.id === id);
        setEditableTask(taskForEdit);
    };

    const onEditTask = (event) => {
        const updatedEditableTask = {
            ...editableTask,
            content: event.target.value,
        };
        console.log(event.target.value);
        setEditableTask(updatedEditableTask);
    };

    const onEditEnd = (id) => {
        const taskFound = { ...editableTask };

        taskService.update2(id, taskFound).then((returnedTask) => {
            setTasks(
                tasks.map((task) => (task.id === id ? returnedTask : task))
            );
        });
    };

    return (
        <div className="App">
            <h1>My todo list</h1>

            <TaskForm
                onSubmit={addTask}
                taskValue={newTask}
                onTaskChange={handleTaskChange}
            />
            <Tasks
                tasks={tasks}
                removeTask={removeTask}
                switchStateOfTask={switchStateOfTask}
                onEditStart={onEditStart}
                onEditTask={onEditTask}
                onEditEnd={onEditEnd}
                editableTask={editableTask}
            />
        </div>
    );
};

export default App;
