import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArchive, FaRegLightbulb } from 'react-icons/fa';

import './sidenav.component.scss'
import IconWrapper from '../icon-wrapper/icon-wrapper.component';

export default function SideBar (props) {
  console.log(props)
  const { isSideBarCollapsed } = props
  
  return (
    <div className='side-bar' style={{width: isSideBarCollapsed ? '80px' : '320px'}}>
      <NavLink className='side-bar-option' activeClassName='active-page' to='/active-notes'>
        <IconWrapper>
          <FaRegLightbulb />
        </IconWrapper>
        <p className='menu-name'>Active</p>
      </NavLink>
      <NavLink className='side-bar-option' activeClassName='active-page' to='/archived-notes'>
        <IconWrapper>
          <FaArchive />
        </IconWrapper>
        <p className='menu-name'>Archived</p>
      </NavLink>
    </div>
  )
}