import React,{ useEffect, useState } from 'react'
import { Container, Row, Col, Button, InputGroup, FormControl, CardGroup, Card, Badge } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import { getCrypto, getHistoryData, addToPortfolio } from '../../src/store/actions/actions'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrency } from '../helpers/helpers' 
import { ModalWindow, AlertComponent, Loader, LineChart } from '../components'


const CryptoDetails = () => {
    const [quantity, setQuantity] = useState(0)
    const [active, setActive] = useState(false)
    const { coinId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { crypto, isFetching } = useSelector(state => state.crypto)
    const { historyData, isFetchingHistory } = useSelector(state => state.cryptoHistory)
    const { items, isAdded, isFetchError } = useSelector(state => state.portfolio)



    useEffect(() => {
        dispatch(getCrypto(coinId))
    }, [dispatch, coinId])

    useEffect(() => {
        dispatch(getHistoryData(coinId))
    }, [dispatch, coinId])


    const addToPortfolioItems = (e) => {
        e.preventDefault()
        let cryptoCurrObj = { ...crypto, quantity }
        dispatch(addToPortfolio(items, cryptoCurrObj))
        setQuantity(0)
        setActive(false)
    }


    return (

        <Container>
            <Row>
                <Col className="col-12">
                    <h1 className="text-center d-none d-sm-block">Crypto Detail</h1>
                    <Row>
                        <Col>
                            {isAdded && <AlertComponent varinat='success' title='This cryptocurrency already added' />}
                            {isFetchError && <AlertComponent variant='danger' title='Value cannot be equality or less than null' />}
                            {isFetching

                                ?
                                <Loader />
                                :
                                <CardGroup className="mb-3 d-none d-sm-block d-md-flex">
                                    <Card className="ms-2 rounded box-shadow bg-primary bg-gradient">
                                        <Card.Body className="text-center d-flex-column justify-content-center align-items-center">
                                            <span>Name</span>
                                            <hr />
                                            <span>{crypto.name}</span>
                                        </Card.Body>
                                    </Card>
                                    <Card className="ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <Card.Body className="text-center d-flex-column justify-content-center align-items-center">
                                            <span>Rank</span>
                                            <hr />
                                            <span>{crypto.rank}</span>
                                        </Card.Body>
                                    </Card>
                                    <Card className="ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <Card.Body className="text-center d-flex-column justify-content-center align-items-center">
                                            <span>Symbol</span>
                                            <hr />
                                            <span>{crypto.symbol} </span>
                                        </Card.Body>
                                    </Card>
                                    <Card className="ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <Card.Body className="text-center d-flex-column justify-content-center align-items-center">
                                            <span>Price</span>
                                            <hr />
                                            <span>{isNaN(crypto.priceUsd) ? 0 : getCurrency(crypto.priceUsd)}</span>
                                        </Card.Body>
                                    </Card>
                                    <Card className="ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <Card.Body className="text-center d-flex-column justify-content-center align-items-center">
                                            <span>Supply</span>
                                            <hr />
                                            <span>{isNaN(crypto.supply) ? 0 : Number(crypto.supply).toFixed(2)}</span>
                                        </Card.Body>
                                    </Card>
                                    <Card className="ms-2 border rounded box-shadow bg-primary bg-gradient">
                                        <Card.Body className="text-center d-flex-column justify-content-center align-items-center">
                                            <span>website</span>
                                            <hr />
                                            <span>
                                                <a className="text-decoration-none link-light" href={crypto.explorer}>Link</a>
                                            </span>
                                        </Card.Body>
                                    </Card>
                                </CardGroup>}
                            <div className="text-center">
                                <Button
                                    className="me-2"
                                    variant="primary"
                                    onClick={() => setActive(true)}
                                >
                                    Add Cryptocurrency
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => history.goBack('/')}
                                >
                                    Back
                                </Button>
                            </div>
                            {active && <ModalWindow
                                active={active}
                                setActive={setActive}
                                title="Buy CryptoCurrency!"
                                addToPortfolioItems={addToPortfolioItems}
                            >
                                <h3 className="d-flex justify-content-between align-items-center">
                                    <span>{crypto.name}</span><Badge bg="primary">{getCurrency(crypto.priceUsd)}</Badge>
                                </h3>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Enter quantity!</InputGroup.Text>
                                    <FormControl
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                    />
                                </InputGroup>
                            </ModalWindow>}
                        </Col>
                    </Row>
                </Col>
                <Col className="col-12">
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
                </Col>
            </Row>
        </Container>
    )
}

export default CryptoDetails
