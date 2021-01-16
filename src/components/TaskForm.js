import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  TextField: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  addButton: {
    background: "#673ab7 !important",
    color: "white",
  },
  form: {
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

const TaskForm = (props) => {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={props.onSubmit}>
      <TextField
        className={classes.TextField}
        id="standard-basic"
        label="New task"
        value={props.taskValue}
        onChange={props.onTaskChange}
      />
      <Fab
        className={classes.addButton}
        aria-label="add"
        type="submit"
      >
        <AddIcon />
      </Fab>
    </form>
  );
};

export default TaskForm;
