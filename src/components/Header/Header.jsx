import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptosHeader, removeFromPortfolio } from '../../store/actions/actions'
import { getCurrency, getPercent } from '../../helpers/helpers'
import { AiFillDelete } from 'react-icons/ai'
import { ModalWindow, Table } from '../index'
import './Header.scss'


const Header = () => {
    const [active, setActive] = useState(false)
    const { items } = useSelector(state => state.portfolio)
    const { headerItems } = useSelector(state => state.headerCrypto)
    const dispatch = useDispatch()

    const portfolioItemsId = items.map(item => item.id)
    const portfolioCurrency = headerItems.filter(item => portfolioItemsId.includes(item.id))
    const portfolioItemsSum = items.reduce((acc, curr) => acc + curr.priceUsd * curr.quantity, 0)

    portfolioCurrency.forEach((item) => {
        if (portfolioItemsId.includes(item.id)) {
            let itemPortfolio = items.find(item => item.id)
            item.quantity = itemPortfolio.quantity
        }
    })

    const portfolioCurrencySum = portfolioCurrency.reduce((acc, curr) => acc + curr.priceUsd * curr.quantity, 0)
    let difference = portfolioCurrencySum - portfolioItemsSum;
    let percentChange = ((portfolioCurrencySum * 100 / portfolioItemsSum) - 100) / 100;
    let popularCrypto = headerItems.slice(0, 3)

    const removeItemPortfolio = (e, data, id) => {
        e.stopPropagation()
        dispatch(removeFromPortfolio(data, id))
    }

    useEffect(() => {
        dispatch(getCryptosHeader())
    }, [dispatch])

    return (
        <header className="header">
            <div className="container">
                <nav className="navbar">
                    <div className="navbar__container">
                        <ul className="list__popular">
                            {popularCrypto.map(popular => (
                                <li
                                    key={popular.id}
                                    className="list__popular-item">
                                    <span className="item__name">
                                        {popular.name}
                                    </span>
                                    <span className="item__price">
                                        {getCurrency(popular.priceUsd)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="btn__portfolio"
                            onClick={() => setActive(true)}
                        >
                            <span className="btn__portfolio-icon">
                                <i className="fas fa-briefcase"></i>
                            </span>
                            <span className="btn__portfolio-summ">
                                {getCurrency(portfolioCurrency.reduce((acc, cur) => acc + (cur.priceUsd * cur.quantity), 0))}
                            </span>
                            <span className="btn__portfolio-diff">
                                {getCurrency(difference) || 0}
                            </span>
                            <span className="btn__portfolio-percent">
                                {isNaN(percentChange) ? '0' : getPercent(percentChange)}
                            </span>
                        </button>
                        <ModalWindow
                            active={active}
                            setActive={setActive}
                            checkPortfolio={true}
                        >
                            {
                                items.length > 0
                                    ?

                                    <Table
                                        data={items}
                                        icon={<AiFillDelete />}
                                        modalHandler={removeItemPortfolio}
                                    />
                                    :
                                    <h1 className="block__portfolio block__portfolio--empty">Portfolio is empty</h1>
                            }
                        </ModalWindow>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
