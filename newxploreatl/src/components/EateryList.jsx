import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

export default function EateryList() {
    const [eateries, setEateries] = useState([])

    useEffect(() => {
        const eateriesData = async () => {
            try {
                const response = await axios.get('http://localhost:3003/eateries')
                console.log('Eateries data:', response.data);
                if (response.status !== 200) {
                    throw new Error('Not working')
                }
                setEateries(response.data)
            } catch (error) {
                console.error('Error grabbing eateries', error)
            }
        };
    eateriesData ()
    }, [])


    const handleLike = async (eateryId) => {
      await axios.post(`http://localhost:3003/users/${user._id}/likeEatery/${eateryId}`)
      const response = await axios.get(`http://localhost:3003/users/${user._id}`)
      setUser(response.data)
    };
    
    const handleUnlike = async (eateryId) => {
      await axios.post(`http://localhost:3003/users/${user._id}/unlikeEatery/${eateryId}`)
      const response = await axios.get(`http://localhost:3003/users/${user._id}`)
    setUser(response.data)
    } 

  return (
    <div className="EateryList">
        {<NavBar />}
        <h1>EateryList</h1>
        <ul>
       {eateries.map(eatery => (
          <li key={eatery.id}>
           <img src={eatery.image} alt={eatery.name} />
           <div>
             <h2>Name: {eatery.name}</h2>
             <h3>Website: {eatery.website}</h3>
             <h4>Address: {eatery.address}, {eatery.city}, {eatery.state}, {eatery.zip_code}</h4>
             <h4>Phone: {eatery.phone_number}</h4>
             <h4>Operation Hours: {eatery.operation_hours}</h4>
             <h4>Price Range: {eatery.price_range}</h4>
             <p>Description: {eatery.description}</p>
             {user?.likedEateries.includes(eatery._id) ? (
            <button onClick={() => handleUnlike(eatery._id)}>Unlike</button>
          ) : (
            <button onClick={() => handleLike(eatery._id)}>Like</button>
          )}
           </div>
         </li>
       ))}
     </ul>
    </div>
  )
}