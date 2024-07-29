import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import SideBar from './SideBar'
import Locations from './Locations'


export default function Home() {
  const { id } = useParams()

  return (
    <div className="Home">

      <div className="Main">
        <header className="Header">
          <h1>XploreATL</h1>
          {<Locations />}
        </header>
        <div className='Body'>
          <nav className='Nav'>
          {<NavBar />}
          </nav>
        </div>
        <main className='Side'>
          {<SideBar/>}
        </main>
      </div>
      <div className='Footer'>
        <Footer />
      </div>
    </div>
  )
} 