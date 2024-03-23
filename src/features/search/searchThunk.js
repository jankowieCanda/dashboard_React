import { createAsyncThunk } from "@reduxjs/toolkit";

const url = import.meta.env.VITE_URL;
const key = import.meta.env.VITE_ACCESS_KEY;
const photos = import.meta.env.VITE_PHOTOS;
const search = import.meta.env.VITE_SEARCH;
const random = import.meta.env.VITE_RANDOM;



export const getSearchPhotosThunk = createAsyncThunk('search/getPhotos', async () => {
    
    const request = await fetch(`${url}${photos}${key}`);
    const data = await request.json();
    return data;
    
});
export const getSearchResultThunk = createAsyncThunk('search/getResult', async (input) => {
   
    const request = await fetch(`${url}${search}${input}&${key}`);
    const data = await request.json();
    return data;  
    
});
