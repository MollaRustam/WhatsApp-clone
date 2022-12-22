import React from 'react'
import './Login.css';
import { Navigate, useNavigate } from 'react-router-dom';
import db, {auth, googleProvider} from "../firebase";
function Login({setUser}) {
    const Navigate = useNavigate();
    const signInWithGoogle = ()=> {
        auth.signInWithPopup(googleProvider).then((result)=> {
            const newUser = {
                fullName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }
            Navigate('/');
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            db.collection("users").doc(result.user.email).set(newUser);
        }).catch((err)=> alert(err.message)); 
    }
  return (
    <div className='login'>
        <div className='login-container'>
            <img className='login-logo' src='./whatsapp-logo.png' alt='' />
            <p className='login-name'>Whatsapp Web </p>
            <button className='login-btn' onClick={signInWithGoogle}>
                <img src='./google.png' alt='Login With Google' />Login With Google
            </button>
        </div>
    </div>
  )
}

export default Login