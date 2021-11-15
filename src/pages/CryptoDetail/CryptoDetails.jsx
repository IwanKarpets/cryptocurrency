import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getCrypto, getHistoryData, addToPortfolio } from '../../store/actions/actions'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrency } from '../../helpers/helpers'
import { ModalWindow, AlertComponent, Loader, LineChart, CardComponent, EnterComponent } from '../../components'
import './CryptoDetail.scss'


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
        <section className="crypto">
            <div className="container">
                <div className="crypto__info">
                    <div className="crypto__info-container">
                        <h1 className="crypto__info-title">Crypto Detail</h1>
                        {isAdded && <AlertComponent variant='success' title='This cryptocurrency already added' />}
                        {isFetching
                            ?
                            <Loader />
                            :
                            <div className="crypto__info-cards">
                                <CardComponent title="Name" text={crypto.name}/>
                                <CardComponent title="Rank" text={crypto.rank}/>
                                <CardComponent title="Symbol" text={crypto.symbol}/>
                                <CardComponent title="Price" text={isNaN(crypto.priceUsd) ? 0 : getCurrency(crypto.priceUsd)}/>
                                <CardComponent title="Supply" text={isNaN(crypto.supply) ? 0 : Number(crypto.supply).toFixed(2)}/>
                                <CardComponent title="Name">
                                    <a className="card__description-link" href={crypto.explorer}>Link</a>
                                </CardComponent>
                            </div>
                        }
                        <div className="crypto__button-container">
                            <button
                                className="crypto__button"
                                onClick={() => history.goBack('/')}
                            >
                                Back
                            </button>
                            <button
                                className="crypto__button"
                                onClick={() => setActive(true)}
                            >
                                Add To Portfolio
                            </button>
                        </div>
                        {<ModalWindow
                            active={active}
                            setActive={setActive}
                            title="Buy CryptoCurrency!"
                            addToPortfolioItems={addToPortfolioItems}
                            checkPortfolio={false}
                        >
                            {error && <AlertComponent variant='danger' title='Value cannot be equality or less than null' />}
                            <EnterComponent 
                                name={crypto.name}
                                price={crypto.priceUsd}
                                setQuantity={setQuantity}
                                quantity={quantity}
                                />
                        </ModalWindow>}
                    </div>
                    <div className="chart">
                        {
                            isFetchingHistory
                                ?
                                <Loader />
                                :
                                <>
                                    <h1 className="chart__title">
                                        Chart
                                    </h1>
                                    <div className="chart__container">
                                        <LineChart coinHistory={historyData} />
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CryptoDetails
