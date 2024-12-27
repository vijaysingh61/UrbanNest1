import React from 'react'
import HomePage from './components/HomePage'
import { Route, Routes,useLocation } from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import NavBar from './components/NavBar'
import AvailableRooms from './components/AvailableRooms'
import SearchContextProvider from './components/context/SearchContext'
import RoomListing from './components/RoomListing'

import Profile from './components/Profile'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { AuthProvider } from './components/context/AuthProvider'
import MyListing from './components/MyListing'
import Footer from './components/Footer'
import RoomDetail from './components/RoomDetail'
import UserDataProvider from './components/context/userData'

function App() {
    const location = useLocation();
  return (
    <AuthProvider>
        <UserDataProvider>
        <SearchContextProvider className="">
            <NavBar/>
            <Routes>
                <Route
                    path="/profile/:username"
                     element={<ProtectedRoute><Profile /></ProtectedRoute>}
                    //element = {<Profile></Profile>}

                />
                <Route
                    path="/list/:"
                    element={<ProtectedRoute><RoomListing/></ProtectedRoute>}

                />
                <Route 
                    path='/mylisting'
                    element = {<ProtectedRoute><MyListing/></ProtectedRoute>}
                />
                <Route path='/for-rent/:india' element={<AvailableRooms/>}/>
                <Route path='/' element={<HomePage></HomePage>}/>
                <Route path='/signup' element={<SignUp/>}></Route>
                <Route path='/login' element={<Login/>}/>
                <Route path='/room-detail' element = {<RoomDetail/>}/>
            </Routes>
            
            {location.pathname !== '/' && <Footer />}

        </SearchContextProvider>
        </UserDataProvider>
    </AuthProvider>
  )
}

export default App