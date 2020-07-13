import React from 'react'
import { connect } from 'react-redux'
import { IconContext } from "react-icons"
import { withRouter } from 'react-router-dom'
import { FaBars, FaSearch, FaCog } from 'react-icons/fa'
import { WiMoonAltWaxingGibbous1 } from 'react-icons/wi'
import { getFilteredNoteList, clearSearchQuery, setAppTheme } from '../../actions/app'
import { DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR } from '../../constants/variables.constant'

import Switch from '../switch/switch.component'
import SearchBar from '../search-bar/search-bar.component'
import IconWrapper from '../icon-wrapper/icon-wrapper.component'

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

  return (
    <div className='header-wrapper' style={{backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR}}>
      <div className='left-section'>
        <IconWrapper iconClickCallback={handleHamburgerClick}>
          <FaBars />
        </IconWrapper>
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
        {/* <IconWrapper>
          <FaSearch />
        </IconWrapper> */}
        <div className='switch-wrapper'>
          <IconContext.Provider value={{ color: '#939393', size: 30 }}>
            <WiMoonAltWaxingGibbous1 />
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