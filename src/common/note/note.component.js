import React from 'react'
import { FaArchive, FaThumbtack } from 'react-icons/fa'
import { DARK_THEME_TEXT_COLOR, DARK_THEME_BORDER_COLOR, LIGHT_THEME_BORDER_COLOR, LIGHT_THEME_TEXT_COLOR } from '../../constants/variables.constant'

import IconWrapper from '../icon-wrapper/icon-wrapper.component'

import './note.component.scss'

export default function Note (props) {
  const { isDarkMode } = props
  
  return (
    <div className='note-wrapper' style={{color: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR}}>
      <div className='title-wrapper'>
          <p className='title' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : LIGHT_THEME_TEXT_COLOR}}>Hello</p>
          <IconWrapper>
            <FaThumbtack className='pinned-icon' />
          </IconWrapper>
      </div>
      <p className='description' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : LIGHT_THEME_TEXT_COLOR}}>
          Kindly consider this message as an application for the post of front end engineer with Cover Genius and request you to run through the profile of mine. 
          I would be grateful if you give me a chance to share my knowledge and experiences for the success of your organization.
      </p>
      <div className='action-wrapper'>
        <IconWrapper>
          <FaArchive className='action-button' />
        </IconWrapper>
      </div>
    </div>
  )
}