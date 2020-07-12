import ActionTypes from "../action-types/index"
import { MOCK_DATA } from "../mock-data";

const defaultState = {
  isDarkMode: true,
  isSideBarCollapsed: true,

  noteList: MOCK_DATA
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case ActionTypes.SET_APP_THEME: {
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      }
    }

    case ActionTypes.SET_SIDE_BAR_VISIBILITY: {
      return {
        ...state,
        isSideBarCollapsed: !state.isSideBarCollapsed
      }
    }

    case ActionTypes.GET_NOTE_LIST: {
      return {
        ...state,
        noteList: state.noteList
      }
    }

    case ActionTypes.CREATE_NOTE: {
      return {
        ...state,
        noteList: [...state.noteList, action.note]
      }
    }

    default:
      return state
  }
};

export default appReducer;