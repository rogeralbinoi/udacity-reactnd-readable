import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'semantic-ui-react'
import Header from '../components/Header'
import MenuCategories from '../components/MenuCategories'
import ListPosts from '../components/ListPosts'
import { fetchCategories, fetchPosts } from '../actions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const WrapperActions = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
`

class Category extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts(this.props.match.params.name)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.name !== this.props.match.params.name) {
      this.props.fetchPosts(nextProps.match.params.name)
    }
  }
  render() {
    const { name } = this.props.match.params
    return [
      <Header key="header">
        <Container>Readable {name && ` - ${name}`}</Container>
      </Header>,
      <Container key="main">
        <MenuCategories categories={this.props.categories} />
        <WrapperActions>
          <Button icon={'plus'} content="New post" as={Link} to="/create-post/" color="green" />
        </WrapperActions>
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
    fetchPosts: (category = '') => {
      console.log(category)
      dispatch(fetchPosts(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
