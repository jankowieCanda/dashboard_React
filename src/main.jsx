import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { MyPhotos } from './pages/MyPhotos.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<App />} />
          <Route path='/myPhotos' element={<MyPhotos />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
