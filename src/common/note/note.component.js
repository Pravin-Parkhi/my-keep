import React from 'react'
import { FaArchive, FaThumbtack } from 'react-icons/fa'
import { DARK_THEME_TEXT_COLOR, DARK_THEME_BORDER_COLOR, LIGHT_THEME_BORDER_COLOR, LIGHT_THEME_TEXT_COLOR } from '../../constants/variables.constant'

import IconWrapper from '../icon-wrapper/icon-wrapper.component'

import './note.component.scss'

export default function Note (props) {
  const { isDarkMode, note } = props
  return (
    <div
      className='note-wrapper'
      style={{color: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR}}
    >
      <div className='title-wrapper'>
          <p className='title' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : LIGHT_THEME_TEXT_COLOR}}>
            {note.title}
          </p>
          <IconWrapper>
            <FaThumbtack className='pinned-icon' />
          </IconWrapper>
      </div>
      <p className='description' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : LIGHT_THEME_TEXT_COLOR}}>
          {note.description}
      </p>
      <div className='action-wrapper'>
        <IconWrapper>
          <FaArchive className='action-button' />
        </IconWrapper>
      </div>
    </div>
  )
}