import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deepCopy } from '../../utils/object'
import { updateNote, getFilteredNoteList } from '../../actions/app'

import queryString from 'query-string'
import Note from '../../common/note/note.component'

import './filtered-note-list.component.scss'

function FilteredNoteList (props) {
  const { filteredNoteList, globalSearchQuery } = props
  const { updateNote, getFilteredNoteList } = props
  const archivedNoteList = filteredNoteList.filter(note => note.status === 'archived')
  const activeNoteList = filteredNoteList.filter(note => note.status === 'active')

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
    noteCopy.status = 'archived'
    noteCopy.isPinned = false
    handleUpdateNote(noteCopy)
  }

  const fetchFilteredNotes = () => {
    const urlParams = queryString.parse(props.location.search)
    getFilteredNoteList(urlParams.q)
  }

  useEffect(()=> {
    fetchFilteredNotes()
  }, [globalSearchQuery])

  return (
    <div className='filtered-note-list-container'>

      {(activeNoteList && activeNoteList.length) ? <div className='active-notes-wrapper'>
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

      {(archivedNoteList && archivedNoteList.length) ? <div className='archived-notes-wrapper'>
        <p className='heading'>archived</p>
        <div className='note-list'>
          {archivedNoteList.map(note => <Note
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
    globalSearchQuery: state.app.globalSearchQuery,
    filteredNoteList: state.app.filteredNoteList
  }
}

export default (connect(mapStateToProps, { updateNote, getFilteredNoteList })(FilteredNoteList))