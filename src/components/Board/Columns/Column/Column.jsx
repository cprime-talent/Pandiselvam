import { useDispatch } from "react-redux";
import "./Column.css";
import Tasks from "./Tasks/Tasks";
import { FaCirclePlus } from "react-icons/fa6";
import { setShow } from "../../../../redux/slices/modalSlice";
import { useEffect } from "react";
import { setCurrent, setstatus } from "../../../../redux/slices/columnsSlice";

const Column = ({ columnData, taskList, tasksLen }) => {
  useEffect(() => {
    const column = document.getElementById(columnData.id);

    column.style = `background: ${
      columnData.background ? columnData.background : "transparent"
    }`;
  }, [columnData.background]);

  const dispatch = useDispatch();
  return (
    <div className="column" id={columnData.id}>
      <div className="column-header">
        <h2>
          {columnData.title}{" "}
          <span
            style={{
              background: "#13c2c2",
              borderRadius: 25,
              width: 20,
              height: 20,
              color: "#fff",
              display: "inline-flex",
              justifyContent: "center",
            }}
          >
            {tasksLen}
          </span>
        </h2>
        <div>
          <button
            onClick={() => {
              dispatch(setstatus(columnData.title));
              dispatch(setShow({ taskEdit: true }));
            }}
          >
            <FaCirclePlus />
          </button>
        </div>
      </div>
      <Tasks
        data={columnData}
        tasks={taskList.filter((item) => item.status == columnData.title)}
      />
    </div>
  );
};

export default Column;
