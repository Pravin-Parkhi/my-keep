import React from 'react'

import './switch.component.scss'

export default function Switch ({switchChangeCallback, isDarkMode}) {
    
    const handleChange = () => {
        switchChangeCallback()
    }
   
    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={handleChange}
            />
            <span className="slider round"></span>
        </label>
    )
}