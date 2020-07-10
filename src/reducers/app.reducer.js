import ActionTypes from "../action-types/index"

const defaultState = {
  appThemeColor: 'red'
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case ActionTypes.SET_APP_THEME_COLOR: {
      return {
        ...state,
        appThemeColor: action.color
      }
    }

    default:
      return state
  }
};

export default appReducer;