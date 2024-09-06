import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import { TubeProvider } from './Components/Context/TubeContext'
import Profile from './Pages/Profile/Profile'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'

function App() {

  const [sidebar, setSidebar] = useState(true)
  const [category, setCategory] = useState(0)
  


  return (
    <div>
      <TubeProvider>
      <Navbar setSidebar={setSidebar} category={category} setCategory={setCategory}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} category={category} setCategory={setCategory} />}/>
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      </TubeProvider>
    </div>
  )
}

export default App
