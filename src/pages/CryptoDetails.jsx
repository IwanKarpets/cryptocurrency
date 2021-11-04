import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getCrypto, getHistoryData, addToPortfolio } from '../../src/store/actions/actions'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrency } from '../helpers/helpers'
import { ModalWindow, AlertComponent, Loader, LineChart } from '../components'


const CryptoDetails = () => {
    const [quantity, setQuantity] = useState(0)
    const [active, setActive] = useState(false)
    const [error, setError] = useState(false)
    const { coinId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { crypto, isFetching } = useSelector(state => state.crypto)
    const { historyData, isFetchingHistory } = useSelector(state => state.cryptoHistory)
    const { items, isAdded } = useSelector(state => state.portfolio)

    useEffect(() => {
        dispatch(getCrypto(coinId))
    }, [dispatch, coinId])

    useEffect(() => {
        dispatch(getHistoryData(coinId))
    }, [dispatch, coinId])


    const addToPortfolioItems = (e) => {
        if (quantity === 0 || quantity < 0 || quantity === '') {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        } else {
            e.preventDefault()
            let cryptoCurrObj = { ...crypto, quantity }
            dispatch(addToPortfolio(items, cryptoCurrObj))
            setQuantity(0)
            setActive(false)
            setError(false)
        }

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center d-none d-sm-block">Crypto Detail</h1>
                    <div className="row">
                        <div className="col">
                            {isAdded && <AlertComponent variant='success' title='This cryptocurrency already added' />}
                            {isFetching
                                ?
                                <Loader />
                                :
                                <div className="card-group mb-3 d-none d-sm-block d-md-flex">
                                    <div className="card ms-2 rounded box-shadow bg-primary bg-gradient">
                                        <div className="card-body text-center d-flex-column justify-content-center align-items-center">
                                            <span>Name</span>
                                            <hr />
                                            <span>{crypto.name}</span>
                                        </div>
                                    </div>
                                    <div className="card ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <div className="card-body text-center d-flex-column justify-content-center align-items-center">
                                            <span>Rank</span>
                                            <hr />
                                            <span>{crypto.rank}</span>
                                        </div>
                                    </div>
                                    <div className="card ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <div className="card-body text-center d-flex-column justify-content-center align-items-center">
                                            <span>Symbol</span>
                                            <hr />
                                            <span>{crypto.symbol} </span>
                                        </div>
                                    </div>
                                    <div className="card ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <div className="card-body text-center d-flex-column justify-content-center align-items-center">
                                            <span>Price</span>
                                            <hr />
                                            <span>{isNaN(crypto.priceUsd) ? 0 : getCurrency(crypto.priceUsd)}</span>
                                        </div>
                                    </div>
                                    <div className="card ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <div className="card-body text-center d-flex-column justify-content-center align-items-center">
                                            <span>Supply</span>
                                            <hr />
                                            <span>{isNaN(crypto.supply) ? 0 : Number(crypto.supply).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="card ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <div className="card-body text-center d-flex-column justify-content-center align-items-center">
                                            <span>website</span>
                                            <hr />
                                            <span>
                                                <a className="text-decoration-none link-light" href={crypto.explorer}>Link</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>}
                            <div className="text-center">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => setActive(true)}
                                >
                                    Add Cryptocurrency
                                </button>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => history.goBack('/')}
                                >
                                    Back
                                </button>
                            </div>
                            <ModalWindow
                                active={active}
                                setActive={setActive}
                                title="Buy CryptoCurrency!"
                                addToPortfolioItems={addToPortfolioItems}
                            >
                                {error && <AlertComponent variant='danger' title='Value cannot be equality or less than null' />}
                                <h3 className="d-flex justify-content-between align-items-center">
                                    <span>{crypto.name}</span><span className="badge bg-primary">{isNaN(crypto.priceUsd) ? 0 : getCurrency(crypto.priceUsd)}</span>
                                </h3>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Enter quantity!</span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                    />
                                </div>
                            </ModalWindow>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {
                        isFetchingHistory
                            ?
                            <Loader />
                            :
                            <>
                                <h1 className="text-center"> Crypto chart</h1>
                                <LineChart coinHistory={historyData} />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CryptoDetails
