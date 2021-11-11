import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paginate, AlertComponent, Loader, ModalWindow, } from '../../components'
import { getCryptos, addToPortfolio } from '../../store/actions/actions'
import { getCurrency } from '../../helpers/helpers'
import { useHistory } from 'react-router-dom'
import './Main.scss';



const Main = () => {
    const [quantity, setQuantity] = useState(0)
    const [active, setActive] = useState(false)
    const [error, setError] = useState(false)
    const [currency, setCurrency] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const { cryptos, isFetching } = useSelector(state => state.cryptos)
    const { items, isAdded } = useSelector(state => state.portfolio)

    const addToPortfolioItems = (e) => {
        if (quantity === 0 || quantity < 0 || quantity === '') {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        } else {
            e.preventDefault()
            let cryptoCurrObj = { ...currency, quantity }
            dispatch(addToPortfolio(items, cryptoCurrObj))
            setQuantity(0)
            setActive(false)
            setError(false)
        }
    }


    const currencyHandler = (e, currency) => {
        e.stopPropagation()
        setCurrency(currency)
        setActive(true)

    }

    useEffect(() => {
        dispatch(getCryptos())
    }, [dispatch])



    return (
        <section className="currency">
            <div className="container">
                {isFetching
                    ?
                    <Loader />
                    :
                    <>
                        {isAdded && <AlertComponent variant='success' title='This cryptocurrency already added' />}
                        {currency &&
                            <ModalWindow
                                active={active}
                                setActive={setActive}
                                title="Buy CryptoCurrency!"
                                addToPortfolioItems={addToPortfolioItems}
                                checkPortfolio={false}
                            >
                                {error && <AlertComponent variant='danger' title='Value cannot be equality or less than null' />}
                                <h3 className="currency__info">
                                    <span className="currency__info--name">
                                        {currency.name}
                                    </span>
                                    <span className="currency__info--name">
                                        {isNaN(currency.priceUsd) ? 0 : getCurrency(currency.priceUsd)}
                                    </span>
                                </h3>
                                <div className="block__enter">
                                    <span className="enter__text">Enter Quantity</span>
                                    <input className="enter__input"
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                        placeholder="Enter quantity"
                                    />
                                </div>
                            </ModalWindow>}
                        <div className="table__container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Rank</th>
                                        <th>Symbol</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Add</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cryptos.map(item => (
                                        <tr
                                            key={item.id}
                                            onClick={() => history.push(`/crypto/${item.id}`)}
                                        >
                                            <td>{item.id}</td>
                                            <td>{item.rank}</td>
                                            <td>{item.symbol}</td>
                                            <td>{item.name}</td>
                                            <td>{getCurrency(item.priceUsd)}</td>
                                            <td
                                                onClick={(e) => currencyHandler(e, item)}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                }

                <Paginate />
            </div>
        </section>
    )
}

export default Main
