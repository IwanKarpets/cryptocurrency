import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptosHeader, removeFromPortfolio } from '../../store/actions/actions'
import { getCurrency, getPercent } from '../../helpers/helpers'
import { AiFillDelete } from 'react-icons/ai'
import { ModalWindow } from '../index'
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

    useEffect(() => {
        dispatch(getCryptosHeader())
    }, [dispatch])

    return (
        <header className="header">
            <header className="header__inner">
                <div className="container">
                    <nav className="navbar">
                        <div className="navbar__container">
                            <ul className="list__popular">
                                {popularCrypto.map(popular => (
                                    <li
                                        key={popular.id}
                                        className="list__popular--item">
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
                                <span className="btn__portfolio--icon">
                                    <i className="fas fa-briefcase"></i>
                                </span>
                                <span className="btn__portfolio--summ">
                                    {getCurrency(portfolioCurrency.reduce((acc, cur) => acc + (cur.priceUsd * cur.quantity), 0))}
                                </span>
                                <span className="btn__portfolio--diff">
                                    {getCurrency(difference) || 0}
                                </span>
                                <span className="btn__portfolio--percent">
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
                                        <table className="table__modal">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{getCurrency(item.priceUsd)}</td>
                                                        <td
                                                            onClick={() => dispatch(removeFromPortfolio(items, item.id))}
                                                        >
                                                            <AiFillDelete />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        :
                                        <h1 className="block__portfolio--empty">Portfolio is empty</h1>
                                }
                            </ModalWindow>
                        </div>
                    </nav>
                </div>
            </header>
        </header>
    )
}

export default Header
