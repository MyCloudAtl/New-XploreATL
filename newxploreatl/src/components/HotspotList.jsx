import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function HotspotList() {
  const [hotspots, setHotspots] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
      const hotspotsData = async () => {
          try {
              const response = await axios.get('http://localhost:3003/hotspots')
              console.log('Hotspots data:', response.data);
              if (response.status !== 200) {
                  throw new Error('Not working')
              }
              setHotspots(response.data)
          } catch (error) {
              console.error('Error grabbing hotspots', error)
          }
      };
  hotspotsData ();
  }, []);

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


  const handleLike = async (hotspotId) => {
    if (user) {
      console.log(`Liking hotspot with ID: ${hotspotId}`)
      try{
        await axios.post(`http://localhost:3003/users/${user._id}/likeHotspot/${hotspotId}`)
        const response = await axios.get(`http://localhost:3003/users/${user._id}`)
        console.log(response.data)
        console.log('handlelike setuser is called')
        setUser(response.data)
      } catch (error) {
        console.error('Error liking hotspot', error)
      }
    }
  }
  
  const handleUnlike = async (hotspotId) => {
    if (user) {
      console.log(`Unliking hotspot with ID: ${hotspotId}`)
      try {
        await axios.post(`http://localhost:3003/users/${user._id}/unlikeHotspot/${hotspotId}`)
        const response = await axios.get(`http://localhost:3003/users/${user._id}`)
        console.log('handleunlike setuser is called')
        setUser(response.data)
      } catch (error) {
        console.error('Error unliking Hotspot', error)
      }
    }
  }
  return (
//     <div className="HotSpotList">
//       {<NavBar />}
//         <h1>Hotspot List</h1>
//         <ul>
//        {hotspots.map(hotspot => (
//            <li key={hotspot.category}>
//            <img src={hotspot.image} alt={hotspot.name} />
//            <div>
//              <h2>Name: {hotspot.name}</h2>
//              <h3>Website: {hotspot.website}</h3>
//              <h4>Address: {hotspot.address}, {hotspot.city}, {hotspot.state}, {hotspot.zip_code}</h4>
//              <h4>Phone: {hotspot.phone_number}</h4>
//              <h4>Operation Hours: {hotspot.operations_hours}</h4>
//              <h4>Price Range: {hotspot.price_range}</h4>
//              <p>Description: {hotspot.description}</p>
//            </div>
//          </li>
//        ))}
//      </ul>
//     </div>
//   )
// }
<div className="HotspotList">
<NavBar />
<h1>Hotspot List</h1>
<ul className="hotspot-list">
    {hotspots.map(hotspot => (
        <li key={hotspot._id} className="hotspot-item">
            <img src={hotspot.image} alt={hotspot.name} width="250" height="250" />
            <div className="hotspot-details">
                <h2>{hotspot.name}</h2>
                <h3>Website: <a href={hotspot.website} target="_blank" rel="noopener noreferrer">{hotspot.website}</a> 📞 Phone: {hotspot.phone_number}</h3>
                <h4>Address: {hotspot.address}, {hotspot.city}, {hotspot.state}, {hotspot.zip_code}</h4>
                <h4>Operation Hours: {hotspot.operation_hours}</h4>
                <h4>Price Range: <span className="green-text">{hotspot.price_range}</span></h4>
                <p>Description: {hotspot.description}</p>
                {user && user.likedHotspots && user.likedHotspots.map(x => {
                  if(Object.hasOwn(x, '_id')) return x._id
                  else return x;
                }).includes(hotspot._id) ? (
                    <button onClick={() => handleUnlike(hotspot._id)}>Unlike</button>
                ) : (
                    <button onClick={() => handleLike(hotspot._id)}><FontAwesomeIcon icon={faHeart} />Like?</button>
                )}
            </div>
        </li>
    ))}
</ul>
</div>
)
}
