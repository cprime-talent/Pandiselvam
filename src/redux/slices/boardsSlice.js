import { createSlice, current } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    current: null,
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    create: (state, action) => {
      const title = action.payload?.title ?? "Project Demo";
      const id = action.payload?.id ?? window.crypto.randomUUID();

      const newBoard = {
        type: "board",
        title,
        background: { active: "color", data: { bgUrl: null, bgColor: null } },
        id,
      };

      state.boards.push(newBoard);

      localStorage.setItem("boards", JSON.stringify(current(state.boards)));
    },
    insertAfter: (state, action) => {
      const { droppedBoard, board } = action.payload;

      let droppedIndex;
      let boardIndex;

      for (let i = 0; i < state.boards.length; i++) {
        const currBoard = state.boards[i];

        if (currBoard.id === droppedBoard.id) droppedIndex = i;
        if (currBoard.id === board.id) boardIndex = i;

        if (droppedIndex !== undefined && boardIndex !== undefined) break;
      }

      state.boards.splice(droppedIndex, 1);

      const addition = droppedIndex > boardIndex ? 1 : 0;
      state.boards.splice(boardIndex + addition, 0, droppedBoard);

      localStorage.setItem("boards", JSON.stringify(current(state.boards)));
    },
    remove: (state, action) => {
      const board = action.payload;
      const boardIndex = state.boards.findIndex(
        (stateBoard) => stateBoard.id === board.id
      );

      state.boards.splice(boardIndex, 1);
      localStorage.setItem("boards", JSON.stringify(current(state.boards)));
    },
    setTitle: (state, action) => {
      const board = state.boards.find(
        (board) => board.id === action.payload.id
      );

      board.title = action.payload.title;

      localStorage.setItem("boards", JSON.stringify(current(state.boards)));
    },
    setBackground: (state, action) => {
      const board = state.boards.find(
        (board) => board.id === action.payload.id
      );

      const type = action.payload.type;
      const bg = action.payload.background;

      board.background.data[type] = bg;

      localStorage.setItem("boards", JSON.stringify(current(state.boards)));
    },
    setActiveBackground: (state, action) => {
      const board = state.boards.find(
        (board) => board.id === action.payload.id
      );

      board.background.active = action.payload.type;

      localStorage.setItem("boards", JSON.stringify(current(state.boards)));
    },
  },
});

export const {
  setCurrent,
  create,
  insertAfter,
  remove,
  setTitle,
  setBackground,
  setActiveBackground,
  setBoards,
} = boardsSlice.actions;

export default boardsSlice.reducer;
