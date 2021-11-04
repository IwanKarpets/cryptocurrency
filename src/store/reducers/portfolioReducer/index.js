import {ADD_TO_PORTFOLIO,REMOVE_FROM_PORTFOLIO,SET_IS_ADDED} from '../../constants/index'



export default function portfolioReducer(state = {}, action) {
  switch (action.type) {
    case ADD_TO_PORTFOLIO:
      return {
        ...state, items: action.payload.items
      };
    case REMOVE_FROM_PORTFOLIO:
      return {
        ...state, items: action.payload.items
      };
    case SET_IS_ADDED:
      return {
        ...state, isAdded: action.payload
      }
        default:
          return state;
  }

}
