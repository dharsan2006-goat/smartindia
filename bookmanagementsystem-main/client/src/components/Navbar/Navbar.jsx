import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Menu = () => (
  <>
    <p>
      <a href='/home'>Home</a>
    </p>
    <p>
      <a href='/books'>View Books</a>
    </p>
    <p>
      <a href='/addBook'>Add Book</a>
    </p>
    <p>
      <a href='/uploadBook'>Upload Book</a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src='https://ih1.redbubble.net/image.3101699893.1960/flat,750x,075,f-pad,750x1000,f8f8f8.jpg' alt='Pushpa Logo' className='navbar-logo-img' />
          <span className='navbar-brand'>Pushpa Bookstore</span>
        </div>
        <div className='navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className='navbar-sign'>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className='navbar-menu'>
        {toggleMenu ? (
          <RiCloseLine color='#000' size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color='#000' size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className='navbar-menu_container scale-up-center'>
            <div className='navbar-menu_container-links'>
              <Menu />
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
