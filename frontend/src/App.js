import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './containers/Home'
import Category from './containers/Category'
import CreatePost from './containers/CreatePost'
import Post from './containers/Post'

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/category" render={() => <Category />} />
      <Route exact path="/create-post" render={() => <CreatePost />} />
      <Route exact path="/post" render={() => <Post />} />
    </div>
  </BrowserRouter>
)

export default App
