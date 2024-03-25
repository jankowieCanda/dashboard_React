import { createSlice } from '@reduxjs/toolkit'
import { getSearchPhotosThunk, getSearchRandomThunk, getSearchResultThunk } from './searchThunk';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        data: [],
        result: [],
        status: 'idle',
        error: null
    },
    reducers: {
        searchPhotos: (state, action) => {
            state.data = [...state.data,action.payload]
        },
        resultList: (state, action) => {
            state.result = state.result.filter((photo, i) => photo === action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchPhotosThunk.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(getSearchPhotosThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload.error;
        }).addCase(getSearchPhotosThunk.fulfilled, (state, action) => {
            state.data = action.payload;
            state.result = action.payload;
            state.status = 'fulfilled';
        }).addCase(getSearchResultThunk.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(getSearchResultThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload.error;
        }).addCase(getSearchResultThunk.fulfilled, (state, action) => {
            state.result = action.payload.results;
            state.status = 'fulfilled';
        }).addCase(getSearchRandomThunk.fulfilled, (state, action) => {
            state.result = action.payload;
            state.status = 'fulfilled';
        })
    }
});

export const {searchPhotos, resultList } = searchSlice.actions;

export const getSearchPhotos = (state) => state.search.data;
export const getSearchResult = (state) => state.search.result;
export const getSearchStatus = (state) => state.search.status;
export const getSearchError = (state) => state.search.error;


