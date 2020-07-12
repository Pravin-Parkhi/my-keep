import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../../actions/app'
import { deepCopy } from '../../utils/object'

import Note from '../../common/note/note.component'

import './archived-note-list.component.scss'

function ArchivedNoteList (props) {
  const { noteList } = props
  const { updateNote } = props
  const archivedNoteList = noteList.filter(note => (note.status === 'archived'))

  const handleUnarchiveClick = (note) => {
    let noteCopy = deepCopy(note)
    noteCopy.status = 'active'
    noteCopy.isPinned = false
    updateNote(noteCopy)
  }

  const handlePinClick = (note) => {
    let noteCopy = deepCopy(note)
    noteCopy.isPinned = !note.isPinned
    noteCopy.status = 'active'
    updateNote(noteCopy)
  }

  return (
    <div className='archived-note-list-container'>
      
      {(archivedNoteList && archivedNoteList.length) ? <div className='archived-notes-wrapper'>
        <p className='heading'>Archived</p>
        <div className='note-list'>
          {archivedNoteList.map(note => <Note
            {...props}
            note={note}
            key={note.id}
            unArchiveNoteCallback={(note) => handleUnarchiveClick(note)}
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

export default (connect(mapStateToProps, {updateNote})(ArchivedNoteList))