import React from 'react'

import './icon-wrapper.component.scss'

export default function IconWrapper (props) {
  const { iconClickCallback } = props
  return (
    <div className='icon-wrapper' onClick={iconClickCallback}>
      {props.children}
    </div>
  )
}