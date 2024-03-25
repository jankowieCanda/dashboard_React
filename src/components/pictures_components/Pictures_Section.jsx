import { useDispatch, useSelector } from 'react-redux';
import { getSearchError, getSearchPhotos, getSearchStatus, getSearchResult, resultList } from '../../features/search/searchSlice';
import { useEffect, useState } from 'react';
import { getSearchPhotosThunk, getSearchResultThunk } from '../../features/search/searchThunk';
import { addFavorite, removeFavorite, getFavPhotos } from "../../features/favorite/favoriteSlice";
import './Pictures_Section.scss';
import { useLocation } from 'react-router-dom';
import { Descriptions_Modal } from './Descriptions_Modal';
import { createPortal } from 'react-dom';
import downloadIcon from '../../assets/downloadIcon.png'
import favoriteIcon from '../../assets/favoriteIcon.png';
import favIcon from '../../assets/FavIcon.png';
import trashIcon from '../../assets/trashIcon.png';
import editIcon from '../../assets/editIcon.png';
 
let favData = localStorage.getItem('favData');
let favs = JSON.parse(favData);

export const Pictures_Section = () => {
    const dispatch = useDispatch();
    const photoList = useSelector(getSearchPhotos);
    const searchList = useSelector(getSearchResult);
    const searchStatus = useSelector(getSearchStatus);
    const searchError = useSelector(getSearchError);
    const favPhotos = useSelector(getFavPhotos);
    const location = useLocation();
    const [searchResult, setSearchResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(searchStatus === 'pending') {
            console.log('pending');
            setIsLoading(true);
        } else if(searchStatus === 'rejected') {
            console.log(`${searchStatus} - ${searchError}`);
        } else if(searchStatus === 'fulfilled') {
            console.log('fulfilled');
            setIsLoading(false);
        } else if(searchStatus === 'idle') {
            dispatch(getSearchPhotosThunk());
            if(searchInput !== ''){
                dispatch(getSearchResultThunk(searchInput))
                setSearchResult(searchList['results']);
            }
        }
    }, [dispatch, searchList, photoList, searchStatus]);

    
    const [picture, setPicture] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [select, setSelect] = useState('');

    

    const handleClickSearch = (e) => {
        e.preventDefault();
        dispatch(getSearchResultThunk(searchInput))
        setSearchResult(() => searchList.filter((item, i) => item.alt_description.includes(searchInput)));
        dispatch(resultList(searchResult));
    }

    
    useEffect(() => {
        if(location.pathname === '/') {
            if(searchList) {
                setPicture(() => {
                    return searchList.map((photo, i) => {
                        return (
                            <div key={i} className='pictures__picBox'>
                                <img id={`photo_${photo.id}`} className='photo' src={photo.urls.full} alt={photo.alt_description} /> 
                                <div className="optionsBar">
                                    <div className="iconBox">
                                        <img id={`download_${photo.id}`} className='icon download' src={downloadIcon} alt='download' onClick={handleClick}/>
                                    </div>
                                    <div className="iconBox">
                                        <img id={`favorite_${photo.id}`} className='icon favorite' src={favoriteIcon} alt='favorite' onClick={handleClick}/>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                });
            } else if(photoList){
                setPicture(() => {
                    return photoList.map((photo, i) => {
                        return (
                            <div key={i} className='pictures__picBox'>
                                <img id={`photo_${photo.id}`} className='photo' src={photo.urls.full} alt={photo.alt_description} /> 
                                <div className="optionsBar">
                                    <div className="iconBox">
                                        <img id={`download_${photo.id}`} className='icon download' src={downloadIcon} alt='download' onClick={handleClick}/>
                                    </div>
                                    <div className="iconBox">
                                        <img id={`favorite_${photo.id}`} className='icon favorite' src={favoriteIcon} alt='favorite' onClick={handleClick}/>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                });
            }
            
        } else if(location.pathname === '/myPhotos') {
            if(favs) {
                setPicture(() => {
                    return favs.map((photo, i) => {
                        return (
                            <div key={i} className='pictures__border'>
                                <div className='pictures__favBox'>
                                    <img id={`photo_${photo.id}`} className='favphoto' src={photo.url} alt={photo.alt_description} /> 
                                    <div className="optionsFavBar">
                                        <div className="favIconBox">
                                            <img id={`download_${photo.id}`} className='icon download' src={downloadIcon} alt='download' onClick={handleClick}/>
                                        </div>
                                        <div className="favIconBox">
                                            <img id={`trash_${photo.id}`} className='icon trash' src={trashIcon} alt='trash' onClick={handleClick}/>
                                        </div>
                                        <div className="favIconBox">
                                            <img id={`favorite_${photo.id}`} className='icon favorite' src={favIcon} alt='favorite' onClick={handleClick}/>
                                        </div>
                                    </div>
                                    <div className="descriptions">
                                        <h3 className="descriptions__title">Descriptions</h3> 
                                        <img id={`edit_${photo.id}`} className='icon edit' src={editIcon} alt='edit' onClick={handleClick} />
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
            } else {
                setPicture(() => <p className='favs_empty'> No hay fotos favoritas...</p>)
            }
        }
    }, [photoList, searchList, favPhotos, location])

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [url, seturl] = useState('');
    const [alt, setAlt] = useState('');

    const handleClick = (event) => {
        let btn = event.target;
        photoList.forEach((pic) => {

            if(btn.id.match(pic.id) && btn.alt === 'favorite') {
                if(favs){
                    if((btn.src).match('favoriteIcon.png') && !favs.includes(pic.urls.full)){
                        btn.src = '../src/assets/FavIcon.png';
                        let favoritePic = {
                            id: pic.id,
                            width: pic.width,
                            height: pic.height,
                            likes: pic.likes,
                            created_at: pic.created_at.toString(),
                            url: pic.urls.full,
                            alt_description: pic.alt_description
                        }
                        dispatch(addFavorite(favoritePic));
    
                    } else if((btn.src).match('FavIcon.png')){
                        btn.src = '../src/assets/favoriteIcon.png';
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
                            created_at: pic.created_at.toString(),
                            url: pic.urls.full,
                            alt_description: pic.alt_description
                        }
                        dispatch(addFavorite(favoritePic));
                    }
                }
                
            } else if (btn.id.match(pic.id) && btn.alt === 'favorite' && favs.includes(pic.urls.full)) {
                btn.src = '../src/assets/FavIcon.png';
                dispatch(removeFavorite(pic.id));
            } else if(btn.id.match(pic.id) && btn.alt === 'download') {
                let key = import.meta.env.VITE_ACCESS_KEY;

                const downloadPhoto = async () => {
                    const request = await fetch(`${pic.links.download_location}/${key}`);
                    const data = await request.json();
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
                seturl(pic.urls.full)
                setAlt(pic.alt_description)
                // console.log('edit');
            }
        });
    }

    return (
        <section className="pictures">
        { isLoading ? 
            <p className='loading'>Loading...</p> :
            <>
                <div className="searchBar">
                    <form className="searchBar__form" id='searchForm' onSubmit={handleClickSearch}>
                        <div className="searchBar__form_components">
                            <button className="searchBar__form_btn btn">
                                <img src="..\src\assets\searchBtnIcon.png" alt="Search Button" className="searchBar__form_btn-icon icon" />
                            </button>
                            <input value={searchInput} id="search" className="searchBar__form_input" type="text" placeholder="Buscar imágenes..." onChange={(e) => setSearchInput(e.target.value)} />
                            {<select value={select} name="form_select" id="form_select" className="searchBar__form_select" onChange={(e) => setSelect(e.target.value)}>
                                <option value="All">Todas las fotos</option>
                                <option value="myPhotos">Mis fotos favoritas</option>
                            </select>}
                        </div>
                    </form>
                </div>
                {picture}
                {showModal && createPortal (
                    <Descriptions_Modal value={{id, url, alt}} setShowModal={setShowModal}/>,
                    document.body
                )
                }
            </>
        }
        </section>
    );
}