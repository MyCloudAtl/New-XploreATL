import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function EateryList() {
    const [eateries, setEateries] = useState([])
    const [user, setUser] = useState(null)

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
        }
    eateriesData ()
    }, [])

    useEffect(() => {
      const grabUser = async () => {
          try {
            console.log('grab user')
            const response = await axios.get('http://localhost:3003/currentUser', { withCredentials: true })
              if (response.status !== 200) {
                  throw new Error('Failed to fetch user data')
              }
              console.log('set user')
              console.log(response)
              setUser(response.data)
          } catch (error) {
              console.error('Error fetching user', error)
          }
      }
      grabUser()
  }, [])


    const handleLike = async (eateryId) => {
      if (user) {
        console.log(`Liking eatery with ID: ${eateryId}`)
        try{
          await axios.post(`http://localhost:3003/users/${user._id}/likeEatery/${eateryId}`)
          const response = await axios.get(`http://localhost:3003/users/${user._id}`)
          console.log(response.data)
          console.log('handlelike setuser is called')
          setUser(response.data)
        } catch (error) {
          console.error('Error liking eatery', error)
        }
      }
    }
    
    const handleUnlike = async (eateryId) => {
      if (user) {
        console.log(`Unliking eatery with ID: ${eateryId}`)
        try {
          await axios.post(`http://localhost:3003/users/${user._id}/unlikeEatery/${eateryId}`)
          const response = await axios.get(`http://localhost:3003/users/${user._id}`)
          console.log('handleunlike setuser is called')
          setUser(response.data)
        } catch (error) {
          console.error('Error unliking eatery', error)
        }
      }
    }

// Reference - https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable
  return (
   <div className="EateryList">
            <NavBar />
            <h1>Eatery List</h1>
            <ul className="eatery-list">
                {eateries.map(eatery => (
                    <li key={eatery._id} className="eatery-item">
                        <img src={eatery.image} alt={eatery.name} width="250" height="250" />
                        <div className="eatery-details">
                            <h2>{eatery.name}</h2>
                            <h3>Website: <a href={eatery.website} target="_blank" rel="noopener noreferrer">{eatery.website}</a> 📞 Phone: {eatery.phone_number}</h3>
                            <h4>Address: {eatery.address}, {eatery.city}, {eatery.state}, {eatery.zip_code}</h4>
                            <h4>Operation Hours: {eatery.operation_hours}</h4>
                            <h4>Price Range: <span className="green-text">{eatery.price_range}</span></h4>
                            <p>Description: {eatery.description}</p>
                            // https://stackoverflow.com/questions/135448/how-do-i-check-if-an-object-has-a-specific-property-in-javascript
                            {user && user.likedEateries && user.likedEateries.map(x => {
                              if(Object.hasOwn(x, '_id')) return x._id
                              else return x;
                            }).includes(eatery._id) ? (
                                <button onClick={() => handleUnlike(eatery._id)}>Unlike</button>
                            ) : (
                                <button onClick={() => handleLike(eatery._id)}><FontAwesomeIcon icon={faHeart} />Like?</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}