import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../../actions/app'

import Note from '../../common/note/note.component'
import CreateBox from '../../common/create-box/create-box.component'

import './active-note-list.component.scss'

function ActiveNoteList (props) {
  const { noteList } = props
  const { createNote } = props
  const activeNoteList = noteList.filter(note => (note.status === 'active'))
  const pinnedNoteList = noteList.filter(note => note.isPinned)

  return (
    <div className='active-note-list-container'>
      <div className='create-box-container'>
        <CreateBox
          handleCreateNote={createNote}
          {...props}
        />
      </div>

      {(pinnedNoteList && pinnedNoteList.length) ? <div className='pinned-notes-wrapper'>
        <p className='heading'>pinned</p>
        <div className='note-list'>
          {pinnedNoteList.map(note => <Note
            key={note.id}
            note={note}
            {...props}
          />)}
        </div>
      </div> : null}

      {(activeNoteList && activeNoteList.length) ? <div className='other-notes-wrapper'>
        <p className='heading'>other</p>
        <div className='note-list'>
          {activeNoteList.map(note => <Note
            key={note.id}
            note={note}
            {...props}
          />)}
        </div>
      </div> : null}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isDarkMode: state.app.isDarkMode,
    noteList: state.app.noteList
  }
}

export default (connect(mapStateToProps, {createNote})(ActiveNoteList))