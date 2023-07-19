import React, { useContext, useEffect } from 'react';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { AuthContext } from './store/Context';
import { getAuth } from 'firebase/auth';
import firebase from './firebase/config';
import { collection,getDocs,getFirestore,where,query } from 'firebase/firestore';
import Post from './store/postContext';

import Home from './Pages/Home';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'

function App() {
  const {setuser} = useContext(AuthContext)
  const auth = getAuth(firebase)
  const firestore = getFirestore(firebase)

  useEffect(()=>{
    auth.onAuthStateChanged(async(user)=>{
      console.log('Auth Data',user);

      if (user) {
        const docRef = query(collection(firestore,'users'),where('id','==',user.uid))
        const querySnapshot = await getDocs(docRef)
        if (querySnapshot.empty) {
          console.log('User not found');
        } else {
          const user = querySnapshot.docs[0].data();
          console.log(user,"db data");
          setuser(user)
        }
      }
    })
     // eslint-disable-next-line  react-hooks/exhaustive-deps
  },[])

  return (
    <div className='app'>
      <Post>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={ <Create /> } />
          <Route path='/view' element={ <ViewPost /> } />
        </Routes>
      </Post>
   
    </div>
  );
}

export default App;
