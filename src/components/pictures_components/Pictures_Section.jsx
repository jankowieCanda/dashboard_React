import { useDispatch, useSelector } from 'react-redux';
import { getSearchError, getSearchPhotos, getSearchStatus } from '../../features/search/searchSlice'
import { useEffect } from 'react'
import { getSearchPhotosThunk } from '../../features/search/searchThunk'
import { optionsBar } from './pictures_optionsBar';
import './Pictures_Section.scss';

export const Pictures_Section = () => {
    const dispatch = useDispatch();
    const photoList = useSelector(getSearchPhotos);
    const searchStatus = useSelector(getSearchStatus);
    const searchError = useSelector(getSearchError);


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

    const picture = photoList.map((photo, i) => {
        return (
            <div key={i} className='pictures__picBox'>
                <img className='photo' src={photo.urls.full} alt={photo.alt_description} />
                {optionsBar()}
            </div>
        )
    })

    return (
        <section className="pictures">{picture}</section>
    )
}