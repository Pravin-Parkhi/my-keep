import React from 'react'
import { TiPinOutline, TiPin } from 'react-icons/ti'
import { MdArchive, MdUnarchive } from 'react-icons/md'
import { DARK_THEME_TEXT_COLOR, DARK_THEME_OVERLAY_BACKGROUND_COLOR } from '../../constants/variables.constant'
import { FaRegTrashAlt } from 'react-icons/fa'

import TextArea from '../text-area/text-area.component';
import IconWrapper from '../icon-wrapper/icon-wrapper.component';

import './create-box.component.scss'

export default function CreateBox (props) {
    const { values, isDarkMode, showDeleteOption } = props
    const { titleChangeCallback, descriptionChangeCallback, closeClickCallback,
        pinClickedCallback, archiveClickCallback, trashClickCallback } = props

    const handleCloseClick = () => {
        closeClickCallback()
    }

    const handlePinClick = () => {
        pinClickedCallback(values)
    }

    const handleArchiveClick = () => {
        archiveClickCallback(values)
    }

    const handleTrashClick = () => {
        trashClickCallback(values)
    }

    return (
        <div className='expanded-view'>
            <div className='title-wrapper'>
                <TextArea
                    rows='1'
                    placeholder='Title'
                    isDarkMode={isDarkMode}
                    value={values ? values.title : ''}
                    handleChangeCallback={(value)=> titleChangeCallback(value)}
                />
                <IconWrapper>
                    {(values && values.isPinned) ? <TiPin onClick={handlePinClick} /> : <TiPinOutline onClick={handlePinClick} />}
                </IconWrapper>
            </div>
            <div className='description-wrapper'>
                <TextArea
                    rows='1'
                    autofocus
                    isDarkMode={isDarkMode}
                    placeholder='Take a note...'
                    value={values ? values.description : ''}
                    handleChangeCallback={(value)=> descriptionChangeCallback(value)}
                />
            </div>
            <div className='action-button-wrapper'>
                <IconWrapper>
                    {(values && values.status === 'archived') 
                        ? <MdUnarchive onClick={handleArchiveClick} /> 
                            : <MdArchive onClick={handleArchiveClick} />}
                </IconWrapper>
                {showDeleteOption && <IconWrapper>
                    <FaRegTrashAlt className='action-button' onClick={handleTrashClick} />
                </IconWrapper>}
                <div
                    className='close-btn'
                    onClick={handleCloseClick}
                    style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_OVERLAY_BACKGROUND_COLOR}}
                >
                    Close
                </div>
            </div>
        </div>
    )
}