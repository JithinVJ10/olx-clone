import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase/config';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';


import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, seterror] = useState('')

  const hundleSumbit =(e)=>{
    e.preventDefault()

    const auth = getAuth(firebase)
    signInWithEmailAndPassword(auth, email, password).then(()=>{
      navigate('/')
    }).catch((err)=>{
      console.log(err);
      let error = err.message
      seterror(error)
      setTimeout(()=> {
        seterror('');
      }, 3000);

    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={hundleSumbit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
