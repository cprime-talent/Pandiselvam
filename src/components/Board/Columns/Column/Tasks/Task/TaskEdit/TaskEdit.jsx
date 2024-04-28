import * as React from "react";
import { Form } from "react-router-dom";
import "./TaskEdit.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrent,
  setUserList,
} from "../../../../../../../redux/slices/tasksSlice";
import { resetShow } from "../../../../../../../redux/slices/modalSlice";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { setstatus } from "../../../../../../../redux/slices/columnsSlice";
import ApiInstance from "../../../../../../Interceptor/interceptor";

const TaskEdit = ({ getTaskList, id }) => {
  const currentTask = useSelector((state) => state.tasksReducer.current);
  const userList = useSelector((state) => state.tasksReducer.userList);
  const currentStatus = useSelector((state) => state.columnsReducer.status);

  const initialdata = {
    title: "",
    description: "",
    dueDate: "",
    assignee: "",
    status: currentStatus || "Todo",
    priority: "",
  };
  const [data, setData] = useState(initialdata);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const getUserList = async () => {
    try {
      const response = await ApiInstance.get("http://localhost:8000/users");
      dispatch(setUserList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentTask && Object.keys(currentTask)?.length > 0) {
      setData(currentTask);
    }
    getUserList();
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentTask && Object.keys(currentTask)?.length > 0) {
      const response = await ApiInstance.put(
        `http://localhost:8000/tasks/${currentTask.id}`,
        data
      );
      if (response.status == 200) {
        toast.success("Task Updated Successfully");
        dispatch(resetShow());
        dispatch(setCurrent(null));
        dispatch(setstatus(""));
      }
    } else {
      const payload = { ...data };

      payload.createdAt = `${new Date()}`;
      payload.id = uuidv4();
      payload.boardId = id;

      const response = await ApiInstance.post(
        "http://localhost:8000/tasks",
        payload
      );
      if (response.status == 201) {
        toast.success("Task Created Successfully");
        dispatch(resetShow());
        dispatch(setCurrent(null));
        dispatch(setstatus(""));
      }
    }

    getTaskList();
  };

  const deleteTask = async () => {
    const response = await ApiInstance.delete(
      `http://localhost:8000/tasks/${currentTask.id}`
    );
    if (response.status == 200) {
      dispatch(resetShow());
      dispatch(setCurrent(null));
      getTaskList();
      toast.success("Task Deleted Successfully");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <Form className="task-edit" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Task Title</label>
        <input
          required
          type="text"
          name="title"
          value={data?.title}
          onChange={handleChange}
          placeholder="Enter a Task Name"
        />

        <label htmlFor="description">Task Description</label>
        <textarea
          name="description"
          rows="4"
          maxLength="160"
          value={data?.description}
          onChange={handleChange}
          placeholder="Enter a Description"
        ></textarea>

        <label htmlFor="priority">Priority</label>
        <select name="priority" value={data?.priority} onChange={handleChange}>
          <option value={null}>No priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="assignee">Assignee</label>
        <select name="assignee" value={data?.assignee} onChange={handleChange}>
          <option value={null}>No Assignee</option>
          {userList.map((item) => (
            <option value={item.id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </select>

        <label htmlFor="status">Status</label>
        <select
          name="status"
          value={data?.status}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="InProgress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>

        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={data?.dueDate}
          onChange={handleChange}
          required
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "5%",
            marginTop: "3%",
          }}
        >
          {currentTask && (
            <button
              className="secondary_btn !px-8"
              onClick={handleClickOpen}
              style={{ gap: "5%" }}
              type="button"
            >
              Delete
            </button>
          )}
          <button className="primary_btn !px-8" type="submit">
            Confirm
          </button>
        </div>
      </Form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "black" }}
          >
            Are You Sure Want to Delete this Task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <button className="primary_btn" onClick={deleteTask} autoFocus>
            Agree
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default TaskEdit;
