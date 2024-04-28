import { createSlice, current } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("tasks")) ?? [],
    current: null,
    userList: [],
    taskList: [],
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
  },
});

export const { setCurrent, setUserList, setTaskList } = tasksSlice.actions;

export default tasksSlice.reducer;
