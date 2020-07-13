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

export const createNote = (note) => {
  return {
    type: ActionTypes.CREATE_NOTE,
    note
  }
}

export const updateNote = (note) => {
  return {
    type: ActionTypes.UPDATE_NOTE,
    note
  }
}

export const getFilteredNoteList = (searchQuery) => {
  return {
    type: ActionTypes.GET_FILTERED_NOTE_LIST,
    searchQuery
  }
}

export const clearSearchQuery = () => {
  return {
    type: ActionTypes.CLEAR_SEARCH_QUERY
  }
}