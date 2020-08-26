import { TOGGLE_DRAWER, DrawerAction, Anchor } from '../../types'

export function toggleDrawer(anchor: Anchor, open: boolean): DrawerAction {
  return {
    type: TOGGLE_DRAWER,
    payload: {
      direction: anchor,
      isOpen: open,
    },
  }
}
