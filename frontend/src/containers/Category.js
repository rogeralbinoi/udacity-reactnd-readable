import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Form, Message } from 'semantic-ui-react'
import AppHeader from '../components/AppHeader'
import MenuCategories from '../components/MenuCategories'
import ListPosts from '../components/ListPosts'
import { categoriesActions, postsActions } from '../actions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const WrapperActions = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-end;
  .ui.form .fields {
    margin: 0;
  }
`

const WrapperMessages = styled.div`
  padding: 1em 0;
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
      !!this.props.messages.length && (<Container>
        <WrapperMessages>
          {this.props.messages.map((message) => {
            return (<Message warning={message.warning}>
              <Message.Header>{message.title}</Message.Header>
              <p>{message.description}</p>
            </Message>)
          })}
        </WrapperMessages>
      </Container>),
      <Container key="main">
        <MenuCategories categories={this.props.categories.items} active={this.props.match.params.category} />
        <WrapperActions>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field required label='Order by' control='select' value={this.state.sortPostsBy} onChange={(e) => { this.updateForm('sortPostsBy', e.target.value) }}>
                <option value="-voteScore">Best Score</option>
                <option value="voteScore">Worse Score</option>
                <option value="-timestamp">Latest posts</option>
                <option value="timestamp">Oldest posts</option>
              </Form.Field>
            </Form.Group>
          </Form>
          <Button icon={'plus'} content="New post" as={Link} to="/post/new" color="green" />
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
      dispatch(categoriesActions.fetchCategories())
    },
    fetchPosts: (category = '') => {
      dispatch(postsActions.fetchPosts(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
