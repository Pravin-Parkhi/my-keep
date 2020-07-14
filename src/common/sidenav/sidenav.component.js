import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'
import { MdArchive } from 'react-icons/md'
import { 
    DARK_THEME_BACKGROUND_COLOR, 
    LIGHT_THEME_BACKGROUND_COLOR,
    DARK_THEME_TEXT_COLOR,
} from '../../constants/variables.constant'

import './sidenav.component.scss'

export default function SideBar (props) {
  const { isSideBarCollapsed, isDarkMode } = props

  return (
    <div 
      className={`side-bar ${isSideBarCollapsed ? 'collapsed' : 'open'}`}
      style={{ backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR }}
    >
      <NavLink
        className='side-bar-option'
        activeClassName='active-page'
        to='/active-notes'
      >
        <div className='side-nav-icon-wrapper' >
          <FaRegLightbulb />
        </div>
        <p
          className='menu-name'
          style={{ color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_BACKGROUND_COLOR }}
        >
          Active
        </p>
      </NavLink>
      <NavLink
        className='side-bar-option' 
        activeClassName='active-page' 
        to='/archived-notes'
      >
        <div className='side-nav-icon-wrapper'>
          <MdArchive />
        </div>
        <p
          className='menu-name'
          style={{ color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_BACKGROUND_COLOR }}
        >
          Archived
        </p>
      </NavLink>
    </div>
  )
}