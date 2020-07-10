import React from 'react'
import { connect } from 'react-redux'
import { FaBars } from 'react-icons/fa';

import IconWrapper from '../icon-wrapper/icon-wrapper.component';

import './header.component.scss'

function Header (props) {

  return (
    <div className='header-wrapper'>
      <IconWrapper>
        <FaBars />
      </IconWrapper>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    appThemeColor: state.app.appThemeColor
  }
}

export default (connect(mapStateToProps, {})(Header))