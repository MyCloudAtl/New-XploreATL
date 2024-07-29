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
import SideBar from './components/SideBar'
import RegisterForm from './components/RegisterForm'

function App() {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/currentUser');
        setCurrentUser(response.data);
    } catch (error) {
        console.error('Error fetching current user:', error);
    }
    console.log(currentUser)
  }
    getUser();
  }, []);

  return (
    <div className='App'>
      <Routes>
                <Route path="/" element={<Home currentUser={currentUser}/>} />
                <Route path="/eateries/" element={<EateryList />} />
                {/* <Route path="/eateries/:id" element={<EateryCard />} /> */}
                <Route path="/hotspots" element={<HotspotList />} />
                {/* <Route path="/hotspots/:id" element={<HotSpotCard />} /> */}
                <Route path="/locations" element={<Locations />} />
                {/* <Route path="/ratings/:id" element={<CreateRating />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  )
}

export default App
