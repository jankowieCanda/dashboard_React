import '../App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/header_Components/Header'
import { Pictures_Section } from '../components/pictures_components/Pictures_Section'
import { getSearchError, getSearchPhotos, getSearchStatus } from '../features/search/searchSlice'
import { useEffect } from 'react'
import { getSearchPhotosThunk } from '../features/search/searchThunk'
import { Footer } from '../components/footer_Components/Footer'

function App() {
  const dispatch = useDispatch();
  const photoList = useSelector(getSearchPhotos);
  // console.log(photoList)
  const searchStatus = useSelector(getSearchStatus);
  // console.log(searchStatus)
  const searchError = useSelector(getSearchError);
  // console.log(searchError)
  

  useEffect(() => {
    if(searchStatus === 'pending') {
      console.log('pending');
    } else if(searchStatus === 'rejected') {
      console.log(`${searchStatus} - ${searchError}`);
    } else if(searchStatus === 'fulfilled') {
      console.log(photoList);
    } else if(searchStatus === 'idle') {
      dispatch(getSearchPhotosThunk());
      console.log(getSearchPhotosThunk())
    }
  }, [dispatch, photoList, searchStatus]);

  return (
    <>
      <Header />
      <NavBar />
      <Pictures_Section />
      <Footer />
    </>
  )
}

export default App
