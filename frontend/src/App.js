import React from 'react'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import NavBar from './components/NavBar'
import AvailableRooms from './components/AvailableRooms'
import SearchContextProvider from './components/context/SearchContext'
import RoomListing from './components/RoomListing'

import Profile from './components/Profile'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { AuthProvider } from './components/context/AuthProvider'

function App() {
  return (
    <AuthProvider>
        <SearchContextProvider className="">
            <NavBar/>
            <Routes>
                <Route
                    path="/profile/:username"
                    element={<ProtectedRoute><Profile /></ProtectedRoute>}

                />
                <Route
                    path="/list/:"
                    element={<ProtectedRoute><RoomListing/></ProtectedRoute>}

                />
                <Route path='/for-rent/:india' element={<AvailableRooms/>}/>
                <Route path='/' element={<HomePage></HomePage>}/>
                <Route path='/signup' element={<SignUp/>}></Route>
                <Route path='/login' element={<Login/>}/>
            </Routes>

        </SearchContextProvider>
    </AuthProvider>
  )
}

export default App