import * as React from "react";
import { useSelector } from "react-redux";
import "./BoardCard.css";
import Background from "../../../assets/thumbnail1.jpg";
import Background2 from "../../../assets/thumbnail2.jpg";

const getImage = (key) => {
  switch (key) {
    case "background1":
      return Background;

    case "background2":
      return Background2;

    default:
      return Background;
  }
};

const BoardCard = ({ onClick }) => {
  const data = useSelector((state) => state.boardsReducer.boards);

  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.map((item) => {
      const { id, title, description, thumbnail } = item;
      return (
        <section
          className="shadow rounded min-w-[200px] min-h-[150px] text-white overflow-hidden cursor-pointer"
          style={{
            background: `url(${getImage(thumbnail)})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
          onClick={() => onClick(id)}
          key={id}
        >
          <div className="w-full h-full bg-[#00000051] p-4">
            <h1 className="font-extrabold text-xl">{title}</h1>
            <p className="mt-2 text-xs">{description}</p>
          </div>
        </section>
      );
    })
  );
};

export default BoardCard;
