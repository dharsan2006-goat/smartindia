import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '../../assets/hero.jpg';
import './home.css';
import 'animate.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${searchQuery}`);
    }
  };

  return (
    <section className='home-page'>
      <div className='hero-container animate__animated animate__backInDown'>
        <h1 className='hero__title'>Welcome to pushpa Bookstore!</h1>
        <img src={hero} alt='Family reading books' className='hero__image' />
      </div>
      
      {/* Search Bar */}
      <div className='search-container animate__animated animate__fadeIn'>
        <form onSubmit={handleSearch} className='search-form'>
          <input
            type='text'
            placeholder='Search for books...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-input'
          />
          <button type='submit' className='search-button'>
            Search
          </button>
        </form>
      </div>

      <div className='home-page__btn animate__animated animate__backInDown'>
        <a href='/books'>
          <button>View Collection</button>
        </a>
      </div>
    </section>
  );
};

export default Home;