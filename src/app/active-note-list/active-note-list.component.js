import React from 'react'
import { connect } from 'react-redux'
import { deepCopy } from '../../utils/object'
import { createNote, updateNote } from '../../actions/app'

import Note from '../../common/note/note.component'
import CreateBox from '../../common/create-box/create-box.component'

import './active-note-list.component.scss'

function ActiveNoteList (props) {
  const { noteList } = props
  const { createNote, updateNote } = props
  const activeNoteList = noteList.filter(note => (note.status === 'active' && !note.isPinned))
  const pinnedNoteList = noteList.filter(note => note.isPinned)

  const handleUpdateNote = (updatedNote) => {
    updateNote(updatedNote)
  }

  const handlePinClick = (note) => {
    let noteCopy = deepCopy(note)
    noteCopy.isPinned = !note.isPinned
    handleUpdateNote(noteCopy)
  }

  const handleArchiveClick = (note) => {
    let noteCopy = deepCopy(note)
    noteCopy.status = 'archive'
    noteCopy.isPinned = false
    handleUpdateNote(noteCopy)
  }

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
            {...props}
            note={note}
            key={note.id}
            archiveClickCallback={(note) => handleArchiveClick(note)}
            pinClickCallback={(note) => handlePinClick(note)}
          />)}
        </div>
      </div> : null}

      {(activeNoteList && activeNoteList.length) ? <div className='other-notes-wrapper'>
        <p className='heading'>other</p>
        <div className='note-list'>
          {activeNoteList.map(note => <Note
            {...props}
            note={note}
            key={note.id}
            archiveClickCallback={(note) => handleArchiveClick(note)}
            pinClickCallback={(note) => handlePinClick(note)}
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

export default (connect(mapStateToProps, { createNote, updateNote })(ActiveNoteList))