import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import cryptosReducer from "./reducers/cryptosReducer/index";
import cryptoReducer from "./reducers/cryptoReducer/index";
import historyCryptoReducer from "./reducers/historyReducer/index";
import portfolioReducer from "./reducers/portfolioReducer/index";
import headerReducer from "./reducers/headerReducer/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    cryptos: cryptosReducer,
    crypto: cryptoReducer,
    cryptoHistory: historyCryptoReducer,
    portfolio: portfolioReducer,
    headerCrypto: headerReducer

})


const portfolioItems = localStorage.getItem("portfolioItems")
  ? JSON.parse(localStorage.getItem("portfolioItems"))
  : [];
const initState = { portfolio: {items: portfolioItems } };


export const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)))
