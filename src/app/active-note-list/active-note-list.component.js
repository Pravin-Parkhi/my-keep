import { connect } from 'react-redux'
import React, { useState } from 'react'
import { deepCopy } from '../../utils/object'
import { FaRegLightbulb } from 'react-icons/fa'
import { createNote, updateNote, deleteNote } from '../../actions/app'

import Note from '../../common/note/note.component'
import EmptyList from '../../common/empty-list/empty-list.component'
import NoteCreator from '../../common/note-creator/note-creator.component'
import NoteModifier from '../../common/note-modifier/note-modifier.component'

import './active-note-list.component.scss'

function ActiveNoteList (props) {
  const [activeNote, setActiveNote] = useState(undefined)
  const [showNoteModifier, setNoteModifier] = useState(false)

  const { noteList } = props
  const { createNote, updateNote, deleteNote } = props
  const activeNoteList = noteList.filter(note => (note.status === 'active' && !note.isPinned))
  const pinnedNoteList = noteList.filter(note => note.isPinned)

  const handleUpdateNote = (updatedNote) => {
    updateNote(updatedNote)
    
    if(showNoteModifier){
      setTimeout(()=> {
        toggleNoteModifier()
      }, 0)
    }
  }

  const handlePinClick = (note) => {
    let noteCopy = deepCopy(note)
    noteCopy.isPinned = !note.isPinned
    handleUpdateNote(noteCopy)
  }

  const handleArchiveClick = (note) => {
    let noteCopy = deepCopy(note)
    noteCopy.status = 'archived'
    noteCopy.isPinned = false
    handleUpdateNote(noteCopy)
  }

  const handleTrashClick = (note) => {
    deleteNote(note)
    if(showNoteModifier){
      setNoteModifier(false)
    }
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
            trashNoteCallback={(note) => handleTrashClick(note)}
          />)}
        </div>
      </div> : null}

      {(activeNoteList && activeNoteList.length) ? <div className='other-notes-wrapper'>
        {(pinnedNoteList && pinnedNoteList.length) ? <p className='heading'>other</p> : null}
        <div className='note-list'>
          {activeNoteList.map(note => <Note
            {...props}
            note={note}
            key={note.id}
            archiveClickCallback={(note) => handleArchiveClick(note)}
            pinClickCallback={(note) => handlePinClick(note)}
            noteClickCallback={(note) => handleNoteClick(note)}
            trashNoteCallback={(note) => handleTrashClick(note)}
          />)}
        </div>
      </div> : null}

      {(!pinnedNoteList.length && !activeNoteList.length) 
        ? <EmptyList
          emptyStateIcon={<FaRegLightbulb />}
          emptyStateText='Your active notes appear here'
        /> 
          : null}

      {showNoteModifier && <NoteModifier
        {...props}
        show={showNoteModifier}
        activeNote={activeNote}
        updateNoteCallback={(note) => handleUpdateNote(note)}
        trashClickCallback={(note) => handleTrashClick(note)}
      />}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isDarkMode: state.app.isDarkMode,
    noteList: state.app.noteList
  }
}

export default (connect(mapStateToProps, { createNote, updateNote, deleteNote })(ActiveNoteList))