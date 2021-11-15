import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paginate, AlertComponent, Loader, ModalWindow, EnterComponent, Table} from '../../components'
import { getCryptos, addToPortfolio } from '../../store/actions/actions'
import './Main.scss';



const Main = () => {
    const [quantity, setQuantity] = useState(0)
    const [active, setActive] = useState(false)
    const [error, setError] = useState(false)
    const [currency, setCurrency] = useState(null)
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
                            <Table
                                data={cryptos}
                                modalHandler={currencyHandler}
                            />
                        
                    </>
                }

                <Paginate />
            </div>
        </section>
    )
}

export default Main
