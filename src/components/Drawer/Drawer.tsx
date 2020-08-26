import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { Anchor, AppState } from '../../types'
import {
  toggleDrawer,
  removeCountryFromCart,
  changeTheme,
} from '../../redux/actions'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import DeleteIcon from '@material-ui/icons/Delete'

import './Drawer.scss'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

interface DrawersProps {
  anchorDirection: Anchor
}

export default function SideDrawer({ anchorDirection }: DrawersProps) {
  const classes = useStyles()
  const anchorLeft = 'left'
  const anchorRight = 'right'
  // from redux
  const dispatch = useDispatch()

  const drawers = useSelector((state: AppState) => state.drawer.drawers)
  const cartItems = useSelector((state: AppState) => state.cart.cart)

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'left' || anchor === 'right',
      })}
      role="presentation"
      onKeyDown={() => dispatch(toggleDrawer(anchor, false))}
    >
      <div className="drawer-cart">
        <List className="drawerList__panel">
          <ListItem>
            {anchor === anchorLeft && 'SWITCH THEME'}
            {anchor === anchorRight && 'FLAGS CART'}
          </ListItem>
          <IconButton onClick={() => dispatch(toggleDrawer(anchor, false))}>
            {anchor === anchorLeft && <ChevronLeftIcon />}
            {anchor === anchorRight && <ChevronRightIcon />}
          </IconButton>
        </List>
        {anchor === anchorLeft && (
          <List>
            <ListItem
              className="color-yellow"
              onClick={() => dispatch(changeTheme('#f2aa26'))}
            >
              <Button>Yellow</Button>
            </ListItem>
            <ListItem
              className="color-blue"
              onClick={() => dispatch(changeTheme('#3f51b5'))}
            >
              <Button>Blue</Button>
            </ListItem>
            <ListItem
              className="color-purple"
              onClick={() => dispatch(changeTheme('#9c27b0'))}
            >
              <Button>Purple</Button>
            </ListItem>
          </List>
        )}
        {anchor === anchorRight && cartItems.length <= 0 && (
          <List>
            <ListItem>
              <h2>Nothing in the cart</h2> <br />
            </ListItem>
          </List>
        )}
        {anchor === anchorRight &&
          cartItems &&
          cartItems.map((country: any, id) => (
            <List className="cart-item" key={id}>
              <ListItem button>
                <ul key={id}>
                  <li>
                    <img
                      src={country.flag}
                      width="100px"
                      height="40px"
                      alt={`Flag of ${country.name}`}
                    />
                    <span>{country.name}</span>
                    <DeleteIcon
                      onClick={() => dispatch(removeCountryFromCart(country))}
                    />
                  </li>
                </ul>
              </ListItem>
            </List>
          ))}
        <Divider />
      </div>
    </div>
  )

  return (
    <Drawer
      anchor={anchorDirection}
      open={drawers[anchorDirection]}
      onClose={() => dispatch(toggleDrawer(anchorDirection, false))}
    >
      {list(anchorDirection)}
    </Drawer>
  )
}
