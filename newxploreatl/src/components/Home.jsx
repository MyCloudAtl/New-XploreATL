// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Link, useParams } from 'react-router-dom'
// import NavBar from './NavBar'
// import Footer from './Footer'
// // import SideBar from './SideBar'
// import Locations from './Locations'


// export default function Home() {
//   const { id } = useParams()
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//   const getUser = async () => {
//     try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) {
//             throw new Error('User not logged in');
//         }
//         const response = await axios.get(`http://localhost:3003/users/${userId}`)
//         console.log(response)
//         setUser(response.data)
//         setLoading(false)
//     } catch (error) {
//         console.error('Error fetching user data:', error)
//         setLoading(false)
//     }console.log('User ID:', userId);
// };

//     // useEffect(() => {
//       getUser();
// }, [])

// if (loading) {
//     return <p>Loading...</p>;
// }

//   return (
//     <div className="Home">
//       <div className="Main">
//         <header className="Header">
//           <h1>XploreATL</h1>
// <h2 className="Greeting">Nice to have you back, {user?.username ||'Guest'}</h2>
//           {<Locations />}
//         </header>
//         <div className='Body'>
//           <nav className='Nav'>
//           {<NavBar />}
//           </nav>
//         </div>
//         {/* <main className='Side'>
//           {<SideBar/>}
//         </main> */}
//       </div>
//       <div className='Footer'>
//         <Footer />
//       </div>
//     </div>
//   )
// } 

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import Locations from './Locations';
import Logout from './Logout'
// import Profile from './Profile';
import DeleteAccount from './DeleteAccount'
import UserContext from '../UserContext'

const Home = () => {
    // {user, setUser, profile, setProfile}
    const [loading, setLoading] = useState(true)
    // const { user } = useContext(UserContext)
    const { user, setUser } = useContext(UserContext)

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3003/currentUser', { withCredentials: true });
            console.log(response.data)
            setUser(response.data.user);
            // setProfile(response.data.userProfile)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };
        useEffect(() => {
          getUser();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        return <p>No user data available.</p>;
    }

    return (
        <div className="Home">
            <div className="Main">
                <header className="Header">
                    <h1>XploreATL</h1>
                    <Locations />
                </header>
                <div className='Body'>
                    <nav className='Nav'>
                        <NavBar />
                    </nav>
                 </div>
                 <h2 className="Greeting">Nice to have you back, {user.username}</h2>
                    {/* <Profile user={user} setUser={setUser} profile={profile} setProfile={setProfile}/> */}
                    <Logout />
                <DeleteAccount userId={user._id}/>
                 </div>
            <div className='Footer'>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
