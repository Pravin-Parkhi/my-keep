import ActionTypes from "../action-types/index"
import { MOCK_DATA } from "../mock-data";
import { deepCopy } from "../utils/object";
import { executeMagicalSearch } from "../utils/misc";

const defaultState = {
  isDarkMode: true,
  isSideBarCollapsed: true,
  globalSearchQuery: '',
  filteredNoteList: [],

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

    case ActionTypes.UPDATE_NOTE: {
      const updatedNote = action.note
      let noteListCopy = deepCopy(state.noteList)
      for(let noteIndx=0; noteIndx<noteListCopy.length; noteIndx++){
        const noteDetails = noteListCopy[noteIndx]
        if(noteDetails.id === updatedNote.id){
          noteListCopy.splice(noteIndx, 1, updatedNote)
          break
        }
      }

      return {
        ...state,
        noteList: noteListCopy
      }
    }

    case ActionTypes.DELETE_NOTE: {
      const noteToBeDeleted = action.note
      let noteListCopy = deepCopy(state.noteList)
      for(let noteIndx=0; noteIndx<noteListCopy.length; noteIndx++){
        const noteDetails = noteListCopy[noteIndx]
        if(noteDetails.id === noteToBeDeleted.id){
          noteListCopy.splice(noteIndx, 1)
          break
        }
      }

      return {
        ...state,
        noteList: noteListCopy
      }
    }

    case ActionTypes.GET_FILTERED_NOTE_LIST: {
      const searchQuery = action.searchQuery
      const filteredSearchResult = executeMagicalSearch(state.noteList, searchQuery)
      return {
        ...state,
        globalSearchQuery: searchQuery,
        filteredNoteList: filteredSearchResult
      }
    }

    case ActionTypes.CLEAR_SEARCH_QUERY: {
      return {
        ...state,
        globalSearchQuery: '',
        filteredNoteList: []
      }
    }

    default:
      return state
  }
};

export default appReducer;