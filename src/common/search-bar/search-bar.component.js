import React, { useRef, useState, useEffect } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa';

import useDebounce from '../../hooks/useDebounce'
import IconWrapper from '../icon-wrapper/icon-wrapper.component'

import './search-bar.component.scss'
import { DARK_THEME_TEXT_COLOR, DARK_THEME_OVERLAY_BACKGROUND_COLOR, DARK_THEME_SEARCH_BAR_BACKGROUND_COLOR, LIGHT_THEME_SEARCH_BAR_BACKGROUND_COLOR } from '../../constants/variables.constant';

export default function SearchBar (props) {
  const wrapperRef = useRef(null)
  const { isDarkMode } = props
  const { searchNoteCallback, persistedSearchQuery, clearFilteredResultsCallback } = props
  const [searchQuery, setSearchQuery] = useState(persistedSearchQuery || '')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleCloseClick = () => {
    clearFilteredResults()
  }

  const clearFilteredResults = () => {
    setSearchQuery('')
    clearFilteredResultsCallback()
  }

  const handleOutsideClick = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      if(searchQuery.length){
        clearFilteredResults()
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      searchNoteCallback(debouncedSearchQuery)
    }
  },[debouncedSearchQuery]);

  return (
    <div
      className='search-bar-wrapper'
      style={{
        color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_OVERLAY_BACKGROUND_COLOR,
        backgroundColor: isDarkMode ? DARK_THEME_SEARCH_BAR_BACKGROUND_COLOR : LIGHT_THEME_SEARCH_BAR_BACKGROUND_COLOR
      }}
    >
      <IconWrapper>
        <FaSearch />
      </IconWrapper>
      <input
        type="text"
        placeholder="Search.."
        value={searchQuery}
        onChange={handleChange}
        ref={wrapperRef}
        style={{
          color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_OVERLAY_BACKGROUND_COLOR,
          // backgroundColor: isDarkMode ? DARK_THEME_SEARCH_BAR_BACKGROUND_COLOR : LIGHT_THEME_SEARCH_BAR_BACKGROUND_COLOR
        }}
      />
      <IconWrapper>
        {searchQuery.length 
          ? <FaTimes onClick={handleCloseClick} />
            : null}
      </IconWrapper>
    </div>
  )
}