import * as API from '../API'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const fetchCategories = () => {
  return dispatch => {
    API.getCategories().then(response => {
      dispatch({ type: FETCH_CATEGORIES, categories: response.data.categories })
    })
  }
}
