import ActionTypes from "../action-types/index"

const defaultState = {
  appThemeColor: 'red',
  isSideBarCollapsed: true
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case ActionTypes.SET_APP_THEME_COLOR: {
      return {
        ...state,
        appThemeColor: action.color
      }
    }

    case ActionTypes.SET_SIDE_BAR_VISIBILITY: {
      debugger
      return {
        ...state,
        isSideBarCollapsed: !state.isSideBarCollapsed
      }
    }

    default:
      return state
  }
};

export default appReducer;