import React from 'react'
import { MdArchive, MdUnarchive } from 'react-icons/md'
import { TiPinOutline, TiPin } from 'react-icons/ti'
import { FaRegTrashAlt } from 'react-icons/fa'
import { DARK_THEME_TEXT_COLOR, DARK_THEME_BORDER_COLOR, 
  LIGHT_THEME_BORDER_COLOR, DARK_THEME_BACKGROUND_COLOR } from '../../constants/variables.constant'

import IconWrapper from '../icon-wrapper/icon-wrapper.component'

import './note.component.scss'

export default function Note (props) {
  const { isDarkMode, note } = props
  const { pinClickCallback, archiveClickCallback, unArchiveNoteCallback, 
    noteClickCallback, trashNoteCallback } = props
  const isArchived = note.status === 'archived'

  const handlePinClick = (event) => {
    event.stopPropagation()
    pinClickCallback(note)
  }

  const handleArchiveClick = (event) => {
    event.stopPropagation()
    archiveClickCallback(note)
  }

  const handleUnArchiveClick = (event) => {
    event.stopPropagation()
    unArchiveNoteCallback(note)
  }

  const handleNoteClick = () => {
    noteClickCallback(note)
  }

  const handleTrashClick = (event) => {
    event.stopPropagation()
    trashNoteCallback(note)
  }

  return (
    <div
      className='note-wrapper masonry-brick'
      style={{color: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR}}
      onClick={handleNoteClick}
    >
      <div className='note-info masonry-content'>
        <div className='title-wrapper'>
            {note.title.length 
              ? <p className='title' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_BACKGROUND_COLOR}}>
                  {note.title}
                </p>
                : <p className='description' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_BACKGROUND_COLOR}}>
                    {note.description}
            </p>}
            
            <IconWrapper>
              {note.isPinned ? 
                <TiPin className='pinned-icon' onClick={handlePinClick} />
                  : <TiPinOutline className='pinned-icon' onClick={handlePinClick} />}
            </IconWrapper>
        </div>
        {note.title.length ? <p className='description' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_BACKGROUND_COLOR}}>
            {note.description}
        </p> : null}
      </div>
      <div className='action-wrapper'>
        <IconWrapper>
          {isArchived ? <MdUnarchive className='action-button' onClick={handleUnArchiveClick} />
            : <MdArchive className='action-button' onClick={handleArchiveClick} />}
        </IconWrapper>
        <IconWrapper>
          <FaRegTrashAlt className='action-button' onClick={handleTrashClick} />
        </IconWrapper>
      </div>
    </div>
  )
}