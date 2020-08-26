import { combineReducers } from 'redux'

import country from './country'
import cart from './cart'
import drawer from './drawer'
import theme from './theme'

const createRootReducer = () =>
  combineReducers({
    country,
    cart,
    drawer,
    theme,
  })

export default createRootReducer
