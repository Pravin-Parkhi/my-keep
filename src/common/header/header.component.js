import React from 'react'
import { connect } from 'react-redux'
import { FaBars, FaSearch, FaCog } from 'react-icons/fa';
import { setSideBarVisibility } from '../../actions/app';
import { DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR } from '../../constants/variables.constant';

import SearchBar from '../search-bar/search-bar.component';
import IconWrapper from '../icon-wrapper/icon-wrapper.component';

import './header.component.scss'

export default function Header (props) {
  const { setSideBarVisibilityCallback, isDarkMode } = props
  
  const handleHamburgerClick = () => {
    setSideBarVisibilityCallback()
  }

  return (
    <div className='header-wrapper' style={{backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR}}>
      <div className='left-section'>
        <IconWrapper iconClickCallback={handleHamburgerClick}>
          <FaBars />
        </IconWrapper>
      </div>
      <div className='middle-section'>
        <SearchBar />
      </div>
      <div className='right-section'>
        <IconWrapper>
          <FaSearch />
        </IconWrapper>
        <IconWrapper>
          <FaCog />
        </IconWrapper>
      </div>
    </div>
  )
}