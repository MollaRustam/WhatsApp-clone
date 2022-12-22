import React from 'react'
import SideBar from './SideBar'
import "./Home.css"
function Home({currentUser, signout}) {
  return (
    <div className='home'>
        <div className="home-container">
            <SideBar currentUser={currentUser} signout={signout}/>
            <div className='home-bg'>
                <img src='./whatsapplogo.png' alt='Whatsapp logo'/>
            </div>
        </div>
    </div>
  )
}

export default Home