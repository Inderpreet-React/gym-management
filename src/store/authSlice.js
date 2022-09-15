import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, user: false };

const authSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		login(state, action) {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.user = false;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
