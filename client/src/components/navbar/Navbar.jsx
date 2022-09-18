import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css'

export default function Navbar() {

  const { user } = useContext(AuthContext);


  return (
    <div className='navbar'>
      <div className="navbarContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: "none" }}>
          <div className="logo">Booking.com</div>
        </Link>
        {user ? user.username : (
          <div className="navbarItem">
            <button className="navbarBtn">Register</button>
            <button className="navbarBtn">Login</button>
          </div>
        )}
      </div>
    </div>
  )
}
