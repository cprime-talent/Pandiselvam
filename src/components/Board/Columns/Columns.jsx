import { useSelector } from "react-redux";
import Column from "./Column/Column";
import "./Columns.css";

const Columns = ({ data, taskList }) => {
  const columnsData = useSelector((state) => state.columnsReducer.columns);
  const columns = Array(columnsData.length);

  columnsData.forEach((columnData) => {
    columns.push(
      <Column
        columnData={columnData}
        taskList={taskList}
        key={columnData.id}
        tasksLen={
          taskList.filter((item) => item.status === columnData.title).length
        }
      />
    );
  });

  return (
    <>
      <div className="columns">{columns}</div>
    </>
  );
};

export default Columns;
