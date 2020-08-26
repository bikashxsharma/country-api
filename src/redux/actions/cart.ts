import { REMOVE_COUNTRY_FROM_CART, ADD_COUNTRY_TO_CART } from '../../types'

// action creator for country

export function addCountryToCart(country: object | null) {
  return {
    type: ADD_COUNTRY_TO_CART,
    payload: country,
  }
}

export function removeCountryFromCart(country: object | null) {
  return {
    type: REMOVE_COUNTRY_FROM_CART,
    payload: country,
  }
}
