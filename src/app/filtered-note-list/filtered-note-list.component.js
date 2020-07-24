import { connect } from 'react-redux'
import { deepCopy } from '../../utils/object'
import { RiSearch2Line } from 'react-icons/ri'
import React, { useState, useEffect } from 'react'
import { updateNote, deleteNote, getFilteredNoteList } from '../../actions/app'

import queryString from 'query-string'
import Note from '../../common/note/note.component'
import EmptyList from '../../common/empty-list/empty-list.component'
import NoteModifier from '../../common/note-modifier/note-modifier.component'
import MasonryLayout from '../../common/masonry-layout/masonry-layout.component'

import './filtered-note-list.component.scss'

function FilteredNoteList (props) {
  const [activeNote, setActiveNote] = useState(undefined)
  const [showNoteModifier, setNoteModifier] = useState(false)

  const { filteredNoteList, globalSearchQuery } = props
  const { updateNote, deleteNote, getFilteredNoteList } = props
  const archivedNoteList = filteredNoteList.filter(note => note.status === 'archived')
  const activeNoteList = filteredNoteList.filter(note => note.status === 'active')

  const handleNoteClick = (note) => {
    setActiveNote(note)
    setTimeout(()=> {
      toggleNoteModifier()
    },0)
  }

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

  const fetchFilteredNotes = () => {
    const urlParams = queryString.parse(props.location.search)
    getFilteredNoteList(urlParams.q)
  }

  const toggleNoteModifier = () => {
    setNoteModifier(!showNoteModifier)
  }

  useEffect(()=> {
    fetchFilteredNotes()
  }, [globalSearchQuery])

  return (
    <div className='filtered-note-list-container'>

      {(activeNoteList && activeNoteList.length) ? <div className='active-notes-wrapper'>
        <MasonryLayout {...props} className='note-list'>
          {activeNoteList.map(note => <Note
            {...props}
            note={note}
            key={note.id}
            archiveClickCallback={(note) => handleArchiveClick(note)}
            pinClickCallback={(note) => handlePinClick(note)}
            noteClickCallback={(note) => handleNoteClick(note)}
            trashNoteCallback={(note) => handleTrashClick(note)}
          />)}
        </MasonryLayout>
      </div> : null}

      {(archivedNoteList && archivedNoteList.length) ? <div className='archived-notes-wrapper'>
        <p className='heading'>archived</p>
        <MasonryLayout {...props} className='note-list'>
          {archivedNoteList.map(note => <Note
            {...props}
            note={note}
            key={note.id}
            archiveClickCallback={(note) => handleArchiveClick(note)}
            pinClickCallback={(note) => handlePinClick(note)}
            noteClickCallback={(note) => handleNoteClick(note)}
            trashNoteCallback={(note) => handleTrashClick(note)}
          />)}
        </MasonryLayout>
      </div> : null}

      {(!archivedNoteList.length && !activeNoteList.length) 
        ? <EmptyList
            emptyStateIcon={<RiSearch2Line />}
            emptyStateText='No matching results'
        /> 
        : null}
          
      {showNoteModifier && <NoteModifier
        {...props}
        show={showNoteModifier}
        activeNote={activeNote}
        pinClickCallback={(note) => handlePinClick(note)}
        noteClickCallback={(note) => handleNoteClick(note)}
        updateNoteCallback={(note) => handleUpdateNote(note)}
        trashClickCallback={(note) => handleTrashClick(note)}
      />}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    isDarkMode: state.app.isDarkMode,
    globalSearchQuery: state.app.globalSearchQuery,
    filteredNoteList: state.app.filteredNoteList
  }
}

export default (connect(mapStateToProps, { updateNote, deleteNote, getFilteredNoteList })(FilteredNoteList))