import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'
import { MdArchive } from 'react-icons/md'
import { 
    DARK_THEME_BACKGROUND_COLOR, 
    LIGHT_THEME_BACKGROUND_COLOR,
    DARK_THEME_TEXT_COLOR,
    LIGHT_THEME_TEXT_COLOR
} from '../../constants/variables.constant'

import './sidenav.component.scss'
import IconWrapper from '../icon-wrapper/icon-wrapper.component';

export default function SideBar (props) {
  console.log(props)
  const { isSideBarCollapsed, isDarkMode } = props
  
  return (
    <div 
      className='side-bar' 
      style={{
        width: isSideBarCollapsed ? '80px' : '320px',
        backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR
      }}>
      <NavLink
        className='side-bar-option'
        activeClassName='active-page'
        to='/active-notes'
      >
        <IconWrapper>
          <FaRegLightbulb />
        </IconWrapper>
        <p
            className='menu-name'
            style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : LIGHT_THEME_TEXT_COLOR}}
        >
            Active
        </p>
      </NavLink>
      <NavLink className='side-bar-option' activeClassName='active-page' to='/archived-notes'>
        <IconWrapper>
          <MdArchive />
        </IconWrapper>
        <p
            className='menu-name'
            style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : LIGHT_THEME_TEXT_COLOR}}
        >Archived</p>
      </NavLink>
    </div>
  )
}