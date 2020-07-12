import React from 'react'
import { connect } from 'react-redux'

import Note from '../../common/note/note.component'

import './archived-note-list.component.scss'

function ArchivedNoteList (props) {
  const { noteList } = props
  const archivedNoteList = noteList.filter(note => (note.status === 'archived'))

  return (
    <div className='archived-note-list-container'>
      
      {(archivedNoteList && archivedNoteList.length) ? <div className='archived-notes-wrapper'>
        <p className='heading'>Archived</p>
        <div className='note-list'>
          {archivedNoteList.map(note => <Note
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

export default (connect(mapStateToProps, {})(ArchivedNoteList))