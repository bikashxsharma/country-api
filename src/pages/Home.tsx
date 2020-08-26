import React from 'react'

//import { Link } from 'react-router-dom'
import Appbar from '../components/Appbar/Appbar'
import CountryTable from '../containers/Table/CountryTable'

import './home.scss'

const Home = () => {
  return (
    <>
      <Appbar />
      <div className="home">
        <CountryTable />
      </div>
    </>
  )
}

export default Home
