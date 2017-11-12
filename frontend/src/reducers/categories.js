import { categoriesActions } from '../actions'
const { FETCH_CATEGORIES } = categoriesActions

const categories = (state = [], action = '') => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categories
