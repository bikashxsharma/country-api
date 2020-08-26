import React from 'react'
import { useSelector } from 'react-redux'
import Routes from './Routes'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import { AppState } from './types'

import './app.scss'

export default function App() {
  const themeColor = useSelector((state: AppState) => state.theme.theme)

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: themeColor || '#f2aa26',
        dark: '#f09c01',
      },
      secondary: {
        main: '#11cb5f',
      },
      text: {
        primary: '#373585',
        secondary: '#a4a6b3',
      },
      background: {
        default: '#f7f8fc',
      },
    },
    typography: {
      fontFamily: 'Muli, sans- serif',
      fontWeightBold: 700,
      fontWeightMedium: 600,
      fontWeightRegular: 400,
      htmlFontSize: 8,
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Routes />
      </div>
    </ThemeProvider>
  )
}
