import { CHANGE_THEME, ChangeThemeAction, ThemeState } from '../../types'

const initState: ThemeState = {
  theme: '#f2aa26',
}

export default function theme(
  state: ThemeState = initState,
  action: ChangeThemeAction
): ThemeState {
  switch (action.type) {
  case CHANGE_THEME: {
    return {
      ...state,
      theme: action.payload,
    }
  }
  default:
    return state
  }
}
