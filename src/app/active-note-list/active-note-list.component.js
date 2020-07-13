import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deepCopy } from '../../utils/object'
import { createNote, updateNote } from '../../actions/app'

import Note from '../../common/note/note.component'
import NoteCreator from '../../common/note-creator/note-creator.component'

import './active-note-list.component.scss'
import NoteModifier from '../../common/note-modifier/note-modifier.component'

function ActiveNoteList (props) {
  const { noteList } = props
  const { createNote, updateNote } = props
  const [activeNote, setActiveNote] = useState(undefined)
  const [showNoteModifier, setNoteModifier] = useState(false)
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

  const handleNoteClick = (note) => {
    setActiveNote(note)
    setTimeout(()=> {
      toggleNoteModifier()
    },0)
  }

  const toggleNoteModifier = () => {
    setNoteModifier(!showNoteModifier)
  }

  return (
    <div className='active-note-list-container'>
      <div className='create-box-container'>
        <NoteCreator
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
            noteClickCallback={(note) => handleNoteClick(note)}
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
            noteClickCallback={(note) => handleNoteClick(note)}
          />)}
        </div>
      </div> : null}

      <NoteModifier
        {...props}
        show={showNoteModifier}
        activeNote={activeNote}
      />
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