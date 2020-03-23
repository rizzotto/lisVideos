import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav(){

  const style = {
    listStyle:'none',
    textDecoration: 'none',
    fontSize: '2.5rem',
    color: '#5A5A5A',
  }

  return( 
    <div>
      <nav>
        <Link to="/" style={{textDecoration: 'none'}}>
          <h3 className="title">LIS</h3>
        </Link>
        <Link to="/" style={style}>
          <li  className="navItem">Videos</li>
        </Link>
        <Link to="/upload" style={style} >
          <li className="navItem">Upload</li>
        </Link>
        <img className="img"  alt="logo" src={require("../assets/logo.png")}></img>
      </nav>
    </div>
  )
}