import React, { useState, useEffect } from 'react'
import TollIcon from '@mui/icons-material/Toll';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SearchIcon from '@mui/icons-material/Search';
import db from "../firebase"
import './SideBar.css';
import UserProfile from './UserProfile';
function SideBar({currentUser, signout}) {
const [allUsers, setAllUsers]=useState([])
const [searchInput, setsearchInput] = useState("");
const [friendList, setFriendList] = useState([]);
useEffect(() => {
  const getAllUsers=async()=>{
    const data= await db.collection('users').onSnapshot((snapshot)=>{
        setAllUsers(snapshot.docs.filter((doc)=> doc.data().email !== currentUser?.email))
    })
  }
  const getFriends = async()=> {
    const data = await db.collection('friendList').doc(currentUser.email).collection('list').onSnapshot((snapshot)=> {
      setFriendList(snapshot.docs);
    })
  }
  getAllUsers();
  getFriends();
  console.log("hi")
}, []);

  const searchedUser = allUsers.filter((user)=> {
    if(searchInput) {
        if(user.data().fullName.toLowerCase().includes(searchInput.toLowerCase())){
            return user;
        }
    }
  })
  const searchItem = searchedUser.map((user)=> {
    return (
        <UserProfile name={user.data().fullName} photoURL={user.data().photoURL} key={user.id} email={user.data().email}/>
    )
  })

  return (
    <div className='sidebar'>
        <div className='sidebar-header'>
        
            <div className="sidebar-header-img" onClick={signout}>
                <img src={currentUser?.photoURL } alt=''/>
            </div>
            <div className='sidebar-header-btn'>
                <TollIcon/>
                <InsertCommentIcon/>
                <MoreVertIcon/>
            </div>
        </div>
        <div className='sidebar-search'>
            <div className='sidebar-search-input'>
                <SearchIcon/>
                <input value={searchInput} onChange={(e)=> setsearchInput(e.target.value)} type="text" name="search" placeholder="Search..." />
            </div>
        </div>
        <div className='sidebar-chat-list'>
        {searchItem.length > 0 && (searchItem) }
        {searchItem.length === 0 && friendList.map((i, index)=> {
            return <UserProfile email={i.data().email} photoURL={i.data().photoURL} name={i.data().fullName} key={index} lastMessage={i.data().lastMessage}/>     })}
        </div>

    </div>
  )
}

export default SideBar