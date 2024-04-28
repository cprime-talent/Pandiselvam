import "./NewBoardCard.css";

const NewBoardCard = ({ data, onClick }) => {
  return (
    <div className="board-card" id="create-board" onClick={onClick}>
      <h2 className="title">{data.title}</h2>
    </div>
  );
};

export default NewBoardCard;
