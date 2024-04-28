import { useNavigate } from "react-router-dom";
import Boards from "../components/Boards/Boards";

const Overview = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-bold text-base mb-4">YOUR WORKSPACES</h1>
      <Boards />
      <h1 className="font-bold text-base mt-12 mb-4">YOUR TASK</h1>
      <p className="text-sm font-medium text-slate-500">
        Access all your tasks from different boards conveniently in one
        centralized location. <br /> Easily navigate through your tasks and stay
        organized with a comprehensive view of your project workload.{" "}
        <span
          className="text-blue-700 underline cursor-pointer"
          onClick={() => navigate("/mytask")}
        >
          Click here
        </span>
      </p>
    </>
  );
};

export default Overview;
