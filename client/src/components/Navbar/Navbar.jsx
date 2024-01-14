import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Login from '../../pages/Login/Login';

const Navbar = () => {
  const navigation = useNavigate();
  const handleLogo = () => {
    navigation("/");
  }

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo' onClick={handleLogo}>Booking.com</span>
        <div className='navItems'>
          <button className='navBtn'>Register</button>
          <button className='navBtn'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar