import './App.css'
import axios from 'axios'
import Reat, { useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import EateryList from './components/EateryList'
import HotspotList from './components/HotspotList'
import Locations from './components/Locations'
import Login from './components/Login'
import Logout from './components/Logout'
import RegisterForm from './components/RegisterForm'
import Profile from './components/Profile'


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [profile,setProfile] = useState({favorite_eateries: [], 
    favorite_hotspots: [], bookmarked_eateries: [], bookmarked_eateries: []})
  const [user, setUser] = useState({username: ''})

  return (
    <div className='App'>
      <Routes>
                <Route path="/" element={<Home 
                user={user}
                setUser={setUser}
                profile={profile}
                setProfile={setProfile}/>} />
                <Route path="/eateries/" element={<EateryList />} />
                {/* <Route path="/eateries/:id" element={<EateryCard />} /> */}
                <Route path="/hotspots" element={<HotspotList />} />
                {/* <Route path="/hotspots/:id" element={<HotSpotCard />} /> */}
                <Route path="/locations" element={<Locations />} />
                <Route path="/dashboard" element={<Dashboard currentUser={currentUser}/>} />
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile user={user}
                setUser={setUser} 
                profile={profile}
                setProfile={setProfile}/>}/>
      </Routes>
    </div>
  )
}

export default App
