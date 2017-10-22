import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Header from '../components/Header'
import * as API from '../API'

class Home extends Component {
  componentDidMount() {
    API.getCategories().then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <Header>
        <Container>Readable</Container>
      </Header>
    )
  }
}

export default Home
