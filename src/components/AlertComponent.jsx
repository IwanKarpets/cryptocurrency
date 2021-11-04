import React from 'react'


const AlertComponent = ({ title, variant }) => {
  return (
    <div className={`alert alert-${variant} text-center`} role="alert">
      {title}
    </div>
  )
}

export default AlertComponent
