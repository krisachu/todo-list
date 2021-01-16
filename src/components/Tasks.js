import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  Checkbox: {
    color: "#4caf50 !important",
  },
  IconButton: {
    color: "#f44336 !important",
    padding: "0px",
  },
}));

// ruksimalla boksia (input onChange) käynnistetään funktio switchStateOfTask,
// jolle annetaan id (joka tulee ylläolevan mapin kautta)
// checked= on sen hetkinen arvo (true/false), joka näkyy reaaliajassa
// jos spanissa task.done on true (eli taski on tehty) -> tällöin className (strikethrough) aktivoituu css:ssä,
// jolloin yliviivataan taski. Jos false, silloin '' (tyhjä)

const Tasks = (props) => {
  const classes = useStyles();
  return (
    <div className="todo-items">
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <Checkbox
                className={classes.Checkbox}
                color="primary"
                onChange={() => props.switchStateOfTask(task.id)}
                checked={task.done}
              />
              <input
                type="text"
                id={task.id}
                className={`input-form${task.done ? " strikethrough" : ""}`}
                onFocus={() => props.onEditStart(task.id)}
                onChange={(event) => props.onEditTask(event, task)}
                onBlur={() => props.onEditEnd(task.id)}
                value={
                  props.editableTask && props.editableTask.id === task.id
                    ? props.editableTask.content
                    : task.content
                }
              />
              <IconButton
                className={classes.IconButton}
                aria-label="Delete"
                onClick={() => props.removeTask(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tasks;
