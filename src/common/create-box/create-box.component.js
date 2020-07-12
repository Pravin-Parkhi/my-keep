import React, { useState, useRef, useEffect } from 'react'
import { FaArchive, FaThumbtack } from 'react-icons/fa';
import { DARK_THEME_BORDER_COLOR, LIGHT_THEME_BORDER_COLOR,
    DARK_THEME_TEXT_COLOR, LIGHT_THEME_TEXT_COLOR } from '../../constants/variables.constant';

import TextArea from '../text-area/text-area.component';
import IconWrapper from '../icon-wrapper/icon-wrapper.component';


import './create-box.component.scss'
import { deepCopy } from '../../utils/object';
import { getUuidv4 } from '../../utils/misc';

export default function CreateBox (props) {
    const wrapperRef = useRef(null);
    const [values, setValues] = useState({
        title: '',
        description: ''
    })
    const { isDarkMode } = props
    const { handleCreateNote } = props

    const [showExpandedView, setExpandedView] = useState(false)

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
                <p className='placeholder-text' style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : LIGHT_THEME_TEXT_COLOR}}>Take a note...</p>
                <div className='action-button-wrapper'>
                    <IconWrapper>
                        <FaArchive />
                    </IconWrapper>
                    <IconWrapper>
                        <FaThumbtack />
                    </IconWrapper>
                </div>
            </div>
        )
    }

    const renderExpandedCreateBoxView = () => {
        return(
            <div className='expanded-view' ref={wrapperRef}>
                <div className='title-wrapper'>
                    <TextArea
                        rows='1'
                        placeholder='Title'
                        value={values.title}
                        handleChangeCallback={(value)=> handleTitleChange(value)}
                    />
                    <IconWrapper>
                        <FaThumbtack />
                    </IconWrapper>
                </div>
                <div className='description-wrapper'>
                    <TextArea
                        rows='1'
                        placeholder='Take a note...'
                        value={values.description}
                        handleChangeCallback={(value)=> handleDescChange(value)}
                    />
                </div>
                <div className='action-button-wrapper'>
                    <IconWrapper>
                        <FaArchive />
                    </IconWrapper>
                    <IconWrapper>
                        <FaThumbtack />
                    </IconWrapper>
                    <div
                        className='close-btn'
                        onClick={handleCloseClick}
                    >
                        Close
                    </div>
                    
                </div>
            </div>
        )
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, false);
        return () => {
          document.removeEventListener("click", handleOutsideClick, false);
        };
    }, []);

    return (
        <div className='create-box-wrapper' style={{borderColor: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR}}>
            {showExpandedView ? renderExpandedCreateBoxView() : renderCollapsedCreateBoxView()}
        </div>
    )
}