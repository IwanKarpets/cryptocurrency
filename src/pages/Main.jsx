import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paginate, AlertComponent, Loader, ModalWindow, } from '../components'
import { getCryptos, addToPortfolio } from '../store/actions/actions'
import { getCurrency } from '../../src/helpers/helpers'
import { useHistory } from 'react-router-dom'
import { AiFillPlusCircle } from 'react-icons/ai'


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
        <div className="container">
            <div className="row">
                {isFetching
                    ?
                    <Loader />
                    :
                    <div className="col-sm-12 col-md-12 col-lg-12">
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
                                <h3 className="d-flex justify-content-between align-items-center">
                                    <span>{currency.name}</span><span className="badge bg-primary">{isNaN(currency.priceUsd) ? 0 : getCurrency(currency.priceUsd)}</span>
                                </h3>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Enter quantity!</span>
                                    <input className="form-control"
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                    />
                                </div>
                            </ModalWindow>}
                        <table className="table">
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
                                            <AiFillPlusCircle />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Paginate />
                    </div>}
            </div>
        </div>
    )
}

export default Main
