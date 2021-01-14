import React from 'react';

// ruksimalla boksia (input onChange) käynnistetään funktio switchStateOfTask,
// jolle annetaan id (joka tulee ylläolevan mapin kautta)
// checked= on sen hetkinen arvo (true/false), joka näkyy reaaliajassa
// jos spanissa task.done on true (eli taski on tehty) -> tällöin className (strikethrough) aktivoituu css:ssä,
// jolloin yliviivataan taski. Jos false, silloin '' (tyhjä)

const Tasks = (props) => {
    return (
        <div className="todo-items">
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input
                                onChange={() =>
                                    props.switchStateOfTask(task.id)
                                }
                                type="checkbox"
                                className="testi-css-1"
                                checked={task.done}
                            />
                            <input
                                type="text"
                                id={task.id}
                                className={`testi-css-2${
                                    task.done ? ' strikethrough' : ''
                                }`}
                                onFocus={() => props.onEditStart(task.id)}
                                onChange={event => props.onEditTask(event, task)}
                                onBlur={() => props.onEditEnd(task.id)}
                                value={props.editableTask && props.editableTask.id === task.id ? props.editableTask.content : task.content}
                            />
                            <button
                                onClick={() => props.removeTask(task.id)}
                                type="button"
                                className="delete-button"
                            >
                                X
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Tasks;
