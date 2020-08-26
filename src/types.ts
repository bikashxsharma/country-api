// Action types
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES'
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS'
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE'

export const REMOVE_COUNTRY_FROM_CART = 'REMOVE_COUNTRY_FROM_CART'
export const ADD_COUNTRY_TO_CART = 'ADD_COUNTRY_TO_CART'

export const FILTER_COUNTRY = 'FILTER_COUNTRY'
export const SORT_COUNTRY = 'SORT_COUNTRY'

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'

export const CHANGE_THEME = 'CHANGE_THEME'

// Country

export type Country = []

// for drawer UI
export type Anchor = 'left' | 'right'
export type ToggleDrawerAction = {
  type: typeof TOGGLE_DRAWER
  payload: {
    direction: Anchor
    isOpen: boolean
  }
}

export type ChangeThemeAction = {
  type: typeof CHANGE_THEME
  payload: string
}

export type FetchAllCountriesAction = {
  type: typeof FETCH_COUNTRIES
  payload?: ''
}

export type FetchAllCountriesSuccessAction = {
  type: typeof FETCH_COUNTRIES_SUCCESS
  payload: Country
}
export type FetchAllCountriesFailureAction = {
  type: typeof FETCH_COUNTRIES_FAILURE
  payload: string
}

export type AddCountryToCartAction = {
  type: typeof ADD_COUNTRY_TO_CART
  payload: object
}
export type RemoveCountryFromCartAction = {
  type: typeof REMOVE_COUNTRY_FROM_CART
  payload: object
}
export type FilterCountry = {
  type: typeof FILTER_COUNTRY
  payload: string
}
export type SortCountry = {
  type: typeof SORT_COUNTRY
  payload: Country
}

export type CountryActions =
  | AddCountryToCartAction
  | RemoveCountryFromCartAction
  | FetchAllCountriesAction
  | FetchAllCountriesFailureAction
  | FetchAllCountriesSuccessAction
  | FilterCountry
  | SortCountry

export type DrawerAction = ToggleDrawerAction

// export type CountryState = {
//   countries: Country
// }

// App state should be the global state which is defined in the combineReducer
export type AppState = {
  country: CountryState
  cart: CartState
  drawer: DrawerState
  theme: ThemeState
}
export type CartCountry = {}
export type CartState = {
  cart: CartCountry[]
}

export type CountryState = {
  countries: []
  isLoading: boolean
  error?: string
}

export type DrawerState = {
  drawers: {
    left: boolean
    right: boolean
  }
}

export type ThemeState = {
  theme: string
}
