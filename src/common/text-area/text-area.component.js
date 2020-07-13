import React, { useRef, useEffect } from 'react'
import { DARK_THEME_TEXT_COLOR, DARK_THEME_OVERLAY_BACKGROUND_COLOR } from '../../constants/variables.constant'

import './text-area.component.scss'

export default function TextArea ({
    rows,
    value,
    autofocus,
    isDarkMode,
    placeholder,
    handleChangeCallback
}) {
    const textareaRef = useRef(null)

    const handleChange = (event) => {
        handleChangeCallback(event.target.value)
    }
  
    useEffect(() => {
        textareaRef.current.style.height = '0px';
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = (scrollHeight - 14) + 'px';
    }, [value]);
  
    return (
        <div className='text-area-wrapper'>
            <textarea
                ref={textareaRef}
                value={value}
                rows={rows}
                autoFocus={autofocus}
                placeholder={placeholder}
                onChange={handleChange}
                style={{color: isDarkMode ? DARK_THEME_TEXT_COLOR : DARK_THEME_OVERLAY_BACKGROUND_COLOR}}
            />
        </div>
    )
}