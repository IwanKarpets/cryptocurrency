import React from 'react'
import './EnterComponent.scss'
import { getCurrency } from '../../helpers/helpers'

const EnterComponent = ({name, price, setQuantity, quantity}) => {
    return (
        <div className="currency__add">
            <h3 className="currency__info">
                <span className="currency__info-name">
                    {name}
                </span>
                <span className="currency__info-name">
                    {isNaN(price) ? 0 : getCurrency(price)}
                </span>
            </h3>
            <div className="block__enter">
                <span className="block__enter-text">Enter Quantity</span>
                <input className="block__enter-input"
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                    placeholder="Enter quantity"
                />
            </div>
        </div>
    )
}

export default EnterComponent
