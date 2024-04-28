import Task from "./Task/Task";
import "./Tasks.css";

const Tasks = ({ data, tasks }) => {
  const tasksComponents = Array(tasks?.length ?? 0);

  if (tasks) {
    tasks.forEach((task) => {
      tasksComponents.push(<Task taskData={task} data={data} key={task.id} />);
    });
  }
  return (
    <div className="tasks-wrapper">
      <div className="tasks">{tasksComponents}</div>
    </div>
  );
};

export default Tasks;
