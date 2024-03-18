import { createSlice } from '@reduxjs/toolkit'
import { getSearchPhotosThunk } from './searchThunk';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {
        searchPhotos: (state, action) => {
            state.data = [...state,action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchPhotosThunk.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(getSearchPhotosThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload.error;
        }).addCase(getSearchPhotosThunk.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'fulfilled';
            console.log(state.data)
        })
    }
});

export const {searchPhotos} = searchSlice.actions;

export const getSearchPhotos = (state) => state.search.data;
export const getSearchStatus = (state) => state.search.status;
export const getSearchError = (state) => state.search.error;


