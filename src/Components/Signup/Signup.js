import React, { useState,useContext } from 'react';
import firebase from '../../firebase/config';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {addDoc,collection,getFirestore} from 'firebase/firestore'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate()

  const handleSumbit = async (e)=>{
    e.preventDefault()
    console.log(username);

    const auth = getAuth(firebase)
    const firestore = getFirestore(firebase)
    const newUser = await  createUserWithEmailAndPassword(auth, email, password)
    try {
      const docRef = collection(firestore,'users')
      await addDoc(docRef,{
        id: newUser.user.uid,
        username: username,
        email: email,  
        phone: phone,
      })
      navigate('/login')
      
    } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
    }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSumbit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            id="fname"
            name="username"
            defaultValue=""
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue=""
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
