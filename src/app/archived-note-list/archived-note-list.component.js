import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateNote, deleteNote } from '../../actions/app'
import { deepCopy } from '../../utils/object'
import { MdArchive } from 'react-icons/md'

import Note from '../../common/note/note.component'
import EmptyList from '../../common/empty-list/empty-list.component'
import NoteModifier from '../../common/note-modifier/note-modifier.component'

import './archived-note-list.component.scss'

function ArchivedNoteList (props) {
  const { noteList } = props
  const { updateNote, deleteNote } = props
  const [activeNote, setActiveNote] = useState(undefined)
  const [showNoteModifier, setNoteModifier] = useState(false)
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

  const handleUpdateNote = (note) => {
    toggleNoteModifier()
    updateNote(note)
  }

  const toggleNoteModifier = () => {
    setNoteModifier(!showNoteModifier)
  }

  return (
    <div className='archived-note-list-container'>
      
      {(archivedNoteList && archivedNoteList.length) 
        ? <div className='archived-notes-wrapper'>
            <p className='heading'>Archived</p>
            <div className='note-list'>
              {archivedNoteList.map(note => <Note
                {...props}
                note={note}
                key={note.id}
                unArchiveNoteCallback={(note) => handleUnarchiveClick(note)}
                pinClickCallback={(note) => handlePinClick(note)}
                noteClickCallback={(note) => handleNoteClick(note)}
                trashNoteCallback={(note) => handleTrashClick(note)}
              />)}
            </div>
          </div> 
          : <EmptyList
            emptyStateIcon={<MdArchive />}
            emptyStateText='Your archived notes appear here'
          />}

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

export default (connect(mapStateToProps, { updateNote, deleteNote })(ArchivedNoteList))