import React from 'react'
import Header from '../header/header.component'
import SideNav from '../sidenav/sidenav.component'

import './base-layout.component.scss'

export default function BaseLayout (props) {

  return (
    <div className='base-layout-container'>
      <Header />
      <div className='content-wrapper'>
        <SideNav />
        <div className='view-wrapper'>
          {props.children}
        </div>
      </div>
    </div>
  )
}
