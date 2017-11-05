import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Form } from 'semantic-ui-react'
import AppHeader from '../components/AppHeader'
import MenuCategories from '../components/MenuCategories'
import { fetchCategories, addPost } from '../actions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const WrapperActions = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
`

class CreatePost extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }
  state = {
    form: {
      title: '',
      author: '',
      category: '',
      body: ''
    }
  }
  updateForm = (field, value) => {
    console.log(field, value)
    this.setState((state) => {
      return { form: { ...state.form, [field]: value } }
    })
    console.log(this.state.form)
  }
  render() {
    return [
      <AppHeader key="AppHeader">
        <Container>Readable - New Post</Container>
      </AppHeader>,
      <Container key="main">
        <MenuCategories categories={this.props.categories} />
        <WrapperActions>
          <Button icon={'plus'} content="New post" as={Link} to="/create-post/" color="green" />
        </WrapperActions>
      </Container>,
      <Container key={'newPost'}>
        <Form onSubmit={() => { this.props.addPost(this.state.form) }}>
          <Form.Input required label='Title' placeholder='Title' value={this.state.form.title} onChange={(e) => { this.updateForm('title', e.target.value) }} />
          <Form.Group widths='equal'>
            <Form.Input required label='Author' placeholder='Your name' value={this.state.form.author} onChange={(e) => { this.updateForm('author', e.target.value) }} />
            <Form.Field required label='Category' control='select' value={this.state.form.category} onChange={(e) => { this.updateForm('category', e.target.value) }}>
              <option value="">Select a Category</option>
              {(this.props.categories || []).map((category) => {
                return (
                  <option value={category.path}>{category.name}</option>
                )
              })}
            </Form.Field>
          </Form.Group>
          <Form.TextArea required label='Post' placeholder='Your post here...' value={this.state.form.body} onChange={(e) => { this.updateForm('body', e.target.value) }} />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    ]
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    addPost: (post) => {
      dispatch(addPost(post))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
