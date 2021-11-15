import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paginate, AlertComponent, Loader, ModalWindow, EnterComponent} from '../../components'
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
                                <EnterComponent
                                    name={currency.name}
                                    price={currency.priceUsd}
                                    setQuantity={setQuantity}
                                    quantity={quantity}
                                />
                            </ModalWindow>}
                        <div className="table__container">
                            <table className="table__info">
                                <thead className="table__info-head">
                                    <tr className="table__info-headrow">
                                        <th className="table__info-headcell">ID</th>
                                        <th className="table__info-headcell">Rank</th>
                                        <th className="table__info-headcell">Symbol</th>
                                        <th className="table__info-headcell">Name</th>
                                        <th className="table__info-headcell">Price</th>
                                        <th className="table__info-headcell">Add</th>
                                    </tr>
                                </thead>
                                <tbody className="table__info-body">
                                    {cryptos.map(item => (
                                        <tr
                                            className="table__info-bodyrow"
                                            key={item.id}
                                            onClick={() => history.push(`/crypto/${item.id}`)}
                                        >
                                            <td className="table__info-bodycell">{item.id}</td>
                                            <td className="table__info-bodycell">{item.rank}</td>
                                            <td className="table__info-bodycell">{item.symbol}</td>
                                            <td className="table__info-bodycell">{item.name}</td>
                                            <td className="table__info-bodycell">{getCurrency(item.priceUsd)}</td>
                                            <td  
                                                onClick={(e) => currencyHandler(e, item)}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </td >
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
