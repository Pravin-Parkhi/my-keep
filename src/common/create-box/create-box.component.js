import React from 'react'
import { TiPinOutline, TiPin } from 'react-icons/ti'
import { MdArchive, MdUnarchive } from 'react-icons/md'

import TextArea from '../text-area/text-area.component';
import IconWrapper from '../icon-wrapper/icon-wrapper.component';

import './create-box.component.scss'

export default function CreateBox (props) {
    const { values } = props
    const { titleChangeCallback, descriptionChangeCallback, closeClickCallback } = props

    const handleCloseClick = () => {
        closeClickCallback()
    }

    console.log(values)

    const handlePinClick = () => {}

    const handleArchiveClick = () => {}

    return (
        <div className='expanded-view'>
            <div className='title-wrapper'>
                <TextArea
                    rows='1'
                    placeholder='Title'
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
                    placeholder='Take a note...'
                    value={values ? values.description : ''}
                    handleChangeCallback={(value)=> descriptionChangeCallback(value)}
                />
            </div>
            <div className='action-button-wrapper'>
                <IconWrapper>
                    {(values && values.status === 'archived') ? <MdUnarchive /> : <MdArchive />}
                </IconWrapper>
                <div className='close-btn' onClick={handleCloseClick}>Close</div>
            </div>
        </div>
    )
}