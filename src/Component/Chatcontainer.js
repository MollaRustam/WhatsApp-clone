import React,{useEffect, useRef, useState} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import "./Chatcontainer.css"
import ChatMessage from './ChatMessage';
import EmojiPicker from 'emoji-picker-react';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import firebase from "firebase";
function Chatcontainer({currentUser}) {
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const {emailId} = useParams();
  const chatBox = useRef(null);
  const [ChatMessages, setChatMessages] = useState([]);
  useEffect(()=> {
    const getUser = async ()=> {
        const data = await db.collection('users').doc(emailId).onSnapshot((snapshot)=> {
            setChatUser(snapshot.data());
        })
    }
    const getMessages = async () => {
        const data = await db
          .collection("chats")
          .doc(emailId)
          .collection("message")
          .orderBy("timeStamp", "asc")
          .onSnapshot((snapshot) => {
            let messages = snapshot.docs.map((doc) => doc.data());
  
            let newMessage = messages.filter(
              (message) =>
                message.senderEmail === (currentUser.email || emailId) ||
                message.receiverEmail === (currentUser.email || emailId)
            );
  
            setChatMessages(newMessage);
          });
      };
    getUser();
    getMessages();
}, [emailId])
useEffect(()=> {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
}, [ChatMessages])
const send=(e)=>{
    e.preventDefault()
    if(emailId){
        let payload={
            text:message,
            senderEmail:currentUser.email,
            receiverEmail:emailId,
            timeStamp: firebase.firestore.Timestamp.now()
        }
        console.log(payload);
        db.collection('chats').doc(currentUser.email).collection('message').add(payload);
        db.collection('chats').doc(emailId).collection('message').add(payload);
        setMessage("");
        db.collection('friendList').doc(currentUser.email).collection('list').doc(emailId).set({
            email: emailId,
            fullName:chatUser.fullName,
            photoURL:chatUser.photoURL,
            lastMessage:message
        })
        db.collection('friendList').doc(emailId).collection('list').doc(currentUser.email).set({
            email:currentUser.email,
            fullName:currentUser.fullName,
            photoURL:currentUser.photoURL,
            lastMessage:message
        })
    }
}
  return (
    <div className='chat-container'>
        <div className='chat-container-header'>
            <div className='chat-user-info'>
                <div className='chat-user-img'>
                    <img src={chatUser.photoURL} alt=''/>
                </div>
                <p>{chatUser.fullName}</p>
            </div>
            <div className='chat-container-header-btn'>
                <MoreVertIcon/>
            </div>
        </div>
        <div className='chat-display-container' ref={chatBox}>
            {ChatMessages.map((i, index)=> {
                return <ChatMessage message={i.text} time={i.timeStamp} sender={i.senderEmail} key={index} />
            })}
           
        </div>
        {openEmojiBox && <div className="emoji">
             <EmojiPicker  emojiStyle='facebook' onEmojiClick={(emojiData, event)=> setMessage(message+emojiData.emoji)}/>
        </div>}
        <div className='chat-input'>
            <div className='chat-input-btn'>
                <InsertEmoticonIcon onClick={()=> setOpenEmojiBox(!openEmojiBox)}/>
                <AttachFileIcon/>
            </div>
            <form onSubmit={send}>
                <input type="text" placeholder="Type your message..." value={message} onChange={(e)=> setMessage(e.target.value)}/>
            </form>
            <div className='chat-input-send-btn' onClick={send}>
                <SendIcon/>
            </div>
        </div>
    </div>
  )
}

export default Chatcontainer