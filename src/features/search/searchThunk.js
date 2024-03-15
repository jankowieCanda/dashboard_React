import { createAsyncThunk } from "@reduxjs/toolkit";


export const getSearchPhotosThunk = createAsyncThunk('search/getPhotos', async () => {
    let url = import.meta.env.VITE_URL
    let key = import.meta.env.VITE_ACCESS_KEY

    const request = await fetch(`${url}${key}`);
    const data = await request.json();
    // console.log(data)
    return data;
    
});