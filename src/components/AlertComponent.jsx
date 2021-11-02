import React from 'react'
import {Alert} from 'react-bootstrap'

const AlertComponent = ({title, variant}) => {
    return (
        <Alert className="text-center" variant={variant}>
          {title}
        </Alert>
    )
}

export default AlertComponent
