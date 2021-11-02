import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Container, Row, Col, Table, InputGroup,FormControl, Badge} from 'react-bootstrap'
import {Paginate, AlertComponent, Loader, ModalWindow, } from '../components'
import {getCryptos, addToPortfolio} from '../store/actions/actions'
import {getCurrency} from '../../src/helpers/helpers'
import {useHistory} from 'react-router-dom'
import {AiFillPlusCircle} from 'react-icons/ai'
 
const Main = () => {
    const [quantity, setQuantity] = useState(0)
    const [active, setActive] = useState(false)
    const [currency, setCurrency]= useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const {cryptos, isFetching} = useSelector(state=>state.cryptos)
    const {items, isAdded, isFetchError} = useSelector(state=>state.portfolio)
    
    

    const addToPortfolioItems=(e)=>{
        e.preventDefault()
        let cryptoCurrObj={...currency, quantity}
        dispatch(addToPortfolio(items, cryptoCurrObj))
        setQuantity(0)
        setActive(false)
        
    }


    

    const currencyHandler=(e,currency)=>{
        e.stopPropagation()
        setCurrency(currency)
        setActive(true)
    }
    
    useEffect(()=>{
        dispatch(getCryptos())
    },[dispatch])

    

    return (
        <Container>
            <Row>
                {isFetching 
                ? 
                <Loader/>
                :
                <Col xs={12} lg={12} md={12}>
                {isAdded && <AlertComponent varinat='success' title = 'This cryptocurrency already added'/>}
                {isFetchError && <AlertComponent variant='danger' title = 'Value cannot be equality or less than null' />}
                {currency && 
                    <ModalWindow 
                        active={active}
                        setActive={setActive}
                        title="Buy CryptoCurrency!"
                        addToPortfolioItems={addToPortfolioItems}
                        checkPortfolio={false}
                        >
                             <h3 className="d-flex justify-content-between align-items-center">
                                <span>{currency.name}</span><Badge bg="primary">{getCurrency(currency.priceUsd)}</Badge>
                            </h3>
                         <InputGroup className="mb-3">
                            <InputGroup.Text>Enter quantity!</InputGroup.Text>
                            <FormControl
                                type="number"
                                onChange={(e)=>setQuantity(e.target.value)}
                                value={quantity}
                            />
                        </InputGroup>
                    </ModalWindow>}
                <Table responsive="sm">
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
                        {cryptos.map(item=>(
                            <tr 
                                key={item.id}
                                onClick={()=>history.push(`/crypto/${item.id}`)}
                                >
                                <td>{item.id}</td>
                                <td>{item.rank}</td>
                                <td>{item.symbol}</td>
                                <td>{item.name}</td>
                                <td>{getCurrency(item.priceUsd)}</td>
                                <td>
                                    <AiFillPlusCircle
                                        onClick={(e)=>currencyHandler(e,item)}
                                    
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate/>
            </Col>}
        </Row>
    </Container>
    )
}

export default Main
