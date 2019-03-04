import React from 'react';
import {NavLink} from 'react-router-dom'

const Navbar = ({isAuthed}) =>{

  const onBrand = isAuthed.isLogged ? (
    <NavLink className="navbar-brand" to='/'><h3>Hi, {isAuthed.username}</h3></NavLink>
  ):(
    <NavLink className="navbar-brand" to='/'>MERN Stack</NavLink>
  );
  const onLinks = isAuthed.isLogged ? (
    <div className='navbar-nav'>
      <a href="/api/users/logout" className="nav-item nav-link">Log Out</a>
    </div>
  ):(
    <div className="navbar-nav">
      <NavLink className="nav-item nav-link" to='/signup'>Sing Up</NavLink>
      <NavLink className="nav-item nav-link" to='/login'>Log In</NavLink>
    </div>    
  );
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className='container'>
        {onBrand}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {onLinks}
        </div>
      </div>
    </nav>
  )
}

export default Navbar