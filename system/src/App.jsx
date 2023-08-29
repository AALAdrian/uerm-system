import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [ipAddress, setIpAddress] = useState('');
  function handleTestButton(){
    axios.get('/api/encode').
    then(res => {
      console.log(res)
    }).
    catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='app-container'>

      <label for='ip-address'>IP ADDRESS</label>
      <input id='ip-address'></input>

      <select>
        <option value="">DEPARTMENT</option>
        <option value="">sample1</option>
        <option value="">sample2</option>
        <option value="">sample3</option>
      </select>

      <button onClick={() => handleTestButton}>test</button>

    </div>
  )
}

export default App