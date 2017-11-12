import { categoriesActions } from '../actions'
const { FETCH_CATEGORIES } = categoriesActions

const initialState = {
  is_fetching: true,
  items: []
}

const categories = (state = initialState, action = '') => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, items: action.categories, is_fetching: false }
    default:
      return state
  }
}

export default categories
