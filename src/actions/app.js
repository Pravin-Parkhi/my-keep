import ActionTypes from '../action-types/index'

export const setAppTheme = () => {
    return {
        type: ActionTypes.SET_APP_THEME
    }
}

export const setSideBarVisibility = () => {
  return {
    type: ActionTypes.SET_SIDE_BAR_VISIBILITY
  }
}

export const getNoteList = () => {
  return {
    type: ActionTypes.GET_NOTE_LIST
  }
}