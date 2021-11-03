import {SET_IS_FETCHING_HISTORY,SET_FETCH_ERROR_HISTORY,SET_HISTORY_DATA} from '../../constants/index'

const defaultState = {
    historyData: [],
    isFetchingHistory: true,
    isFetchingHistoryError: false,

}


export default function historyCryptoReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_HISTORY_DATA:
            return {
                ...state,
                historyData: action.payload,
                    isFetching: false
            }
            case SET_IS_FETCHING_HISTORY:
                return {
                    ...state,
                    isFetchingHistory: action.payload
                }
                case SET_FETCH_ERROR_HISTORY:
                    return {
                        ...state,
                        isFetchError: action.payload
                    }
                    default:
                        return state
    }

}


export const setHistoryData = (history) => ({
    type: SET_HISTORY_DATA,
    payload: history
})
export const setIsFetchingHistory = (bool) => ({
    type: SET_IS_FETCHING_HISTORY,
    payload: bool
})
export const setFetchErrorHistory = (bool) => ({
    type: SET_FETCH_ERROR_HISTORY,
    payload: bool
})
