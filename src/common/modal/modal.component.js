import React, { useState } from 'react'
import { DARK_THEME_OVERLAY_BACKGROUND_COLOR, LIGHT_THEME_OVERLAY_BACKGROUND_COLOR, 
    DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR } from '../../constants/variables.constant'

import './modal.component.scss'

export default function Modal (props) {
    const { isDarkMode, show } = props
      
    return (
        <>
            {show ? <div
                className='backdrop'
                style={{
                    backgroundColor: isDarkMode ? DARK_THEME_OVERLAY_BACKGROUND_COLOR : LIGHT_THEME_OVERLAY_BACKGROUND_COLOR
                }}
            /> : null}
            <div
                className='modal'
                style={{
                    backgroundColor: isDarkMode ? DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR,
                    transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? 1 : 0
                }}
            >
            {props.children}
            </div>
        </>
    )
}