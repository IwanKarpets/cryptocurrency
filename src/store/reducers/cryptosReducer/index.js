import {SET_CRYPTOS, SET_IS_FETCHING, SET_CURRENT_PAGE} from '../../constants/index'

const defaultState = {
    cryptos: [],
    isFetching: true,
    totalCount:100,
    currentPage:1,
    isFetchError: false,
    limit:10
}


export default function cryptosReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CRYPTOS:
            return {
                ...state,
                cryptos: action.payload,
                isFetching: false
            }
            case SET_CURRENT_PAGE:
                return {
                    ...state,
                    currentPage: action.payload
                }

        default:
            return state
    }
}

export const setCryptos = (cryptos) => ({type:SET_CRYPTOS, payload:cryptos})
export const setIsFetching = (bool) => ({type:SET_IS_FETCHING, payload:bool})
export const setCurrentPage = (page) => ({type:SET_CURRENT_PAGE, payload:page})