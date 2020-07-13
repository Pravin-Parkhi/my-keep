import React, { useRef, useState, useEffect } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa';

import useDebounce from '../../hooks/useDebounce'
import IconWrapper from '../icon-wrapper/icon-wrapper.component'

import './search-bar.component.scss'

export default function SearchBar (props) {
  const wrapperRef = useRef(null)
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
        clearFilteredResults()
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
    <div className='search-bar-wrapper'>
      <IconWrapper>
        <FaSearch />
      </IconWrapper>
      <input
        type="text"
        placeholder="Search.."
        value={searchQuery}
        onChange={handleChange}
        ref={wrapperRef}
      />
      <IconWrapper>
        {searchQuery.length ? <FaTimes /> : null}
      </IconWrapper>
    </div>
  )
}