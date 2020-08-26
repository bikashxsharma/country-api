import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppState } from '../../types'
import { fetchCountries } from '../../redux/actions'
import { addCountryToCart } from '../../redux/actions'

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton'
import TableFooter from '@material-ui/core/TableFooter'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import IconButton from '@material-ui/core/IconButton'

import './CountryTable.scss'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    overflow: 'scrollY',
  },
})

interface CountryTableType {
  flag: string
  name: string
  languages: []
  population: number
  region: string
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
)

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}

// function for Table pagination - Material UI

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

// Country table Component with pagination
const CountryTable = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const countries = useSelector((state: AppState) => state.country.countries)
  const isLoading = useSelector((state: AppState) => state.country.isLoading)
  const cart = useSelector((state: AppState) => state.cart.cart)
  const [paginatedCountries, setPaginatedCountries] = useState([])

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  // for pagination
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    setPaginatedCountries(
      countries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    )
  }, [dispatch, countries, page, rowsPerPage])

  return (
    <TableContainer className="table-main" component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>Flags</TableCell>
            <TableCell>Name</TableCell>
            <TableCell className="mobile-hide">Languages</TableCell>
            <TableCell className="mobile-hide">Population</TableCell>
            <TableCell className="mobile-hide">Region</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading &&
            [...Array(7)].map((e: any, i: any) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width={100}
                    height={50}
                  />
                </TableCell>

                <TableCell>
                  <Skeleton width="20%" />
                </TableCell>

                <TableCell>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" width="20%" />
                  <Skeleton animation="wave" width="20%" />
                </TableCell>
                <TableCell>
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                  <Skeleton width="40%" />
                </TableCell>
                <TableCell>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width={40}
                    height={20}
                  />
                </TableCell>
              </TableRow>
            ))}
          {!isLoading &&
            paginatedCountries.map((country: any, id) => (
              <TableRow key={id}>
                <TableCell>
                  {!country.flag ? (
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width={100}
                      height={50}
                    />
                  ) : (
                    <img
                      src={country.flag}
                      width="100px"
                      height="50px"
                      alt={`Flag of ${country.name}`}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Link to={`/countries/${country.name}`}>{country.name} </Link>
                </TableCell>

                <TableCell className="mobile-hide">
                  {country.languages.map((language: any, id: number) => (
                    <ul key={id}>
                      <li>{language.name}</li>
                    </ul>
                  ))}
                </TableCell>
                <TableCell className="mobile-hide">
                  {country.population.toLocaleString('en')}
                </TableCell>
                <TableCell className="mobile-hide">{country.region}</TableCell>
                <TableCell>
                  {cart.filter((item: any) => item.name === country.name)
                    .length === 1 ? (
                      <Button variant="contained" color="primary" disabled>
                      Add
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => dispatch(addCountryToCart(country))}
                      >
                      Add
                      </Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={countries.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
export default CountryTable
