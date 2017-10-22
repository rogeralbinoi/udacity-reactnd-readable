import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducers'

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), applyMiddleware(logger))
)

export default store
