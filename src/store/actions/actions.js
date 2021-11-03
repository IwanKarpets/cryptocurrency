import {setIsFetching,setCryptos} from '../reducers/cryptosReducer'
import {setCrypto,setIsFetchingCrypto,setFetchErrorCrypto} from '../reducers/cryptoReducer'
import {setHistoryData,setIsFetchingHistory,setFetchErrorHistory} from '../reducers/historyReducer'
import {setFetchErrorHeader,setIsFetchingHeader,setCryptosHeader} from '../reducers/headerReducer'
import API from '../../../src/utils/API'
import { ADD_TO_PORTFOLIO,REMOVE_FROM_PORTFOLIO,SET_IS_ADDED,SET_FETCH_ERROR} from '../constants/index'

export const getCryptos = (offset = 0) => async (dispatch) => {
    if (offset === 1) {
        offset = 0
    }
    try {
        dispatch(setIsFetching(true))
        const response = await API.get(`?limit=10&offset=${offset}`)
        dispatch(setCryptos(response.data.data))
    } catch (e) {
        dispatch(setIsFetching(false))
    }

}
export const getCrypto = (id) => async (dispatch) => {
    try {
        dispatch(setIsFetchingCrypto(true))
        const response = await API.get(`/${id}`)
        dispatch(setCrypto(response.data.data))
    } catch (e) {
        dispatch(setFetchErrorCrypto(true))
        dispatch(setIsFetchingCrypto(false))
        dispatch(setFetchErrorCrypto(false))
    }

}


export const getHistoryData = (id) => async (dispatch) => {
    //Для примера я взял прошлую неделю
    const start = Date.parse(new Date('18 oct 2021'))
    const end = Date.parse(new Date('24 oct 2021'))

    try {
        dispatch(setIsFetchingHistory(true))
        const response = await API.get(`/${id}/history?interval=d1&start=${start}&end=${end}`)
        dispatch(setHistoryData(response.data.data))
        dispatch(setIsFetchingHistory(false))
    } catch (e) {
        dispatch(setFetchErrorHistory(true))
        dispatch(setIsFetchingHistory(false))
        dispatch(setFetchErrorHistory(false))
    }
}


export const addToPortfolio = (items, currency) => (dispatch) => {
    let productAlreadyInCart = false;
    items.forEach((cp) => {
        if (cp.id === currency.id) {
            productAlreadyInCart = true;
            dispatch({
                type: SET_IS_ADDED,
                payload: true
            })
            setTimeout(() => {
                dispatch({
                    type: SET_IS_ADDED,
                    payload: false
                })
            }, 4000)

        }
    });

    if (!productAlreadyInCart) {
        if (currency.quantity === 0 || currency.quantity < 0 || currency.quantity === '') {
            dispatch({
                type: SET_FETCH_ERROR,
                payload: true
            })
            setTimeout(() => {
                dispatch({
                    type: SET_FETCH_ERROR,
                    payload: false
                })
            }, 5000)
        } else {
            items.push(currency);
        }

    }
    localStorage.setItem("portfolioItems", JSON.stringify(items));
    dispatch({
        type: ADD_TO_PORTFOLIO,
        payload: {
            items: items
        }
    });
};

export const removeFromPortfolio = (items, id) => (dispatch) => {
    const filterItems = items.slice().filter((a) => a.id !== id);
    localStorage.setItem("portfolioItems", JSON.stringify(filterItems));
    dispatch({
        type: REMOVE_FROM_PORTFOLIO,
        payload: {
            items: filterItems
        }
    });
};

export const getCryptosHeader = () => async (dispatch) => {
    try {
        dispatch(setIsFetchingHeader(true))
        const response = await API.get()
        dispatch(setCryptosHeader(response.data.data))
    } catch (e) {
        dispatch(setFetchErrorHeader(true))
        dispatch(setIsFetchingHeader(false))
        dispatch(setFetchErrorHeader(false))
    }

}
