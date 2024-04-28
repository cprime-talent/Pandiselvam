import "./Task.css";
import { setCurrent } from "../../../../../../redux/slices/tasksSlice";
import { setShow } from "../../../../../../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import { FaPerson, FaUser } from "react-icons/fa6";
const Task = ({ taskData, data }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.tasksReducer.userList);

  return (
    <div>
      <div
        className={`task`}
        id={taskData.id}
        onClick={() => {
          dispatch(setCurrent(taskData));
          dispatch(setShow({ taskEdit: true }));
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title={
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                {taskData.title}
              </span>
            }
            style={{
              borderBottom: "1px solid #f0f0f0",
              padding: "12px",
            }}
          />
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ffe58f",
                  padding: "12px 8px",
                  borderRadius: "4px",
                  height: "20px",
                  gap: "5px",
                  color: "#faad14",
                }}
              >
                <AccessTimeIcon style={{ fontSize: "medium" }} />
                <p>
                  {moment(new Date(taskData.dueDate)).format("MMM DD")}
                </p>{" "}
              </div>{" "}
            </Typography>
            {
              <Tooltip
                title={
                  taskData.assignee
                    ? userList.filter((item) => item.id == taskData.assignee)[0]
                        ?.firstName
                    : "UnAssigned"
                }
              >
                <Avatar
                  style={{ width: "25px", height: "25px" }}
                  sx={{
                    bgcolor: userList.filter(
                      (item) => item.id == taskData.assignee
                    )[0]?.color,
                    color: taskData.assignee ? "#fff" : "#000",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  aria-label="recipe"
                >
                  {taskData.assignee ? (
                    userList
                      .filter((item) => item.id == taskData.assignee)[0]
                      ?.firstName?.slice(0, 1)
                  ) : (
                    <FaUser />
                  )}
                </Avatar>
              </Tooltip>
            }
          </CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0px 10px 0px 10px",
            }}
          ></div>
        </Card>
      </div>
    </div>
  );
};

export default Task;
