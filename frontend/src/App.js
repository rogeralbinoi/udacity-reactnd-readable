import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Category from './containers/Category'
import CreatePost from './containers/CreatePost'
import Post from './containers/Post'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Category} />
      <Route exact path="/create-post/" render={() => <CreatePost />} />
      <Route exact path="/:category/:id" component={Post} />
      <Route exact path="/:category" component={Category} />
    </Switch>
  </BrowserRouter>
)

export default App
