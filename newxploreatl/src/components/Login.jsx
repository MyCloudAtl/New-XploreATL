// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom"

// const Login = () => {
//     let navigate = useNavigate()
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [message, setMessage] = useState('')
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post(`http://localhost:3003/login`, { username, password });
//         console.log(response)
//         setMessage('Login successful');
//         navigate('/')
//       } catch (error) {
//          setMessage('Login failed');
//           console.error('Error:', error);
//           } 
//         }
//     return (
//       <div>
//       <h2>Login</h2>
//       <form className='Login' onSubmit={handleSubmit}>
//           <div>
//               <label>Username:</label>
//               <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//           </div>
//           <div>
//               <label>Password:</label>
//               <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//       </div>
//     )
// }
// export default Login
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ updateCurrentUser }) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3003/login', { username, password }, { withCredentials: true })
      console.log(response)
      setMessage(response.data.message)
      if (updateCurrentUser) {
        updateCurrentUser(response.data.user)
      } else {
        console.error('updateCurrentUser is not defined')
      }
      navigate('/')
    } catch (error) {
      setMessage('Login failed')
      console.error('Error:', error)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="Login" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login


