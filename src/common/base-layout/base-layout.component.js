import { connect } from 'react-redux'
import React from 'react'
import { IconContext } from 'react-icons'
import { setSideBarVisibility } from '../../actions/app'
import { DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR } from '../../constants/variables.constant'

import Header from '../header/header.component'
import SideNav from '../sidenav/sidenav.component'
import useWindowDimensions from '../../hooks/useWindowDimensions'

import './base-layout.component.scss'

function BaseLayout (props) {
  const { width } = useWindowDimensions()
  const { isDarkMode, isSideBarCollapsed, setSideBarVisibility } = props
    console.log(width)
  return (
    <IconContext.Provider value={{ color: '#939393', size: 20 }}>
      <div className='base-layout-container'>
        <Header
            {...props}
            setSideBarVisibilityCallback={setSideBarVisibility}
        />
        <div className='content-wrapper'>
          <SideNav {...props} />
          <div
              className='view-wrapper'
              style={{
                backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR,
                marginLeft: (width>=768) ? isSideBarCollapsed ? '80px' : '280px' : '0px'
              }}
          >
              {props.children}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )
}

function mapStateToProps (state) {
  return {
      isDarkMode: state.app.isDarkMode,
      isSideBarCollapsed: state.app.isSideBarCollapsed
  }
}

export default (connect(mapStateToProps, {setSideBarVisibility})(BaseLayout))