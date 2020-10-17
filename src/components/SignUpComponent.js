import React, {useState} from 'react'
import axios from 'axios'

const SignUpComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(username, password)

    await axios.post('http://localhost:4000/signup', {
      'username': username,
      'password': password
    })
    .then(res => {
      if(res.data) {
        // console.log(res.data)
        setMsg(res.data.msg)
      }

      if (res.data.msg === 'user registered successfully') {
        setUsername('')
        setPassword('')
      }
    })
  }

  return (
    <div>
      <div className="col-md-4 offset-md-4 mt-5">
             
        <form>
          <div className="form-group">
            <label htmlFor="username">User</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}/>
          </div>

            <button
              type="submit"
              className="btn btn-dark btn-block"
              onClick={handleSubmit}>
              Submit
            </button>

             {msg ? 
             <small><b><i>{msg}</i></b></small>
              
              : null}
              
        </form>
      </div>
      
    </div>
  )
}

export default SignUpComponent
