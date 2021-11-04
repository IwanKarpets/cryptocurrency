import React from 'react'
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
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                        key={page}
                        onClick={() => pageHandler(page)}
                    >
                        <span className="page-link link">{page}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Paginate
