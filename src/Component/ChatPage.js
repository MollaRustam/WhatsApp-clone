import React from 'react'
import Chatcontainer from './Chatcontainer'
import SideBar from './SideBar'
import "./ChatPage.css"

function ChatPage({currentUser, signout}) {
  return (
    <div className='chatpage'>
        <div className='chatpage-container'>
        <SideBar currentUser={currentUser} signout={signout}/>
        <Chatcontainer currentUser={currentUser} />
        </div>
    </div>
  )
}

export default ChatPage