import { Form } from "react-router-dom";
import "../../Board/Columns/Column/Tasks/Task/TaskEdit/TaskEdit.css";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { setUserList } from "../../../redux/slices/tasksSlice";
import { filterTaskList, isValidJSON } from "../../../utils";
import userEvent from "@testing-library/user-event";
import ApiInstance from "../../Interceptor/interceptor";

const initialdata = {
  dueDate: "",
  status: "",
  priority: "",
};
const FilterModal = ({
  setTaskdata,
  setShowFilter,
  getTaskList,
  data,
  setData,
}) => {
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.tasksReducer.taskList);
  const userLocal = localStorage.getItem("user");
  const user = isValidJSON(userLocal) ? JSON.parse(userLocal) : {};

  const currentuserTask = taskList.filter((item) => item.assignee == user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredData = currentuserTask.filter((item) =>
      filterTaskList(item, data)
    );
    setTaskdata(filteredData);
    setShowFilter(false);
  };

  const getUserList = async () => {
    try {
      const response = await ApiInstance.get("http://localhost:8000/users");
      dispatch(setUserList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const clearFilter = async () => {
    setData(initialdata);
    getTaskList();
    setShowFilter(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <Form className="task-edit" onSubmit={handleSubmit}>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={data?.dueDate}
          onChange={handleChange}
        />

        <label htmlFor="priority">Priority</label>
        <select name="priority" value={data?.priority} onChange={handleChange}>
          <option value={null}>No priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="status">Status</label>
        <select name="status" value={data?.status} onChange={handleChange}>
          <option value={""}>Select Status</option>
          <option value="Todo">ToDo</option>
          <option value="InProgress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "5%",
            marginTop: "3%",
          }}
        >
          <button
            className="secondary_btn !px-8"
            type="button"
            onClick={clearFilter}
          >
            Clear
          </button>

          <button className="primary_btn !px-8" type="submit">
            Filter
          </button>
        </div>
      </Form>
    </>
  );
};
export default FilterModal;
