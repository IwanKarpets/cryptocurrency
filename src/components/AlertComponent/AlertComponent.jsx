import React from 'react'
import './AlertComponent.scss'


const AlertComponent = ({ title, variant }) => {
  return (
    <div class={`alert ${variant}-alert`}>
      <h3 class="alert__text">{title}</h3>
    </div>
  )
}

export default AlertComponent
