import { CHANGE_THEME, ChangeThemeAction } from '../../types'

export function changeTheme(color: string): ChangeThemeAction {
  return {
    type: CHANGE_THEME,
    payload: color,
  }
}
