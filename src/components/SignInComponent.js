import React, {useState, useContext} from 'react'
import { Redirect } from 'react-router-dom';

import {LoggedContext} from './LoggedContext'

import axios from 'axios'

const SignInComponent = () => {
  const [logged, setLogged] = useContext(LoggedContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')  //error msg
  const [user, setUser] = useState()  
  const [token, setToken] = useState()

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:4000/login', {
      'username': username,
      'password': password
    })
    .then(res => {
      if(res.data) {
        setMsg(res.data.msg)
        setToken(res.data.token)
      }

      if (res.data.msg === 'logged in') {
        setUser(res.data.user[0])
        
      }
    })
  }




  return (
    <div>
      {user ? <Redirect to={{pathname:'/profile', state:{'user': user, 'token': token}}} /> :
      <div className="col-md-4 offset-md-4 mt-5">
    
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            className="form-control"
            onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            onChange={e => setPassword(e.target.value)}/>
        </div>
          <button
            type="submit"
            className="btn btn-dark btn-block"
            onClick={handleSubmit}>
            Submit
          </button>
          {msg ? <small><b><i>{msg}</i></b></small> : null}
      </form>
      </div>
      }
      
     
    </div>
  )
}

export default SignInComponent
