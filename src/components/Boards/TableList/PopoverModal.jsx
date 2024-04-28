import * as React from "react";
import dayjs from "dayjs";
import { Form } from "react-router-dom";
import "../../Board/Columns/Column/Tasks/Task/TaskEdit/TaskEdit.css";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { setUserList } from "../../../redux/slices/tasksSlice";
import Popover from "@mui/material/Popover";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FilterListIcon from "@mui/icons-material/FilterList";
import moment from "moment";
import ApiInstance from "../../Interceptor/interceptor";

const filterTaskList = (item, filterOptions) => {
  let flag = true;
  const { duedate, assignee, status, priority } = filterOptions;
  if (
    (duedate && duedate !== item.dueDate) ||
    (Array.isArray(assignee) &&
      assignee.length > 0 &&
      !assignee.includes(item.assignee)) ||
    (status && status !== item.status) ||
    (priority && priority !== item.priority)
  ) {
    flag = false;
  }
  return flag;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const PopoverModal = ({ setTaskdata }) => {
  const userList = useSelector((state) => state.tasksReducer.userList);
  const dispatch = useDispatch();
  const initialdata = {
    assignee: [],
    status: "",
    priority: "",
  };
  const [data, setData] = useState(initialdata);
  const [duedate, setDuedate] = useState(null);
  const taskList = useSelector((state) => state.tasksReducer.taskList);

  const applyFilter = async (e) => {
    e.preventDefault();
    const filterOptions = { ...data };
    filterOptions.duedate = duedate
      ? moment(duedate?.toDate()).format("YYYY-MM-DD")
      : null;
    filterOptions.assignee = filterOptions.assignee.map(({ id }) => id);
    const filteredData = taskList.filter((item) =>
      filterTaskList(item, filterOptions)
    );
    setTaskdata(filteredData);
    setAnchorEl(false);
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
    setTaskdata(taskList);
    setDuedate(null);
    setAnchorEl(false);
  };
  const handleChange = (e, val) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <button
        aria-describedby={"simple-popover"}
        onClick={handleClick}
        className="secondary_btn"
      >
        Filter
        <FilterListIcon />
      </button>
      <Popover
        id={"simple-popover"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <DialogTitle
          style={{ color: "black", fontSize: "18px", fontWeight: "700" }}
        >
          Filter
        </DialogTitle>
        <DialogContent dividers>
          <Form className="task-edit" onSubmit={applyFilter}>
            <label htmlFor="dueDate">Due Date</label>
            <DateCalendar
              value={duedate}
              className="!w-full !m-0 !p-0"
              onChange={(newValue) => setDuedate(newValue)}
            />
            <label htmlFor="assignee">Assignee</label>

            <FormControl fullWidth>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={userList}
                disableCloseOnSelect
                getOptionLabel={(option) => option.firstName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.firstName}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Assignee" />
                )}
                name="assignee"
                value={data?.assignee}
                onChange={(_, value) =>
                  handleChange({ target: { value, name: "assignee" } })
                }
              />
            </FormControl>
            <label htmlFor="Priority">Priority</label>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="priority"
                value={data?.priority}
                label="priority"
                onChange={handleChange}
              >
                <MenuItem value={""}> Select priority</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>

            <label htmlFor="status">Status</label>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data?.status}
                label="status"
                name="status"
                onChange={handleChange}
              >
                <MenuItem value={""}>Select Status</MenuItem>
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
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
        </DialogContent>
      </Popover>
    </>
  );
};
export default PopoverModal;
