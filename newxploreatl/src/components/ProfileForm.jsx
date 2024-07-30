import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ProfileForm({profile, setProfile}) {
    // const [locations, setLocations] = useState([])
    const [eateries, setEateries] = useState([])
    const [hotspots, setHotspots] = useState([])
    const [selectedEatery, setSelectedEatery] = useState('')
    const [selectedHotspot, setSelectedHotspot] = useState('')
    const tempFavEat = profile.favorite_eateries

    useEffect(() => {
      const choiceData = async () => {
        try {
          const eateriesResponse = await axios.get('http://localhost:3003/eateries/')
          const hotspotsResponse = await axios.get('http://localhost:3003/hotspots/')
          console.log('profiles data:', eateriesResponse.data)
          if (eateriesResponse.status !== 200) {
              throw new Error('Not working')
          }
          setEateries(eateriesResponse.data)
          setHotspots(hotspotsResponse.data)
      } catch (error) {
          console.error('Error grabbing hotspots', error)
      }
  }
choiceData ()
}, [])
  
    const handleEateryChange = (e) => {
      setSelectedEatery(e.target.value)
      setProfile({favorite_eateries : })
    }


    const handleHotspotChange = (e) => {
      setSelectedHotspot(e.target.value)
    }


  return (
    <div className="Locations">
    <h2>Locations</h2>
    {/* <ul>
      {locations.map(location => (
        <li key={location.id}>
          <div>
            <h4>{location.county}</h4>
          </div>
        </li>
      ))}
    </ul> */}
    <div className="Dropdowns">
      <label htmlFor="eateries">Select an Eatery:</label>
      <select id="eateries" value={selectedEatery} onChange={handleEateryChange}>
        <option value="">Select...</option>
        {eateries.map(eatery => (
          <option key={eatery.id} value={eatery.name}>
            {eatery.name}
          </option>
        ))}
      </select>

      <label htmlFor="hotspots">Select a Hotspot:</label>
      <select id="hotspots" value={selectedHotspot} onChange={handleHotspotChange}>
        <option value="">Select...</option>
        {hotspots.map(hotspot => (
          <option key={hotspot.id} value={hotspot.name}>
            {hotspot.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);
}