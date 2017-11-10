import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form } from 'semantic-ui-react'
import AppHeader from '../components/AppHeader'
import MenuCategories from '../components/MenuCategories'
import { fetchCategories, addPost, fetchPost, editPost } from '../actions'
import styled from 'styled-components'

const WrapperActions = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
`

class CreatePost extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.match.params.id && this.props.fetchPost(this.props.match.params.id)
  }
  state = {
    submitText: 'Save',
    edit: false,
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== this.props.post) {
      const { title, author, category, body } = nextProps.post
      this.setState({ edit: true, form: { title, author, category, body } })
    }
  }
  render() {
    const { history } = this.props
    return [
      <AppHeader key="AppHeader">
        <Container>Readable - New Post</Container>
      </AppHeader>,
      <Container key="main">
        <MenuCategories categories={this.props.categories} />
        <WrapperActions>

        </WrapperActions>
      </Container>,
      <Container key={'newPost'}>
        <Form onSubmit={() => { this.state.edit ? this.props.editPost(this.state.form, this.props.post.id, history) : this.props.addPost(this.state.form, history) }}>
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
          <Form.Button positive>{this.state.submitText}</Form.Button>
        </Form>
      </Container>
    ]
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    post: state.post,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    addPost: (post, history) => {
      dispatch(addPost(post, history))
    },
    fetchPost: (postId = '') => {
      dispatch(fetchPost(postId))
    },
    editPost: (form, id, history) => {
      dispatch(editPost(form, id, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
