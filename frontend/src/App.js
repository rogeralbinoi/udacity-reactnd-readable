import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Category from './containers/Category'
import CreatePost from './containers/CreatePost'
import Post from './containers/Post'
import styled from 'styled-components'

const WrapperApp = styled.div`
  .ui.menu {
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 590px) {
    .ui.menu {
      flex-direction: column;
    }
  }
`

const App = () => (
  <WrapperApp>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Category} />
        <Route exact path="/post/new" component={CreatePost} />
        <Route exact path="/post/:id" component={CreatePost} />
        <Route exact path="/:category/:id" component={Post} />
        <Route exact path="/:category" component={Category} />
      </Switch>
    </BrowserRouter>
  </WrapperApp>
)

export default App
