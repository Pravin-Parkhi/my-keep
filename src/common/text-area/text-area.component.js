import React, { useState, useRef, useEffect } from 'react'

import './text-area.component.scss'

export default function TextArea ({
    rows,
    placeholder,
    handleChangeCallback
}) {
    const textareaRef = useRef(null)
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        // handleChangeCallback(event.target.value)
        setValue(event.target.value)
    }
  
    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = (scrollHeight - 14) + "px";
    }, [value]);
  
    return (
        <div className='text-area-wrapper'>
        <textarea
            ref={textareaRef}
            value={value}
            rows={rows}
            placeholder={placeholder}
            onChange={handleChange}
        />
        </div>
    )
}