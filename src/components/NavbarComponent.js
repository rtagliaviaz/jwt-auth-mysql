import React, {useContext} from 'react'
import {useHistory } from 'react-router-dom';
import {LoggedContext} from './LoggedContext'

const NavbarComponent = () => {
  const history = useHistory()
  const [logged, setLogged] = useContext(LoggedContext)
  

  const logout = (e) => {
    e.preventDefault()
    setLogged(false)
    history.push('/signin')
  }

  const loggedLink = (
    <React.Fragment>
      <a className="nav-link" href="/profile">Profile</a>
      <a className="nav-link" href="#" onClick={(e) => logout(e)} >Sign Out</a> 
    </React.Fragment>    
  )


  const notLoggedLinks = (
    <React.Fragment>
      <a className="nav-link" href="/signin">Sign In</a>
      <a className="nav-link" href="/signup">Sign Up</a>
    </React.Fragment>
  )

  return (
    
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          {logged === false? notLoggedLinks:loggedLink }
          {/* {loggedLink}
          {notLoggedLinks} */}
          </div> 
        </div>
      </nav>
      
           
    </div>
  )
}

export default NavbarComponent

