import { useDispatch, useSelector } from 'react-redux';
import { getSearchError, getSearchPhotos, getSearchStatus } from '../../features/search/searchSlice';
import { useEffect, useState } from 'react';
import { getSearchPhotosThunk } from '../../features/search/searchThunk';
import { addFavorite, removeFavorite, getFavPhotos } from "../../features/favorite/favoriteSlice";
import './Pictures_Section.scss';
import { useLocation } from 'react-router-dom';
import { Descriptions_Modal } from './Descriptions_Modal';
import { createPortal } from 'react-dom';
 
let favData = localStorage.getItem('favData');
let favs = JSON.parse(favData);
const homeOptions = ['../src/assets/downloadIcon.png', '../src/assets/favoriteIcon.png'];
const myPhotosOptions = ['../src/assets/downloadIcon.png', '../src/assets/trashIcon.png', '../src/assets/FavIcon.png'];

export const Pictures_Section = () => {
    const dispatch = useDispatch();
    const photoList = useSelector(getSearchPhotos);
    const searchStatus = useSelector(getSearchStatus);
    const searchError = useSelector(getSearchError);
    const favPhotos = useSelector(getFavPhotos);
    const location = useLocation();

    useEffect(() => {
        if(searchStatus === 'pending') {
            console.log('pending');
        } else if(searchStatus === 'rejected') {
            console.log(`${searchStatus} - ${searchError}`);
        } else if(searchStatus === 'fulfilled') {
            console.log('fulfilled');
        } else if(searchStatus === 'idle') {
            dispatch(getSearchPhotosThunk());
        }
    }, [dispatch, photoList, searchStatus]);

    const [picture, setPicture] = useState();

    useEffect(() => {
        if(location.pathname === '/') {
            if(photoList) {
                setPicture(() => {
                    return photoList.map((photo, i) => {
                        return (
                            <div key={i} className='pictures__picBox'>
                                <img id={`photo_${photo.id}`} className='photo' src={photo.urls.full} alt={photo.alt_description} /> 
                                <div className="optionsBar">
                                    <div className="iconBox">
                                        <img id={`download_${photo.id}`} className='icon download' src={homeOptions[0]} alt='download' onClick={handleClick}/>
                                    </div>
                                    <div className="iconBox">
                                        <img id={`favorite_${photo.id}`} className='icon favorite' src={favs !== null && favs.includes(photo.id) ? myPhotosOptions[2] : homeOptions[1]} alt='favorite' onClick={handleClick}/>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                });
            }
            
        } else if(location.pathname === '/myPhotos') {
            if(favs) {                
                // console.log(favs)

                setPicture(() => {
                    return favs.map((photo, i) => {
                        return (
                            <div key={i} className='pictures__border'>
                                <div className='pictures__picBox'>
                                    <img id={`photo_${photo.id}`} className='photo' src={photo.url} alt={photo.alt_description} /> 
                                    <div className="optionsBar">
                                        <div className="iconBox">
                                            <img id={`download_${photo.id}`} className='icon download' src={myPhotosOptions[0]} alt='download' onClick={handleClick}/>
                                        </div>
                                        <div className="iconBox">
                                            <img id={`trash_${photo.id}`} className='icon trash' src={myPhotosOptions[1]} alt='trash' onClick={handleClick}/>
                                        </div>
                                        <div className="iconBox">
                                            <img id={`favorite_${photo.id}`} className='icon favorite' src={myPhotosOptions[2]} alt='favorite' onClick={handleClick}/>
                                        </div>
                                    </div>
                                    <div className="descriptions">
                                        <h3 className="descriptions__title">Descriptions</h3> 
                                        <img id={`edit_${photo.id}`} className='icon edit' src='../src/assets/editIcon.png' alt='edit' onClick={handleClick} />
                                        <div className='descriptions__boxList'>
                                            <ul className='descriptions__boxList_list'>
                                                <li className='descriptions__boxList_list-item'><span>Width:</span> {photo.width}</li>
                                                <li className='descriptions__boxList_list-item'><span>Height:</span> {photo.height}</li>
                                                <li className='descriptions__boxList_list-item'><span>Likes:</span> {photo.likes}</li>
                                                <li className='descriptions__boxList_list-item'><span>Created at:</span> {photo.created_at}</li>
                                            </ul>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        );
                    });
                });
            }
        }
        
    }, [photoList, favPhotos, location])

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');

    const handleClick = (event) => {
        let btn = event.target;
        photoList.forEach((pic) => {

            if(btn.id.match(pic.id) && btn.alt === 'favorite') {
                if(favs !== null){
                    if((btn.src).match('favoriteIcon.png') && !favs.includes(pic.id)){
                        btn.src = '../src/assets/FavIcon.png';
                        let favoritePic = {
                            id: pic.id,
                            width: pic.width,
                            height: pic.height,
                            likes: pic.likes,
                            created_at: pic.created_at,
                            url: pic.urls.full,
                            alt_description: pic.alt_description
                        }
                        dispatch(addFavorite(favoritePic));
                        // console.log(favoritePic)
    
                    } else if((btn.src).match('FavIcon.png')){
                        btn.src = '../src/assets/favoriteIcon.png';
                        console.log(favPhotos)
                        dispatch(removeFavorite(pic.id));
                    }       
                } else if(favs === null) {
                    if((btn.src).match('favoriteIcon.png')){
                        btn.src = '../src/assets/FavIcon.png';
                        let favoritePic = {
                            id: pic.id,
                            width: pic.width,
                            height: pic.height,
                            likes: pic.likes,
                            created_at: pic.created_at,
                            url: pic.urls.full,
                            alt_description: pic.alt_description
                        }
                        dispatch(addFavorite(favoritePic));
                        // console.log(favoritePic)
                    }
                }
                
            } else if (btn.id.match(pic.id) && btn.alt === 'favorite' && favs.includes(pic.id)) {
                btn.src = '../src/assets/FavIcon.png';
                dispatch(removeFavorite(pic.id));
            } else if(btn.id.match(pic.id) && btn.alt === 'download') {
                let key = import.meta.env.VITE_ACCESS_KEY;

                const downloadPhoto = async () => {
                    const request = await fetch(`${pic.links.download_location}/${key}`);
                    const data = await request.json();
                    // console.log(data)
                    return data;
                };

                dispatch(downloadPhoto);
                console.log('downloaded');
            } else if(btn.id.match(pic.id) && btn.alt === 'trash') {
                dispatch(removeFavorite(pic.id));
                console.log('deleted');
            }
            else if(btn.id.match(pic.id) && btn.alt === 'edit') {
                setShowModal(true);
                setId(pic.id);
                console.log('edit');
            }
        });
    }

    
    return (
        
        <>
            <section className="pictures">
                {picture}
                {showModal && createPortal (
                    <Descriptions_Modal data={{id, url, alt_description}} setShowModal={setShowModal}/>,
                    document.body
                )
                }
            </section>
        </>
    )
}