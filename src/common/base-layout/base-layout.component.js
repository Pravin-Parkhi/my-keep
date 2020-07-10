import React from 'react'
import Header from '../header/header.component'
import SideNav from '../sidenav/sidenav.component'

import { IconContext } from "react-icons";

import './base-layout.component.scss'

export default function BaseLayout (props) {

  return (
    <IconContext.Provider value={{ color: '#939393', size: 20 }}>
      <div className='base-layout-container'>
        <Header />
        <div className='content-wrapper'>
          <SideNav />
          <div className='view-wrapper'>
            {props.children}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )
}
