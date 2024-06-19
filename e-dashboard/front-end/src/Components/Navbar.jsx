import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from './ecom.png'
const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className='navbar'>
      <img src={img} alt="Logo"/>
      {auth && <ul>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout</Link></li>
      </ul>
      }
    </div>
  )
}

export default Navbar