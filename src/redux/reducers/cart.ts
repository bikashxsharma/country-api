import {
  REMOVE_COUNTRY_FROM_CART,
  ADD_COUNTRY_TO_CART,
  CartState,
  CountryActions,
} from '../../types'

const initState: CartState = {
  cart: [],
}

// notice the return type added to the function, without the return type typescript will complain while creating store in store.ts file.
export default function cart(
  state: CartState = initState,
  action: CountryActions
): CartState {
  switch (action.type) {
  case ADD_COUNTRY_TO_CART: {
    const country = action.payload
    return {
      ...state,
      cart: [...state.cart, country],
    }
  }
  case REMOVE_COUNTRY_FROM_CART: {
    const country = action.payload
    const tempCart = [...state.cart]
    tempCart.splice(tempCart.indexOf(country), 1)
    return {
      ...state,
      cart: [...tempCart],
    }
  }

  default:
    return state
  }
}
