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
            state.favPhotos = JSON.parse(localStorage.getItem('favData'));
            state.favPhotos = state.favPhotos.filter((photo) => photo.id !== action.payload);
            // console.log(state.favPhotos)
            console.log('Removed from favorite');
            localStorage.setItem('favData', JSON.stringify(state.favPhotos))
        },
        changeDescriptions: (state, action) => {
            state.favPhotos = JSON.parse(localStorage.getItem('favData'));
            let formData = action.payload
            state.favPhotos = state.favPhotos.map((photo, index) => {
                if(photo.id === formData.id){
                    if(photo.width !== formData.width && formData.width === '') {
                        formData.width = photo.width;
                        formData.height;
                        formData.likes;
                        formData.created;
                        state.favPhotos.splice(index, 1, formData); 
                    }
                    if(photo.height !== formData.height && formData.height === ''){
                        formData.width;
                        formData.height = photo.height;
                        formData.likes;
                        formData.created;
                        state.favPhotos.splice(index, 1, formData); 
                    }
                    if(photo.likes !== formData.likes && formData.likes === ''){
                        formData.width;
                        formData.height;
                        formData.likes = photo.likes;
                        formData.created;
                        state.favPhotos.splice(index, 1, formData); 
                    }
                    if(photo.created_at !== formData.created && formData.created === ''){
                        formData.width;
                        formData.height;
                        formData.likes;
                        formData.created = photo.created_at;
                        state.favPhotos.splice(index, 1, formData); 
                    }
                    state.favPhotos.splice(index, 1, formData)
                    console.log(state.favPhotos);
                }  
                localStorage.setItem('favData', JSON.stringify(state.favPhotos))      
            });

        }
    }
});

export const { addFavorite, removeFavorite, changeDescriptions } = favoriteSlice.actions;
export const getFavPhotos = (state) => state.favorite.favPhotos;