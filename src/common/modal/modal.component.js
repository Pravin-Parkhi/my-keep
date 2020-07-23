import React, { useEffect } from 'react'
import { DARK_THEME_OVERLAY_BACKGROUND_COLOR, LIGHT_THEME_OVERLAY_BACKGROUND_COLOR, 
    DARK_THEME_BACKGROUND_COLOR, LIGHT_THEME_BACKGROUND_COLOR, DARK_THEME_BORDER_COLOR, 
    LIGHT_THEME_BORDER_COLOR,  DARK_THEME_BOX_SHADOW, LIGHT_THEME_BOX_SHADOW
} from '../../constants/variables.constant'

import './modal.component.scss'

export default function Modal (props) {
    const { isDarkMode, backdropClickCallback, activeNoteValues } = props

    const handleBackdropClick = () => {
        backdropClickCallback()
    }
    
    const handleKeyDown = (event) => {
        if(event.keyCode === 27 || event.key === 'Escape') {
            handleBackdropClick()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeNoteValues]);
      
    return (
        <>
            <div
                className='backdrop'
                style={{
                    backgroundColor: isDarkMode ? DARK_THEME_OVERLAY_BACKGROUND_COLOR : LIGHT_THEME_OVERLAY_BACKGROUND_COLOR
                }}
                onClick={handleBackdropClick}
            />
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