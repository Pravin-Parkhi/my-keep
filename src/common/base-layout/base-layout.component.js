import { connect } from 'react-redux'
import React from 'react'
import Header from '../header/header.component'
import SideNav from '../sidenav/sidenav.component'
import { setSideBarVisibility } from '../../actions/app'
import { IconContext } from 'react-icons'
import { DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR } from '../../constants/variables.constant'

import './base-layout.component.scss'

function BaseLayout (props) {
  
    const { isDarkMode, setSideBarVisibility } = props
    
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
                  style={{backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR}}
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