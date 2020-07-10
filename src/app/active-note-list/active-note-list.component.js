import React from 'react'
import { connect } from 'react-redux'
import './active-note-list.component.scss'

function ActiveNoteList (props) {

  return (
    <div className='active-note-list-container'>
      active note list wrapper
    </div>
  )
}

function mapStateToProps (state) {
  return {}
}

export default (connect(mapStateToProps, {})(ActiveNoteList))