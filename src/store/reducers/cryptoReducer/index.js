import { SET_IS_FETCHING,SET_FETCH_ERROR,SET_CRYPTO } from '../../constants/index'

const defaultState = {
    crypto: {},
    isFetching: true,
    isFetchError: false,
}


export default function cryptoReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CRYPTO:
            return {
                ...state,
                crypto: action.payload,
                    isFetching: false
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_FETCH_ERROR:
            return {
                ...state,
                isFetchError: action.payload
            }
                default:
                    return state
    }
}


export const setCrypto = (crypto) => ({
    type: SET_CRYPTO,
    payload: crypto
})
export const setIsFetchingCrypto = (bool) => ({
    type: SET_IS_FETCHING,
    payload: bool
})
export const setFetchErrorCrypto = (bool) => ({
    type: SET_FETCH_ERROR,
    payload: bool
})