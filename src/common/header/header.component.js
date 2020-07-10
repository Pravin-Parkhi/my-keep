import React from 'react'
import { connect } from 'react-redux'
import { FaBars, FaSearch, FaCog } from 'react-icons/fa';

import IconWrapper from '../icon-wrapper/icon-wrapper.component';

import './header.component.scss'

function Header (props) {

  return (
    <div className='header-wrapper'>
      <div className='left-section'>
        <IconWrapper>
          <FaBars />
        </IconWrapper>
      </div>
      <div className='middle-section'>

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

function mapStateToProps (state) {
  return {
    appThemeColor: state.app.appThemeColor
  }
}

export default (connect(mapStateToProps, {})(Header))