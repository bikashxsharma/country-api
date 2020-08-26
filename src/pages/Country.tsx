import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import Appbar from '../components/Appbar/Appbar'
import { fetchAllCountries } from '../redux/actions'
import { AppState } from '../types'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import './country.scss'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
})
type CountryState = {
  name: String
  population: String
  region: String
  flag: String
  languages: [{}]
  capital: String
  nativeName: String
}

export default function Country() {
  const { name } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const countries = useSelector((state: AppState) => state.country.countries)
  const dispatch = useDispatch()

  const [paramCountry, setParamCountry] = useState(Object)

  useEffect(() => {
    dispatch(fetchAllCountries())
    const filteredCountry = countries.find(
      (country: CountryState) =>
        country.name.toLowerCase() === name.toLowerCase()
    )
    setParamCountry(filteredCountry)
  }, [countries, dispatch, name])

  return (
    <>
      <Appbar />

      {paramCountry && (
        <div className="country-card">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={`Flag of ${paramCountry.name}`}
                height="140"
                image={paramCountry.flag}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {paramCountry.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                  Population:{' '}
                  <span className="country-card-subtext">
                    {paramCountry.population?.toLocaleString('en')}
                  </span>
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                  Region:
                  <span className="country-card-subtext">
                    {paramCountry.region}
                  </span>
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                  Native name:
                  <span className="country-card-subtext">
                    {paramCountry.nativeName}
                  </span>
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                  Capital:{' '}
                  <span className="country-card-subtext">
                    {paramCountry.capital}
                  </span>
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                  Languages:{' '}
                  {paramCountry.languages?.map((language: any, id: number) => (
                    <ul key={id}>
                      <li>
                        <span className="country-card-subtext">
                          {language.name}
                        </span>
                      </li>
                    </ul>
                  ))}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="text"
                onClick={() => history.goBack()}
              >
                Back to mainpage
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  )
}
