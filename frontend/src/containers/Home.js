import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Header from '../components/Header'
import MenuCategories from '../components/MenuCategories'
import { fetchCategories } from '../actions'

class Home extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  render() {
    return [
      <Header key="header">
        <Container>Readable</Container>
      </Header>,
      <Container key="main">
        <MenuCategories categories={this.props.categories} />
      </Container>
    ]
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
