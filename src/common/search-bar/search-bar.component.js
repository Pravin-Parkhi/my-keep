import React, { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa';

import IconWrapper from '../icon-wrapper/icon-wrapper.component'
import './search-bar.component.scss'

export default function SearchBar (props) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleChange = (event) => {
      setSearchQuery(event.target.value)
  }
  
  return (
    <div className='search-bar-wrapper'>
      <IconWrapper>
        <FaSearch />
      </IconWrapper>
      <input
        type="text"
        placeholder="Search.."
        onChange={handleChange}
      />
      <IconWrapper>
        {searchQuery.length ? <FaTimes /> : null}
      </IconWrapper>
    </div>
  )
}