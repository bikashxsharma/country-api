import { TOGGLE_DRAWER, DrawerAction, DrawerState } from '../../types'

const initState: DrawerState = {
  drawers: {
    left: false,
    right: false,
  },
}

export default function drawer(
  state: DrawerState = initState,
  action: DrawerAction
): DrawerState {
  switch (action.type) {
  case TOGGLE_DRAWER: {
    const { direction, isOpen } = action.payload
    return {
      ...state,
      drawers: {
        ...state.drawers,
        [direction]: isOpen,
      },
    }
  }
  default:
    return state
  }
}
