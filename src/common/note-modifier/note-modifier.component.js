import React, { useState, useRef, useEffect } from 'react'
import { deepCopy } from '../../utils/object'
import { getUuidv4 } from '../../utils/misc'
import { DARK_THEME_BORDER_COLOR, LIGHT_THEME_BORDER_COLOR, DARK_THEME_OVERLAY_BACKGROUND_COLOR, LIGHT_THEME_OVERLAY_BACKGROUND_COLOR } from '../../constants/variables.constant';

import './note-modifier.component.scss'
import CreateBox from '../create-box/create-box.component';
import Modal from '../modal/modal.component';

export default function NoteModifier (props) {
    const wrapperRef = useRef(null)
    const [activeNotevalues, setActiveNoteValues] = useState(undefined)

    const { isDarkMode, activeNote } = props
    const { handleCreateNote } = props

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

    const createNote = () => {
        const params = {
            id: activeNotevalues.id,
            isPinned: activeNotevalues.isPinned,
            status: activeNotevalues.status,
            title: activeNotevalues.title,
            description: activeNotevalues.description
        }
        setActiveNoteValues(undefined)
        // handleCreateNote(params)
    }

    const handleOutsideClick = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            if(activeNotevalues.title.length || activeNotevalues.description.length){
                // 
                console.log('fafafa')
            }
        }
    }

    const handleCloseClick = () => {
        
    }

    useEffect(() => {
        if(activeNote){
            setActiveNoteValues(activeNote)
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, false);
        return () => {
          document.removeEventListener("click", handleOutsideClick, false);
        };
    }, [activeNotevalues]);

    // return (
    //     <div>
    //         <div className='overlay' style={{backgroundColor: isDarkMode ? DARK_THEME_OVERLAY_BACKGROUND_COLOR : LIGHT_THEME_OVERLAY_BACKGROUND_COLOR}}></div>
    //         <div
    //             className='note-modifier-wrapper'
    //             style={{borderColor: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR}}
    //         >
    //             <CreateBox
    //                 values={activeNotevalues}
    //                 closeClickCallback={handleCloseClick}
    //                 titleChangeCallback={(title) => handleTitleChange(title)}
    //                 descriptionChangeCallback={(description) => handleDescChange(description)}
    //             />
    //         </div>
    //     </div>
    // )

    return (
        <Modal {...props}>
            <CreateBox
                values={activeNotevalues}
                closeClickCallback={handleCloseClick}
                titleChangeCallback={(title) => handleTitleChange(title)}
                descriptionChangeCallback={(description) => handleDescChange(description)}
            />
        </Modal>
    )
}