import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/Home'
import Category from './containers/Category'
import CreatePost from './containers/CreatePost'
import Post from './containers/Post'

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/category/:name" render={() => <Category />} />
      <Route exact path="/create-post/" render={() => <CreatePost />} />
      <Route exact path="/post/:id" render={() => <Post />} />
    </div>
  </BrowserRouter>
)

export default App
