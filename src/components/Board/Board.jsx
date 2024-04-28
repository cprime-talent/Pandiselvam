import Columns from "./Columns/Columns";
import "./Board.css";

const Board = ({ data, taskList }) => {
  return <Columns data={data} taskList={taskList} />;
};

export default Board;
