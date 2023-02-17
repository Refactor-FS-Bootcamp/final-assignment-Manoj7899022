import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Gmail from './components/Gmail';
import { login, selectUser } from './features/userSlice';
import Login from '../src/components/Login'
import { auth } from './firebase/firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(login({
        uid:authUser.uid,
        photo: authUser.photoURL ? authUser.photoURL : "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
        displayName: authUser.displayName ? authUser.displayName : authUser.email,
        email: authUser.email,
        emailVerified: authUser.emailVerified
        }))
      }
      
    })
  }, [dispatch])
  return (
    <div className="App">
      {
        user ? <Gmail /> : <Login />
      }
      
    </div>
  );
}

export default App;
