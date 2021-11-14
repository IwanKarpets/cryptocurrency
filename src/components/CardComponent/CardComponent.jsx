import React from 'react'
import './CardComponent.scss'

const CardComponent = ({ title, text, children}) => {
    return (
        <div className="card">
            <div className="card__title">{title}</div>
            <div className="card__line"></div>
            <div className="card__description">
                {text}
                {children ? children: null}
            </div>
         </div>
    )
}

export default CardComponent
