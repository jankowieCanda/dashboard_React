import { createSlice } from '@reduxjs/toolkit';

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        favPhotos: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.favPhotos = [...state.favPhotos, action.payload];
            // console.log(state.favPhotos);
            localStorage.setItem('favData', JSON.stringify(state.favPhotos));
            console.log('Added to favorite');
        },
        removeFavorite: (state, action) => {
            state.favPhotos = JSON.parse(localStorage.getItem('favData'))
            state.favPhotos = state.favPhotos.filter((photo) => photo.id !== action.payload);
            // console.log(state.favPhotos)
            console.log('Removed from favorite');
            localStorage.setItem('favData', JSON.stringify(state.favPhotos))
        }
    }
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export const getFavPhotos = (state) => state.favorite.favPhotos;