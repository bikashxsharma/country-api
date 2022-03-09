import { Dispatch } from 'redux'
import axios from 'axios'

import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  SORT_COUNTRY,
  CountryActions,
  Country,
} from '../../types'

// action creator for country

export function fetchAllCountries(): CountryActions {
  return {
    type: FETCH_COUNTRIES,
  }
}

export function fetchAllCountriesSuccess(countries: []): CountryActions {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: countries,
  }
}
export function fetchAllCountriesFailure(error: any): CountryActions {
  return {
    type: FETCH_COUNTRIES_FAILURE,
    payload: error,
  }
}

export function sortCountries(sortList: Country): CountryActions {
  return {
    type: SORT_COUNTRY,
    payload: sortList,
  }
}

export function fetchCountries() {
  return (dispatch: Dispatch) => {
    dispatch(fetchAllCountries())
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countries = response.data
        dispatch(fetchAllCountriesSuccess(countries))
      })
      .catch((error) => {
        dispatch(fetchAllCountriesFailure(error))
      })
  }
}

export function filterCountries(name: string) {
  return (dispatch: Dispatch) => {
    dispatch(fetchAllCountries())
    let cName = ''
    if (name === '') {
      cName = 'v2/all'
    } else {
      cName = `v2/name/${name}`
    }
    axios
      .get(`https://restcountries.eu/rest/${cName}`)
      .then((response) => {
        const countries = response.data
        dispatch(fetchAllCountriesSuccess(countries))
      })
      .catch((error) => {
        dispatch(fetchAllCountriesFailure(error))
      })
  }
}
