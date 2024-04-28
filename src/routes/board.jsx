import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/Board/Board";
import { useLoaderData } from "react-router-dom";
import { resetShow, setShow } from "../redux/slices/modalSlice";
import Modal from "../components/Modal/Modal";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {
  setCurrent,
  setTaskList,
  setUserList,
} from "../redux/slices/tasksSlice";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import TaskEdit from "../components/Board/Columns/Column/Tasks/Task/TaskEdit/TaskEdit";
import PopoverModal from "../components/Boards/TableList/PopoverModal";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { setstatus } from "../redux/slices/columnsSlice";
import ApiInstance from "../components/Interceptor/interceptor";

export async function loader({ params }) {
  return params.boardId;
}

const Board = () => {
  const boardsData = useSelector((state) => state.boardsReducer.boards);
  const id = useLoaderData();
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.tasksReducer.taskList);
  const userList = useSelector((state) => state.tasksReducer.userList);
  const board = boardsData.find((boardData) => boardData.id === id);
  const showTaskModal = useSelector((state) => state.modalReducer).taskEdit;
  const [taskData, setTaskData] = useState(taskList);
  const [showReset, setShowReset] = useState(false);

  const getUserList = async () => {
    try {
      const response = await ApiInstance.get("http://localhost:8000/users");
      dispatch(setUserList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (id) => {
    const data = taskList.filter((doc) => doc.assignee == id);
    setTaskData(data);
    setShowReset(true);
  };

  const getTaskList = async () => {
    try {
      const response = await ApiInstance.get("http://localhost:8000/tasks");
      const boardTask = response.data?.filter((doc) => doc.boardId === id);
      dispatch(setTaskList(boardTask));
      setTaskData(boardTask);
      setShowReset(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskList();
    getUserList();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="board-title my-5">
          <h1>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/boards">
                Home
              </Link>
              <Typography color="text.primary">
                {" "}
                Board <span>{board?.title}</span>
              </Typography>
            </Breadcrumbs>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 25 }}>
          <AvatarGroup max={7} total={userList.length}>
            {userList.map((item) => (
              <Avatar
                onClick={() => handleFilter(item.id)}
                sx={{ bgcolor: item.color }}
              >
                {item.firstName?.slice(0, 1)}
              </Avatar>
            ))}
          </AvatarGroup>

          {showReset && (
            <button onClick={getTaskList} className="secondary_btn">
              Reset Board <RefreshIcon />
            </button>
          )}

          <PopoverModal setTaskdata={setTaskData} />
          <button
            onClick={() => {
              dispatch(setCurrent({}));
              dispatch(setShow({ taskEdit: true }));
            }}
            className="secondary_btn"
          >
            Create Task
            <AddIcon />
          </button>
        </div>
      </div>
      <BoardComponent data={board} taskList={taskData} />

      {showTaskModal && (
        <Modal
          onClose={() => {
            dispatch(setCurrent(null));
            dispatch(resetShow());
            dispatch(setstatus(""));
          }}
          title={"Task Details"}
        >
          <TaskEdit getTaskList={getTaskList} id={id} />
        </Modal>
      )}
    </>
  );
};

export default Board;
