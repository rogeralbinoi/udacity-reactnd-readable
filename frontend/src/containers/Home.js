import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'
import Header from '../components/Header'
import MenuCategories from '../components/MenuCategories'
import ListPosts from '../components/ListPosts'
import { fetchCategories, fetchPosts } from '../actions'
import { Link } from 'react-router-dom'

class Home extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }
  render() {
    return [
      <Header key="header">
        <Container>Readable</Container>
      </Header>,
      <Container key="main">
        <MenuCategories categories={this.props.categories} />
        <ListPosts posts={this.props.posts} />
      </Container>
    ]
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    fetchPosts: () => {
      dispatch(fetchPosts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
