import React from 'react'
import { IconContext } from "react-icons"

import './empty-list.component.scss'

export default function EmptyList (props) {
    const { emptyStateIcon, emptyStateText } = props
    return (
        <div className='empty-state-wraper'>
            <IconContext.Provider value={{ color: '#939393', size: 100 }}>
                {emptyStateIcon}
            </IconContext.Provider>
            <p className='empty-state-text'>{emptyStateText}</p>
        </div>
    )
}