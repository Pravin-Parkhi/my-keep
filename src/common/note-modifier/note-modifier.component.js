import React, { useState, useEffect } from 'react'
import { deepCopy } from '../../utils/object'

import Modal from '../modal/modal.component'
import CreateBox from '../create-box/create-box.component'

import './note-modifier.component.scss'

export default function NoteModifier (props) {
    const [activeNotevalues, setActiveNoteValues] = useState(undefined)

    const { isDarkMode, activeNote, updateNoteCallback } = props

    const handleTitleChange = (title) => {
        let valuesCopy = deepCopy(activeNotevalues)
        valuesCopy.title = title
        setActiveNoteValues(valuesCopy)
    }

    const handleDescChange = (description) => {
        let valuesCopy = deepCopy(activeNotevalues)
        valuesCopy.description = description
        setActiveNoteValues(valuesCopy)
    }

    const updateNote = () => {
        const params = {
            id: activeNotevalues.id,
            isPinned: activeNotevalues.isPinned,
            status: activeNotevalues.status,
            title: activeNotevalues.title,
            description: activeNotevalues.description
        }
        updateNoteCallback(params)
        setActiveNoteValues(undefined)
    }

    const handleCloseClick = () => {
        updateNote()
    }

    useEffect(() => {
        if(activeNote){
            setActiveNoteValues(activeNote)
        }
    }, []);

    return (
        <Modal {...props} backdropClickCallback={handleCloseClick}>
            <CreateBox
                values={activeNotevalues}
                closeClickCallback={handleCloseClick}
                titleChangeCallback={(title) => handleTitleChange(title)}
                descriptionChangeCallback={(description) => handleDescChange(description)}
            />
        </Modal>
    )
}