import React from 'react'

const TaskForm = (props) => {

    return (
        <form id="todo-list-form" onSubmit={props.onSubmit}>
            <div>
                <input
                    placeholder="Add task"
                    value={props.taskValue}
                    onChange={props.onTaskChange}
                />
                <button type="submit">Add</button>
            </div>
        </form>
    )
}


export default TaskForm