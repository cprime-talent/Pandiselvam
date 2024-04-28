import { createSlice } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
	name: 'modal',
	initialState: {},
	reducers: {
		setShow: (state, action) => {
			const entries = Object.entries(action.payload)[0];
			state[entries[0]] = entries[1];
		},
		resetShow: state => ({})
	}
});

export const {
	setShow,
	resetShow
} = columnsSlice.actions;

export default columnsSlice.reducer;