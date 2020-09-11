import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    photo: '',
    email: ''
  })

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then (res => {
      const { displayName, photoURL,email } = res.user;
      const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser)
    })
    .catch(err =>{
      console.log(err);
    })
    .catch(err =>{
      
    })
  }

  const handlesignOut = () => {
    firebase.auth().signOut()
    .then (res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: ''
      }
      setUser(signOutUser);
    })
  }

  return (
    <div className="button">
       {
         user.isSignedIn ? 
         <button onClick={handlesignOut}>Sign out</button> :
         <button onClick={handleSignIn}>Sign in</button>
       }
       {
         user.isSignedIn &&
          <div>
            <p> welcome, { user.name } </p>
            <p>you're Email: { user.email }</p>
            <img src= {user.photo} alt=""></img>
          </div>
       }
    </div>
  );
}

export default App;
