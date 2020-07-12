import React, { useState, useRef, useEffect } from 'react'
import { FaArchive, FaThumbtack } from 'react-icons/fa';
import { DARK_THEME_BORDER_COLOR, LIGHT_THEME_BORDER_COLOR,
    DARK_THEME_TEXT_COLOR, LIGHT_THEME_TEXT_COLOR } from '../../constants/variables.constant';

import TextArea from '../text-area/text-area.component';
import IconWrapper from '../icon-wrapper/icon-wrapper.component';


import './create-box.component.scss'

export default function CreateBox (props) {
    const wrapperRef = useRef(null);
    const { isDarkMode } = props

    const [showExpandedView, setExpandedView] = useState(false)

    const handleTitleChange = (event) => {}

    const handleDescChange = (event) => {}

    const handleExpandCreateBox = () => {
        if(!showExpandedView){
            setExpandedView(true)
        }
    }

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setExpandedView(false);
        }
    }

    const handleCloseClick = () => {
        setExpandedView(false)
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
                        handleChangeCallback={handleTitleChange}
                    />
                    <IconWrapper>
                        <FaThumbtack />
                    </IconWrapper>
                </div>
                <div className='description-wrapper'>
                    <TextArea
                        rows='1'
                        placeholder='Take a note...'
                        handleChangeCallback={handleDescChange}
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
        document.addEventListener("click", handleClickOutside, false);
        return () => {
          document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    return (
        <div className='create-box-wrapper' style={{borderColor: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR}}>
            {showExpandedView ? renderExpandedCreateBoxView() : renderCollapsedCreateBoxView()}
        </div>
    )
}