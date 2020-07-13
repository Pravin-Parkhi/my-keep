import React, { useState } from 'react'
import { DARK_THEME_OVERLAY_BACKGROUND_COLOR, LIGHT_THEME_OVERLAY_BACKGROUND_COLOR, 
    DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR, DARK_THEME_BORDER_COLOR, 
    LIGHT_THEME_BORDER_COLOR,  DARK_THEME_BOX_SHADOW, LIGHT_THEME_BOX_SHADOW
} from '../../constants/variables.constant'

import './modal.component.scss'

export default function Modal (props) {
    const { isDarkMode, show, backdropClickCallback } = props

    const handleBackdropClick = () => {
        backdropClickCallback()
    }
      
    return (
        <>
            {show ? <div
                className='backdrop'
                style={{
                    backgroundColor: isDarkMode ? DARK_THEME_OVERLAY_BACKGROUND_COLOR : LIGHT_THEME_OVERLAY_BACKGROUND_COLOR
                }}
                onClick={handleBackdropClick}
            /> : null}
            <div
                className='modal'
                style={{
                    borderColor: isDarkMode ? DARK_THEME_BORDER_COLOR : LIGHT_THEME_BORDER_COLOR,
                    backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR,
                    boxShadow: isDarkMode ? DARK_THEME_BOX_SHADOW : LIGHT_THEME_BOX_SHADOW,
                    transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? 1 : 0
                }}
            >
            {props.children}
            </div>
        </>
    )
}