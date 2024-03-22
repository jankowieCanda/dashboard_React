import { createSlice } from '@reduxjs/toolkit'
import { getSearchPhotosThunk } from './searchThunk';

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
            state.result = action.payload;
            state.status = 'fulfilled';
            console.log(state.data);
            console.log(state.result);
        })
    }
});

export const {searchPhotos, resultList } = searchSlice.actions;

export const getSearchPhotos = (state) => state.search.data;
export const getSearchResult = (state) => state.search.result;
export const getSearchStatus = (state) => state.search.status;
export const getSearchError = (state) => state.search.error;


