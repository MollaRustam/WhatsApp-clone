import React from 'react'
import "./ChatMessage.css"
import {auth} from "../firebase";

function ChatMessage({message,time, sender}) {
  return (
    <div className='chat-message' style={{alignSelf: sender === auth.currentUser?.email ? 'flex-end': 'flex-start', 
      backgroundColor: sender === auth.currentUser?.email ? '#dcf8c6':'#fff'
    }}>
        <div className='chat-message-text'>
            {message}
        </div>
        <div className='chat-message-date'>
            {new Date(time.toDate()).toLocaleString()}
        </div>
    </div>
  )
}

export default ChatMessage