import { zipObject } from 'lodash'

const ACTION_TYPES = [
  'SET_APP_THEME_COLOR',
  'SET_SIDE_BAR_VISIBILITY'
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)