import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage } from '../../store/reducers/cryptosReducer/index'
import { getCryptos } from "../../store/actions/actions"
import './Paginate.scss'

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
        <div className="pagination">
            <div className="pagination__block">
                <ul className="pagination__block_list">
                    {pages.map((page) => (
                        <li
                            className={currentPage === page ? 'pagination__block_item  pagination__block_item--active' : 'pagination__block_item'}
                            key={page}
                            onClick={() => pageHandler(page)}
                        >
                            <span>{page}</span>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default Paginate
