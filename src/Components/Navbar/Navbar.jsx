import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import LOGOB from '../../assets/LOGOBB.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import { Link } from 'react-router-dom';
import { TubeContext } from '../../Components/Context/TubeContext';
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import profile_avatar from '../../assets/jack.png'; 

function Navbar({ setSidebar, category, setCategory }) {
  const { theme, toggleTheme, user } = useContext(TubeContext);
  const [profileImage, setProfileImage] = useState(profile_avatar); // Default to placeholder
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage || profile_avatar);
      setUserName(user.name || '');
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory);
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className={`flex-div ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="nav-left flex-div">
        <img className='menu-icon' onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt="Menu" />
        <Link to='/'><img className='logo' src={LOGOB} alt="Logo" /></Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder='ABGTube' />
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? <IoSunnyOutline size={20} /> : <FaMoon size={20} />}
        </button>
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More" />
        <img src={notification_icon} alt="Notifications" />

        <div className="profile-container" onClick={handleProfileClick}>
          <img src={profileImage} alt="Profile" className="profile-image" />
          <p>{userName || 'User'}</p> {/* Display 'User' if no username */}
        </div>

        {showProfileMenu && (
          <div ref={profileMenuRef} className="profile-menu">
            <Link to='/login' className="menu-item">Login</Link>
            <Link to='/signup' className="menu-item">Signup</Link>
            <Link to='/profile' className="menu-item">Profile</Link>
          </div>
        )}

        <button className='dropdown-toggle' onClick={() => setShowDropdown(!showDropdown)}>☰</button>
      </div>

      {showDropdown && (
        <div ref={dropdownRef} className='sidebar-dropdown'>
          <div className={`side-link ${category === 0 ? "active" : ""}`} onClick={() => handleCategoryClick(0)}>
            <img src={home} alt="" /><p>Home</p>
          </div>
          <div className={`side-link ${category === 20 ? "active" : ""}`} onClick={() => handleCategoryClick(20)}>
            <img src={game_icon} alt="" /><p>Gaming</p>
          </div>
          <div className={`side-link ${category === 2 ? "active" : ""}`} onClick={() => handleCategoryClick(2)}>
            <img src={automobiles} alt="" /><p>Automobiles</p>
          </div>
          <div className={`side-link ${category === 17 ? "active" : ""}`} onClick={() => handleCategoryClick(17)}>
            <img src={sports} alt="" /><p>Sport</p>
          </div>
          <div className={`side-link ${category === 24 ? "active" : ""}`} onClick={() => handleCategoryClick(24)}>
            <img src={entertainment} alt="" /><p>Entertainment</p>
          </div>
          <div className={`side-link ${category === 28 ? "active" : ""}`} onClick={() => handleCategoryClick(28)}>
            <img src={tech} alt="" /><p>Technology</p>
          </div>
          <div className={`side-link ${category === 10 ? "active" : ""}`} onClick={() => handleCategoryClick(10)}>
            <img src={music} alt="" /><p>Music</p>
          </div>
          <div className={`side-link ${category === 22 ? "active" : ""}`} onClick={() => handleCategoryClick(22)}>
            <img src={blogs} alt="" /><p>Blogs</p>
          </div>
          <div className={`side-link ${category === 25 ? "active" : ""}`} onClick={() => handleCategoryClick(25)}>
            <img src={news} alt="" /><p>News</p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
