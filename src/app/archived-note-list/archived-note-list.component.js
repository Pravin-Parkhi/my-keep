import React from 'react'
import { connect } from 'react-redux'
import './archived-note-list.component.scss'

function ArchivedNoteList (props) {

  return (
    <div className='archived-note-list-container'>
      archived note list wrapper
    </div>
  )
}

function mapStateToProps (state) {
  return {}
}

export default (connect(mapStateToProps, {})(ArchivedNoteList))