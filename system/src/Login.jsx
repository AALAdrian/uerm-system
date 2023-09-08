import React, { useEffect } from 'react'
import './Login.css'
import { useState, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({loginStatus}) {

  const [eyeIconToggle, setEyeIconToggle] = useState(false);
  const passwordInputRef = useRef();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const targetInput = passwordInputRef.current;
    if(targetInput.type == 'password' && eyeIconToggle){
      targetInput.type = 'text';
    }
    else if(targetInput.type == 'text' && !eyeIconToggle){
      targetInput.type = 'password';
    }
  }, [eyeIconToggle])

  function handleLoginSubmit(e){
    e.preventDefault();
    axios.post('/api/login',{
      username, password
    })
    .then(res => {
      if(res.data){
        navigate('/app');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='login-container'>
        <h3>IP MONITOR</h3>
        <div className='login-form-container'>
            <form onSubmit={handleLoginSubmit}>
              <h1>Log in</h1>
              <div className='login-input-container'>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <i class={`fa ${eyeIconToggle ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" onClick={() => setEyeIconToggle(!eyeIconToggle)}></i>
                <input type='password' ref={passwordInputRef} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
                <button>Log in</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login