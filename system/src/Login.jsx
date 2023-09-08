import React from 'react'
import './Login.css'

function Login() {

  const [eyeIconToggle, setEyeIconToggle] = useState(false);

  function handleLoginSubmit(e){
    e.preventDefault();
  }

  return (
    <div className='login-container'>
        <h3>IP MONITOR</h3>
        <div className='login-form-container'>
            <form onSubmit={handleLoginSubmit}>
              <h1>Log in</h1>
              <div className='login-input-container'>
                <input type='text' placeholder='Username'></input>
                <i class={`fa ${}`} aria-hidden="true"></i>
                <input type='password' placeholder='Password'></input>
                <button>Log in</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login