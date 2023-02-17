import React, { useState } from 'react'
import './Login.css'
import {auth,provider} from '../firebase/firebase'

const Login = () => {

  const [register , setRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e) =>{
    e.preventDefault()

    if(email && password){
        auth.createUserWithEmailAndPassword(email,password)
            .then((auth) => {
                alert('Registered successfully')
            }).catch((e) => alert(e.message))
    }else {
        alert("please fill all the fields")
    }
  }
  const handleSignIn= () =>{
    auth.signInWithPopup(provider)
        .then((auth)=> alert("Signed in successfully"))
        .catch((err)=>{
            alert(err.message)
        })
  }
  const handleLogin= (e) =>{
    e.preventDefault()
    if(email && password){
        auth.signInWithEmailAndPassword(email,password)
            .then((auth)=>{
                alert('Signed in successfully..')
            }).catch((err)=> alert(err.message))
    }
  }

  return (
    <div className='login'>
        {
            register ? (<>
            <div className='loginContainer'>
                <div className='logo'>
                    <img src="https://www.nicepng.com/png/detail/207-2076661_email-logo-transparent-www-mail-logo-png-transparent.png" alt="logo" />
                    <h3>Register</h3>
                    <p>Create Free Mail Account</p>
                </div>
                <div className='loginContent'>
                    <input type="text" value={email} required={true} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <input type="text" value={password} required={true} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button onClick={handleLogin}>LogIn</button>
                    <button onClick={handleSignIn}>Continue using Google</button>
                </div>
                <p onClick={() => setRegister(false)}>Register</p>
            </div>
            </>) : (<>
                <div className='loginContainer'>
                <div className='logo'>
                    <img src="https://www.nicepng.com/png/detail/207-2076661_email-logo-transparent-www-mail-logo-png-transparent.png" alt="logo" />
                    <h3>Sign In</h3>
                    <p>Continue with Mail</p>
                </div>
                <div className='loginContent'>
                    <input type="text" value={email} required={true} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <input type="text" value={password} required={true} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={handleSignIn}>Continue using Google</button>
                </div>
                <p onClick={() => setRegister(true)}>LogIn</p>
            </div>
            </>)
        }
        
    </div>
  )
}

export default Login