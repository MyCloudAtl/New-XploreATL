import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Locations() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
      const locationsData = async () => {
          try {
              const response = await axios.get('http://localhost:3003/locations/')
              console.log('Locations data:', response.data);
              if (response.status !== 200) {
                  throw new Error('Not working')
              }
              setLocations(response.data)
          } catch (error) {
              console.error('Error grabbing locations', error)
          }
      };
  locationsData ();
  }, []);

  return (
    <div className="Locations">
        <h2>Locations</h2>
        <ul>
       {locations.map(location => (
          <li key={location.id}>
           <img src={location.image} alt={location.name} />
           <div>
             <h2>Name: {location.name}</h2>
             <h3>Website: {location.website}</h3>
             <h4>Address: {location.address}, {location.city}, {location.state}, {location.zip_code}</h4>
             <h4>Phone: {location.phone_number}</h4>
             <h4>Operation Hours: {location.operations_hours}</h4>
             <h4>Price Range: {location.price_range}</h4>
             <p>Description: {location.description}</p>
           </div>
         </li>
       ))}
     </ul>
    </div>
    )
}