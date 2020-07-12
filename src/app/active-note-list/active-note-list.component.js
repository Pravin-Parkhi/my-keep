import React from 'react'
import { connect } from 'react-redux'

import Note from '../../common/note/note.component'
import CreateBox from '../../common/create-box/create-box.component'

import './active-note-list.component.scss'

function ActiveNoteList (props) {
  return (
    <div className='active-note-list-container'>
      <div className='create-box-container'>
        <CreateBox
          {...props}
        />
      </div>
      <div className='pinned-notes-wrapper'>
        <p className='heading'>pinned</p>
        <div className='note-list'>
          <Note
            {...props}
          />
          <Note
            {...props}
          />
        </div>
      </div>
      <div className='other-notes-wrapper'>
        <p className='heading'>other</p>
        <div className='note-list'>
          <Note
            {...props}
          />
          <Note
            {...props}
          />
          <Note
            {...props}
          />
          <Note
            {...props}
          />
          <Note
            {...props}
          />
          <Note
            {...props}
          />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isDarkMode: state.app.isDarkMode
  }
}

export default (connect(mapStateToProps, {})(ActiveNoteList))