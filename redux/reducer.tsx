import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  data:  [],
  cart:  [],
  search: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case actionTypes.SEARCH:
      return {
        ...state,
        ...{ search: action.payload },
      }
    case actionTypes.DATA:
      return {
        ...state,
        ...{ data: action.payload },
      }
    case actionTypes.CART:
      return {
        ...state,
        ...{ cart: action.payload },
      }

    default:
      return state
  }
}

export default reducer
