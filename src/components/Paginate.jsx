import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage } from '../store/reducers/cryptosReducer/index'
import { getCryptos } from "../store/actions/actions"

const Paginate = () => {

    const { totalCount, currentPage, limit } = useSelector(state => state.cryptos)
    const pagesCount = Math.ceil(totalCount / limit)
    const dispatch = useDispatch()
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const pageHandler = (page) => {
        dispatch(setCurrentPage(page))
        dispatch(getCryptos((page - 1) * 10))
    }

    return (
        <div className="paginate">
            <Pagination>
                {pages.map((page, index) => (
                    <Pagination.Item
                        key={page} active={currentPage === page}
                        onClick={() => pageHandler(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
}

export default Paginate
