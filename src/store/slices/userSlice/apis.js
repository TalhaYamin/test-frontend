import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000";


export const getUsers = createAsyncThunk("users", async () => {
    try {
        const response = await axios.get(`${apiUrl}/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
});


export const createUser = createAsyncThunk("users/createUser",
    async (userData) => {
        try {
            const response = await axios.post(`${apiUrl}/users`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    });

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, text }) => {
        try {
            const response = await axios.patch(`${apiUrl}/users/${userId}`, { text });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


