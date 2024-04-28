import { useDispatch } from "react-redux";
import BoardCard from "./BoardCard/BoardCard";
import "./Boards.css";
import { useNavigate } from "react-router-dom";
import { setBoards } from "../../redux/slices/boardsSlice";
import { useEffect } from "react";
import axios from "axios";
import { setUserList } from "../../redux/slices/tasksSlice";
import ApiInstance from "../Interceptor/interceptor";

const Boards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  const getUserList = async () => {
    try {
      const response = await ApiInstance.get("http://localhost:8000/users");
      dispatch(setUserList(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBoard = async () => {
    try {
      const response = await ApiInstance.get("http://localhost:8000/boards");
      if (response.data) {
        dispatch(setBoards(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserList();
    fetchBoard();
  }, []);

  return (
    <>
      <div className="boards">
        <BoardCard
          onClick={(id) => {
            handleClick(id);
          }}
        />
      </div>
    </>
  );
};

export default Boards;
