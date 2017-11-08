import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Form, Message } from 'semantic-ui-react'
import AppHeader from '../components/AppHeader'
import MenuCategories from '../components/MenuCategories'
import ListPosts from '../components/ListPosts'
import { fetchCategories, fetchPosts } from '../actions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const WrapperActions = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .ui.form .fields {
    margin: 0;
  }
`

class Category extends Component {
  state = {
    sortPostsBy: '-voteScore'
  }
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPosts(this.props.match.params.category)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.props.fetchPosts(nextProps.match.params.category)
    }
  }
  updateForm = (field, value) => {
    this.setState((state) => {
      return { ...state, [field]: value }
    })
  }
  render() {
    const { name } = this.props.match.params
    return [
      <AppHeader key="AppHeader">
        <Container>Readable {name && ` - ${name}`}</Container>
      </AppHeader>,
      <Container>
        {this.props.messages.map((message) => {
          return (<Message>
            <Message.Header>{message.title}</Message.Header>
            <p>{message.description}</p>
          </Message>)
        })}
      </Container>,
      <Container key="main">
        <MenuCategories categories={this.props.categories} />
        <WrapperActions>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field required label='Order by' control='select' value={this.state.sortPostsBy} onChange={(e) => { this.updateForm('sortPostsBy', e.target.value) }}>
                <option value="-voteScore">Best Score</option>
                <option value="voteScore">Worse Score</option>
                <option value="timestamp">Lastest posts</option>
                <option value="-timestamp">Recent posts</option>
              </Form.Field>
            </Form.Group>
          </Form>
          <Button icon={'plus'} content="New post" as={Link} to="/create-post/" color="green" />
        </WrapperActions>
        <ListPosts posts={this.props.posts} sortPostsBy={this.state.sortPostsBy} />
      </Container>
    ]
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts,
    messages: state.messages
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
