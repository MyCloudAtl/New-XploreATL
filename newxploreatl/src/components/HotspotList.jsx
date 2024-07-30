import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

export default function HotspotList() {
  const [hotspots, setHotspots] = useState([])

  useEffect(() => {
      const eateriesData = async () => {
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
  eateriesData ();
  }, []);

  
  return (
    <div className="HotSpotList">
      {<NavBar />}
        <h1>HotSpotList</h1>
        <ul>
       {hotspots.map(hotspot => (
           <li key={hotspot.category}>
           <img src={hotspot.image} alt={hotspot.name} />
           <div>
             <h2>Name: {hotspot.name}</h2>
             <h3>Website: {hotspot.website}</h3>
             <h4>Address: {hotspot.address}, {hotspot.city}, {hotspot.state}, {hotspot.zip_code}</h4>
             <h4>Phone: {hotspot.phone_number}</h4>
             <h4>Operation Hours: {hotspot.operations_hours}</h4>
             <h4>Price Range: {hotspot.price_range}</h4>
             <p>Description: {hotspot.description}</p>
           </div>
         </li>
       ))}
     </ul>
    </div>
  )
}