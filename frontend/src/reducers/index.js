import { combineReducers } from 'redux'
import categories from './categories'
import messages from './messages'
import posts from './posts'
import post from './post'

export default combineReducers({ categories, posts, post, messages })
