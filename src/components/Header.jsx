import React,{useEffect, useState} from 'react'
import {Table } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getCryptosHeader, removeFromPortfolio} from '../store/actions/actions'
import {getCurrency, getPercent} from '../../src/helpers/helpers'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillDelete} from 'react-icons/ai'
import {ModalWindow} from './index'
import {Link} from 'react-router-dom'


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
        <>
            <nav class="navbar bg-primary" >
                <div className="container">
                    <div className="mx-auto d-flex justify-content-between align-items-center">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <ul className="list-group list-group-horizontal d-none d-sm-none d-md-flex">
                            {popularCrypto.map(popular => (
                                <li
                                    key={popular.id}
                                    className="list-group-item py-0 d-flex justify-content-between align-items-center"
                                >
                                    <div className="ms-1">
                                        {popular.name}
                                    </div>
                                    <span className="badge bg-primary ms-2">
                                        {getCurrency(popular.priceUsd)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="btn btn-outline-info d-flex justify-content-between align-items-center py-2 ms-2"
                            onClick={() => setActive(true)}
                        >
                            <BsFillBriefcaseFill />
                            <span className="badge bg-secondary ms-2">
                                {getCurrency(portfolioCurrency.reduce((acc, cur) => acc + (cur.priceUsd * cur.quantity), 0))}
                            </span>
                            <span className="badge bg-secondary ms-2">
                                {getCurrency(difference) || 0}
                            </span>
                            <span className="badge bg-secondary ms-2">
                                {isNaN(percentChange) ? '0' : getPercent(percentChange)}
                            </span>
                        </button>
                        {active &&
                            <ModalWindow
                                active={active}
                                setActive={setActive}
                                checkPortfolio={true}
                            >
                                {
                                    items.length > 0

                                        ?

                                        <table className="table table-bordered">
                                            <thead>
                                                <tr className="text-center">
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map(item => (
                                                    <tr className="text-center" key={item.id}>
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
                                        <h1 className="text-center">Portfolio is empty</h1>
                                }
                            </ModalWindow>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
