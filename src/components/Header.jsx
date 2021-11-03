import React,{useEffect, useState} from 'react'
import {Navbar, Nav, Container, ListGroup, Badge, Button, Table } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getCryptosHeader, removeFromPortfolio} from '../store/actions/actions'
import {getCurrency, getPercent} from '../../src/helpers/helpers'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillDelete} from 'react-icons/ai'
import {ModalWindow} from './index'


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
            <Navbar bg="primary">
                <Container>
                    <Nav className="mx-auto d-flex justify-content-between align-items-center">
                        <Nav.Link href="/">Home</Nav.Link>
                        <ListGroup horizontal className="d-none d-sm-none d-md-flex">
                            {popularCrypto.map(popular => (
                                <ListGroup.Item
                                    key={popular.id}
                                    as="li"
                                    className="d-flex py-0 justify-content-between align-items-center"
                                >
                                    <div className="ms-1">
                                        {popular.name}
                                    </div>
                                    <Badge variant="primary" className="ms-2" pill>
                                        {getCurrency(popular.priceUsd)}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button
                            className="d-flex justify-content-between align-items-center py-2 ms-2"
                            variant="outline-info"
                            onClick={() => setActive(true)}
                        >
                            <BsFillBriefcaseFill />
                            <Badge className="ms-2" bg="secondary">
                                {getCurrency(portfolioCurrency.reduce((acc, cur) => acc + (cur.priceUsd * cur.quantity), 0))}
                            </Badge>
                            <Badge className="ms-2" bg="secondary">
                                {getCurrency(difference) || 0}
                            </Badge>
                            <Badge className="ms-2" bg="secondary">
                                {isNaN(percentChange) ? '0' : getPercent(percentChange)}
                            </Badge>
                            <span className="visually-hidden">unread messages</span>
                        </Button>
                        {active &&
                            <ModalWindow
                                active={active}
                                setActive={setActive}
                                checkPortfolio={true}
                            >
                                {
                                    items.length > 0

                                        ?

                                        <Table striped bordered hover size="sm">
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
                                        </Table>
                                        :

                                        <h1 className="text-center">Portfolio is empty</h1>
                                }
                            </ModalWindow>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
