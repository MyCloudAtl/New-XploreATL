import './App.css'
import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import EateryList from './components/EateryList'
import HotspotList from './components/HotspotList'
import Locations from './components/Locations'
import Login from './components/Login'
import Logout from './components/Logout'
import RegisterForm from './components/RegisterForm'
// import UserContext from './UserContext'
// import { UserProvider } from './UserContext'
// import Profile from './components/Profile'


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  // const [profile, setProfile] = useState({
  //   favorite_eateries: [],
  //   favorite_hotspots: [],
  //   bookmarked_eateries: [],
  //   bookmarked_hotspots: []
  // })
  const [user, setUser] = useState({username: '' })
  
  const updateCurrentUser = (newState) => {
    setCurrentUser(newState);
  };

  return (
    <div className='App'>
        {/* <UserProvider> */}
      <Routes>
                <Route path="/" element={<Home 
                user={user}
                setUser={setUser} />} />
                <Route path="/eateries/" element={<EateryList />} />
                {/* <Route path="/eateries/:id" element={<EateryCard />} /> */}
                <Route path="/hotspots" element={<HotspotList />} />
                {/* <Route path="/hotspots/:id" element={<HotSpotCard />} /> */}
                <Route path="/locations" element={<Locations />} />
                <Route path="/dashboard" element={<Dashboard updateCurrentUser={updateCurrentUser}/>} />
                <Route path="/login" element={<Login updateCurrentUser={updateCurrentUser}/>} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/logout" element={<Logout />} />
      </Routes>
        {/* </UserProvider> */}
    </div>
  )
}

export default App
