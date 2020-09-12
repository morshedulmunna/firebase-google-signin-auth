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
    email: '',
    password: ''
  })

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser)
      })
      .catch(err => {

      })
  }

  const handlesignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: ''
        }
        setUser(signOutUser);
      })
  }

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      isFormValid = e.target.value.length > 6 && /\d{1}/.test(e.target.value);
    }
    if (isFormValid) {
      const newUserInfo = {...user} ;
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);    
    }
  }

  const handleSubmit = () => {
    if (user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
      
    }
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
          <p> welcome, {user.name} </p>
          <p>you're Email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }


      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onBlur={handleBlur} placeholder='Enter Email' required />
        <br />
        <input type="current-password" name="password" id="" onBlur={handleBlur} placeholder='Enter Password' required />
        <br />
        <input type="submit"  onClick={handleSubmit} className="sub" />
      </form>

    </div>
  );
}
export default App; 