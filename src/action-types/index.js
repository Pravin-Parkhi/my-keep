import { zipObject } from 'lodash'

const ACTION_TYPES = [
  'SET_APP_THEME',
  'SET_SIDE_BAR_VISIBILITY',

  'GET_NOTE_LIST'
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)