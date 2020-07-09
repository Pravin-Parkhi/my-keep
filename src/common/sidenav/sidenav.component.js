import React from 'react'
import { NavLink } from 'react-router-dom'

import './sidenav.component.scss'

export default function SideBar (props) {
  return (
    <div className='side-bar'>
      <div className='side-bar-option'>
        
            <NavLink className='page-links' activeClassName='active-page' to='/dashboard'>
              fafa
            </NavLink>

      </div>
      <div className='side-bar-option'>

            <NavLink className='page-links' activeClassName='active-page' to='/bill-list'>
              ff
            </NavLink>

      </div>
    </div>
  )
}