import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_SUCCESS,
  FILTER_COUNTRY,
  SORT_COUNTRY,
  CountryState,
  CountryActions,
} from '../../types'

const initState: CountryState = {
  countries: [],
  isLoading: false,
  error: '',
}

// notice the return type added to the function, without the return type typescript will complain while creating store in store.ts file.
export default function country(
  state: CountryState = initState,
  action: CountryActions
): CountryState {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
        error: '',
      }
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        countries: [],
        error: action.payload,
      }
    case FILTER_COUNTRY: {
      const name = action.payload
      const filteredCountries = state.countries.filter((country: any) =>
        country.name.toLowerCase().startsWith(name.toLowerCase())
      )
      if (filteredCountries.length > 0) {
        const finalResult: any = [...filteredCountries]
        return {
          ...state,
          countries: finalResult,
          error: '',
        }
      } else {
        return {
          ...state,
          countries: [],
          error: 'Country does not exist in our database',
        }
      }
    }
    case SORT_COUNTRY: {
      const sortList: any = [...action.payload]
      return {
        ...state,
        countries: sortList,
      }
    }

    default:
      return state
  }
}
