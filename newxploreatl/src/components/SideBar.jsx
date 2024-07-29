import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link, useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
// import DeleteAccount from './components/DeleteAccount'
// import { Link } from 'react-router-dom'
import Logout from './Logout';

export default function SideBar() {
  const {id} = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');
  // const navigate = useNavigate()


// useEffect(() => {
    const getUser = async () => {
      try {
        console.log("User ID:", id)
          const response = await axios.get('http://localhost:3003/currentUser')
          setUser(response.data)
          console.log(currentUser)
          setLoading(false)
      } catch (error) {
          console.error('Error fetching user data:', error)
          setLoading(false)
      }
  }
  useEffect(() => {
  getUser()
}, [id])
  if (loading) {
      return <p>Loading...</p>;
  }

  if (!user) {
      return <p>No user data available.</p>;
  }

return (
  <div className="Sidebar">
      {/* {user ? ( */}
        <div className='UserLink'>
          <h1 className="Greeting">Nice to have you back, {user.username ||'Guest'}</h1>
          {/* <div className="Logout">
            <Link to="/logout">Logout</Link>
          </div> */}
        </div>
      {/* ) : ( */}
        <div className='AuthLinks'>
          <Logout />
          {/* <Link to="/login">Login</Link>
          <Link to="/register">Create User</Link> */}
        </div>
      {/* )} */}
      </div>
)}