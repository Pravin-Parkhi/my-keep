import React from 'react'
import { connect } from 'react-redux'
import './active-note-list.component.scss'
import Note from '../../common/note/note.component'

function ActiveNoteList (props) {
  return (
    <div className='active-note-list-container'>
      <div className='create-box-container'>

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