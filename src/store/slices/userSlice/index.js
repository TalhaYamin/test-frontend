import {
    createSlice,
} from "@reduxjs/toolkit";
import { createUser, getUsers, updateUser } from "./apis";

const initialState = {
    status: "idle",
    error: null,
    selectedUser: undefined,
    data: [],
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },

    },

    extraReducers(builder) {

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = [action?.payload, ...state?.data];
        });

        builder.addCase(getUsers.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loading = false;
            state.data = action.payload;

        });

        builder.addCase(getUsers.rejected, (state, action) => {
            state.status = "error";
            state.loading = "error";
            state.error = action.error.message;
        });



        // builder.addCase(updateUser.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.data = state.data.map(user =>
        //         user._id === action.payload._id ? action.payload : user
        //     );
        // })




        builder.addCase(updateUser.fulfilled, (state, action) => {

            state.data = state?.data?.map(user => {
                if (user?._id === action?.payload?._id) {
                    return action?.payload
                }
                return user
            })
        });


    },

});

export const { setSelectedUser } = userSlice?.actions;


export default userSlice.reducer;