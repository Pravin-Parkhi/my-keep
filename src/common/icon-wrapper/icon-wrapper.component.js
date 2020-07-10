import React from 'react'

import './icon-wrapper.component.scss'

export default function IconWrapper (props) {
  return (
    <div className='icon-wrapper'>
      {props.children}
    </div>
  )
}