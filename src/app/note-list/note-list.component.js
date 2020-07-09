import React from 'react'
import { connect } from 'react-redux'
import './note-list.component.scss'

function NoteList (props) {

  return (
    <div className='note-list-container'>
      note list wrapper
    </div>
  )
}

function mapStateToProps (state) {
  return {}
}

export default (connect(mapStateToProps, {})(NoteList))