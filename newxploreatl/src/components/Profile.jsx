import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProfileForm from './ProfileForm'

export default function Profile({user, setUser, profile, setProfile}) {
  
    if (!user || !profile){return <p>Loading...</p>}
//     useEffect(() => {
//       const profileData = async () => {
//         try {
//           const response = await axios.get('http://localhost:3003/profiles/')
//           console.log('profiles data:', response.data)
//           if (response.status !== 200) {
//               throw new Error('Not working')
//           }
//           setUser(response.data.user)
//           setProfile(response.data.userProfile)
//       } catch (error) {
//           console.error('Error grabbing hotspots', error)
//       }
//   }
// profileData ()
// }, [])

  return (
    <div className="Profile">
        <h2 className="Greeting">Nice to have you back, {user.username}</h2>
            <h3> Favorite Eateries: {profile.favorite_eateries}</h3>
            <h3> Favorite Hotspots: {profile.favorite_hotspots}</h3>
            <h3> Bookmarked Eateries: {profile.bookmarked_eateries}</h3>
            <h3> Bookmarked Hotspots: {profile.bookmarked_eateries}</h3>
            <ProfileForm setProfile={setProfile} profile={profile} />
    </div>
);
}