
import './App.css';
import {
  BrowserRouter as Router,Routes,Route
} from "react-router-dom";
import Home from './Component/Home';
import Login from './Component/Login';
import ChatPage from './Component/ChatPage';
import {useState} from 'react';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const signout = ()=> {
    auth.signOut().then(()=> {
      setUser(null);
      localStorage.removeItem('user');
    }).catch((err)=> alert(err.message));
  }
  return (
    <Router>
    <div className="App">
    {user ? 
      <Routes>
        <Route path='/' element={<Home currentUser={user} signout={signout}/>}/>
        <Route path='/:emailId' element={<ChatPage currentUser={user} signout={signout}/>}/>
      </Routes>
      :<Login setUser={setUser}/>
    }
    </div>
    </Router>
    
  );
}

export default App;
