import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Locations() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
      const locationsData = async () => {
          try {
              const response = await axios.get('http://localhost:3003/locations/')
            //   console.log('Locations data:', response.data);
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
           <div>
             <h4>{location.county}</h4>
           </div>
         </li>
       ))}
     </ul>
    </div>
    )
}