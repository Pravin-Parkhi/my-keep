import React, { useState, useEffect } from 'react'
import { deepCopy } from '../../utils/object'

import Modal from '../modal/modal.component'
import CreateBox from '../create-box/create-box.component'

import './note-modifier.component.scss'

export default function NoteModifier (props) {
    const [activeNoteValues, setActiveNoteValues] = useState(undefined)

    const { activeNote, updateNoteCallback, trashClickCallback } = props

    const handleTitleChange = (title) => {
        let valuesCopy = deepCopy(activeNoteValues)
        valuesCopy.title = title
        setActiveNoteValues(valuesCopy)
    }

    const handleDescChange = (description) => {
        let valuesCopy = deepCopy(activeNoteValues)
        valuesCopy.description = description
        setActiveNoteValues(valuesCopy)
    }

    const handlePinClick = () => {
        let valuesCopy = deepCopy(activeNoteValues)
        valuesCopy.isPinned = !valuesCopy.isPinned
        setActiveNoteValues(valuesCopy)
        updateNote(valuesCopy)
    }

    const handleArchiveClick = () => {
        let valuesCopy = deepCopy(activeNoteValues)
        if(valuesCopy.status === 'active'){
            valuesCopy.status = 'archived'
        } else {
            valuesCopy.status = 'active'
        }
        setActiveNoteValues(valuesCopy)
        updateNote(valuesCopy)
    }

    const updateNote = (note) => {
        updateNoteCallback(note)
        setActiveNoteValues(undefined)
    }

    const handleCloseClick = () => {
        updateNote(activeNoteValues)
    }

    useEffect(() => {
        if(activeNote){
            setActiveNoteValues(activeNote)
        }
    }, []);

    return (
        <Modal
            {...props}
            activeNoteValues={activeNoteValues}
            backdropClickCallback={handleCloseClick}
        >
            <CreateBox
                {...props}
                values={activeNoteValues}
                showDeleteOption={true}
                closeClickCallback={handleCloseClick}
                titleChangeCallback={(title) => handleTitleChange(title)}
                descriptionChangeCallback={(description) => handleDescChange(description)}
                pinClickedCallback={handlePinClick}
                archiveClickCallback={handleArchiveClick}
                trashClickCallback={(note) => trashClickCallback(note)}
            />
        </Modal>
    )
}