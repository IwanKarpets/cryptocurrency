import {SET_CRYPTOS_HEADER,SET_IS_FETCHING_HEADER,SET_FETCH_ERROR_HEADER} from '../../constants/index'

const defaultState = {
    headerItems: [],
    isFetching: true,
    isFetchError: false,
}


export default function headerReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CRYPTOS_HEADER:
            return {
                ...state,
                headerItems: action.payload,
                    isFetching: false
            }
        case SET_IS_FETCHING_HEADER:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_FETCH_ERROR_HEADER:
            return {
                ...state,
                isFetchError: action.payload
            }
        default:
            return state
    }
}

export const setCryptosHeader = (cryptos) => ({
    type: SET_CRYPTOS_HEADER,
    payload: cryptos
})
export const setIsFetchingHeader = (bool) => ({
    type: SET_IS_FETCHING_HEADER,
    payload: bool
})
export const setFetchErrorHeader = (bool) => ({
    type: SET_FETCH_ERROR_HEADER,
    payload: bool
})
