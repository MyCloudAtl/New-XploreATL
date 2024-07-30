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
    const [nameToId, setNameToId] = useState({})

    useEffect(() => {
      const choiceData = async () => {
        try {
          let tmp = {}
          const eateriesResponse = await axios.get('http://localhost:3003/eateries/')
          const hotspotsResponse = await axios.get('http://localhost:3003/hotspots/')
          console.log('profiles data:', eateriesResponse.data)
          if (eateriesResponse.status !== 200) {
              throw new Error('Not working')
          }
          setEateries(eateriesResponse.data)
          setHotspots(hotspotsResponse.data)

          for(let i=0; i<eateriesResponse.data.length; i++) {
            let eatery = eateriesResponse.data[i]
            tmp[eatery.name] = eatery._id
          }
          for(let i=0; i<hotspotsResponse.data.length; i++) {
            let hotspot = hotspotsResponse.data[i]
            tmp[hotspot.name] = hotspot._id
          }
          setNameToId(tmp)
          console.log("nametoid: ", nameToId);
      } catch (error) {
          console.error('Error grabbing hotspots', error)
      }
  }
choiceData ()
}, [])
  
    const handleEateryChange = (e) => {
      setSelectedEatery(e.target.value)
    //   setProfile({favorite_eateries : })
    }


    const handleHotspotChange = (e) => {
      setSelectedHotspot(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedProfile = {
        favorite_eateries: [...profile.favorite_eateries, nameToId[selectedEatery]],
        favorite_hotspots: [...profile.favorite_hotspots, nameToId[selectedHotspot]],
      };

      try {
        const response = await axios.put(`http://localhost:3003/profiles/${profile.user_id}`, updatedProfile, { withCredentials: true });
        setProfile(response.data);
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile', error);
      }
    };

  return (
    <div className="Locations">
    <h2>Locations</h2>
    <form onSubmit={handleSubmit}>
      <div className="Dropdowns">
        <label htmlFor="eateries">Select an Eatery:</label>
        <select id="eateries" value={selectedEatery} onChange={handleEateryChange}>
          <option value="">Select...</option>
          {eateries.map(eatery => (
            <option key={eatery._id} value={eatery.name}>
              {eatery.name}
            </option>
          ))}
        </select>

        <label htmlFor="hotspots">Select a Hotspot:</label>
        <select id="hotspots" value={selectedHotspot} onChange={handleHotspotChange}>
          <option value="">Select...</option>
          {hotspots.map(hotspot => (
            <option key={hotspot._id} value={hotspot.name}>
              {hotspot.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Update Profile</button>
    </form>
  </div>
);
}