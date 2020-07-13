import React, { useState, useRef, useEffect } from 'react'
import { TiPinOutline } from 'react-icons/ti'
import { MdArchive } from 'react-icons/md'
import { deepCopy } from '../../utils/object'
import { getUuidv4 } from '../../utils/misc'
import { DARK_THEME_BORDER_COLOR, LIGHT_THEME_BORDER_COLOR, DARK_THEME_BOX_SHADOW, 
    LIGHT_THEME_BOX_SHADOW, DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR
} from '../../constants/variables.constant'

import CreateBox from '../create-box/create-box.component'
import IconWrapper from '../icon-wrapper/icon-wrapper.component'

import './note-creator.component.scss'

export default function NoteCreator (props) {
    const wrapperRef = useRef(null)
    const [values, setValues] = useState({
        title: '',
        description: ''
    })
    const [showExpandedView, setExpandedView] = useState(false)

    const { isDarkMode } = props
    const { handleCreateNote } = props

    const handleTitleChange = (title) => {
        let valuesCopy = deepCopy(values)
        valuesCopy.title = title
        setValues(valuesCopy)
    }

    const handleDescChange = (description) => {
        let valuesCopy = deepCopy(values)
        valuesCopy.description = description
        setValues(valuesCopy)
    }

    const handleExpandCreateBox = () => {
        if(!showExpandedView){
            setExpandedView(true)
        }
    }

    const createNote = () => {
        const params = {
            id: getUuidv4(),
            isPinned: false,
            status: 'active',
            title: values.title,
            description: values.description
        }
        setValues({
            title: '',
            description: '',
        })
        handleCreateNote(params)
    }

    const handleOutsideClick = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setExpandedView(false);
            if(values.title.length || values.description.length){
                createNote()
            }
        }
    }

    const handleCloseClick = () => {
        setExpandedView(false);
        if(values.title.length || values.description.length){
            createNote()
        }
    }

    const renderCollapsedCreateBoxView = () => {
        return(
            <div className='collapsed-view' onClick={handleExpandCreateBox}>
                <p className='placeholder-text'>Take a note...</p>
                <div className='action-button-wrapper'>
                    <IconWrapper>
                        <MdArchive />
                    </IconWrapper>
                    <IconWrapper>
                        <TiPinOutline />
                    </IconWrapper>
                </div>
            </div>
        )
    }

    const renderExpandedCreateBoxView = () => {
        return(
            <div ref={wrapperRef}>
                <CreateBox
                    {...props}
                    values={values}
                    closeClickCallback={handleCloseClick}
                    titleChangeCallback={(title) => handleTitleChange(title)}
                    descriptionChangeCallback={(description) => handleDescChange(description)}
                />
            </div>
        )
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, false);
        return () => {
          document.removeEventListener("click", handleOutsideClick, false);
        };
    }, [values]);
    
    return (
        <div
            className='note-creator-wrapper' 
            style={{
                borderColor: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR,
                backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR,
                boxShadow: isDarkMode ? DARK_THEME_BOX_SHADOW : LIGHT_THEME_BOX_SHADOW
            }}
        >
            {showExpandedView ? renderExpandedCreateBoxView() : renderCollapsedCreateBoxView()}
        </div>
    )
}