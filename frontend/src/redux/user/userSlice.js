import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const setLoadingAndError = (state) => {
    state.loading = true;
    state.error = null;
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUpStart: setLoadingAndError,
        signInStart: setLoadingAndError,

        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
} = userSlice.actions;

export default userSlice.reducer;
