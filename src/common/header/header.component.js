import React from 'react'
import { connect } from 'react-redux'
import { IconContext } from "react-icons"
import { withRouter } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { FiMoon } from 'react-icons/fi'
import { RiSunLine } from 'react-icons/ri'
import { getFilteredNoteList, clearSearchQuery, setAppTheme } from '../../actions/app'
import { DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR, DARK_THEME_TEXT_COLOR } from '../../constants/variables.constant'

import Switch from '../switch/switch.component'
import SearchBar from '../search-bar/search-bar.component'
import IconWrapper from '../icon-wrapper/icon-wrapper.component'
import BrandLogo from '../../assets/images/my-keep.png'

import './header.component.scss'

function Header (props) {
  const { setSideBarVisibilityCallback, isDarkMode, globalSearchQuery, 
    getFilteredNoteList, clearSearchQuery, setAppTheme } = props
  
  const handleHamburgerClick = () => {
    setSideBarVisibilityCallback()
  }

  const handleSearchNote = (searchQuery) => {
    getFilteredNoteList(searchQuery)

    props.history.push({
      pathname: '/search',
      search: "?" + new URLSearchParams({q: searchQuery}).toString()
    })
  }

  const handleClearSearchResults = () => {
    clearSearchQuery()
    props.history.push({
      pathname: '/active-notes'
    })
  }

  const handleSwitchChange = () => {
    setAppTheme()
  }

  const getActiveMenuName = () => {
    const { location } = props
    if (location.pathname === '/active-notes') return 'Active'
      else if (location.pathname === '/archived-notes') return 'Archived'
  }
  
  return (
    <div className='header-wrapper' style={{backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR}}>
      <div className='left-section'>
        <IconWrapper iconClickCallback={handleHamburgerClick}>
          <FaBars />
        </IconWrapper>
        <div className='brand-name-wrapper'>
          <img src={BrandLogo} alt='My Keep' className='brand-logo' />
          <p
            className='brand-name'
            style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_BACKGROUND_COLOR}}
          >
            {getActiveMenuName()}
          </p>
        </div>
      </div>
      <div className='middle-section'>
        <SearchBar
          {...props}
          persistedSearchQuery={globalSearchQuery}
          searchNoteCallback={(searchQuery)=> handleSearchNote(searchQuery)}
          clearFilteredResultsCallback={handleClearSearchResults}
        />
      </div>
      <div className='right-section'>
        <div className='switch-wrapper'>
          <IconContext.Provider value={{ color: '#939393', size: 30 }}>
            {isDarkMode ? <FiMoon /> : <RiSunLine />}
          </IconContext.Provider>
          <Switch {...props} switchChangeCallback={handleSwitchChange} />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isDarkMode: state.app.isDarkMode,
    globalSearchQuery: state.app.globalSearchQuery
  }
}

export default withRouter(connect(mapStateToProps, { getFilteredNoteList, clearSearchQuery, setAppTheme })(Header))