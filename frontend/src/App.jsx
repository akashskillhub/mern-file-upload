import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MultiImage from './pages/MultiImage'
import Navbar from './pages/Navbar'
import SingleImage from './pages/SingleImage'
const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<h1>Home Page</h1>} />
        <Route
          path='/multi-image-upload'
          element={<MultiImage />} />
        <Route
          path='/single-image-upload'
          element={<SingleImage />} />
        <Route
          path='*'
          element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App