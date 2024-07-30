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
    eateriesData ();
    }, []);

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
           </div>
         </li>
       ))}
     </ul>
    </div>
  )
}