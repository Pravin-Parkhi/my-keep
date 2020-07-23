import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { IconContext } from "react-icons"
import { withRouter } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import { FiMoon } from 'react-icons/fi'
import { RiSunLine } from 'react-icons/ri'
import { getFilteredNoteList, clearSearchQuery, setAppTheme } from '../../actions/app'
import { DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR, DARK_THEME_TEXT_COLOR } from '../../constants/variables.constant'

import Switch from '../switch/switch.component'
import BrandLogo from '../../assets/images/my-keep.png'
import SearchBar from '../search-bar/search-bar.component'
import IconWrapper from '../icon-wrapper/icon-wrapper.component'
import useWindowDimensions from '../../hooks/useWindowDimensions'

import './header.component.scss'

function Header (props) {
  const node = useRef()
  const { width } = useWindowDimensions()
  const [showSearchBar, setSearchBar] = useState(width <= 768 ? false : true)
  const { setSideBarVisibilityCallback, isDarkMode, globalSearchQuery, 
    getFilteredNoteList, clearSearchQuery, setAppTheme } = props
  
  const handleHamburgerClick = () => {
    setSideBarVisibilityCallback()
  }

  const handleSearchIconClick = () => {
    setSearchBar(true)
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
    
    if(width < 768){
      setSearchBar(false)
    }

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

  const handleOutsideClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    handleClearSearchResults()
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleOutsideClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(()=> {
    (width <= 768) ? setSearchBar(false) : setSearchBar(true)
  }, [width])
  
  return (
    <div className='header-wrapper' style={{backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR}} ref={node}>
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
        {showSearchBar ? <SearchBar
          {...props}
          persistedSearchQuery={globalSearchQuery}
          searchNoteCallback={(searchQuery)=> handleSearchNote(searchQuery)}
          clearFilteredResultsCallback={handleClearSearchResults}
        /> : null}
      </div>
      <div className='right-section'>
        <div className='search-icon-wrapper'>
          <IconContext.Provider value={{ color: '#939393', size: 30 }}>
            <MdSearch onClick={handleSearchIconClick} />
          </IconContext.Provider>
        </div>
        <div className='switch-wrapper'>
          <IconContext.Provider value={{ color: '#939393', size: 26 }}>
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