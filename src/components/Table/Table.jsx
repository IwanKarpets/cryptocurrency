import React from 'react'
import './Table.scss'
import { useHistory } from 'react-router-dom'
import { getCurrency } from '../../helpers/helpers'

const Table = ({ data, modalHandler, icon }) => {
    const history = useHistory()
    return (
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
                    {data.map(item => (
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
                            {
                                icon
                                    ?

                                    <td
                                        className="table__info-bodycell"
                                        onClick={(e) => modalHandler(e, data, item.id)}
                                    >
                                        {icon}
                                    </td>

                                    :

                                    <td
                                        className="table__info-bodycell"
                                        onClick={(e) => modalHandler(e, item)}
                                    >
                                        <i className="fas fa-plus-circle"></i>
                                    </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
