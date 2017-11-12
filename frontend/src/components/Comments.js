import React, { Component } from 'react'
import moment from 'moment'
import { commentsActions } from '../actions'
import { connect } from 'react-redux'
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        body: '',
        author: ''
      },
      edit: {}
    }
  }
  handleChange = (field, value) => {
    if (field === 'edit') {
      return this.setState((state) => (
        { edit: { ...state.edit, body: value } }
      ))
    }
    this.setState((state) => ({ ...state, form: { ...state.form, [field]: value } }))
  }
  handleSubmit = (parentId) => {
    const data = { parentId, ...this.state.form }
    this.props.addComment(data)
    this.setState(state => {
      return {
        ...state,
        form: {
          body: '',
          author: ''
        }
      }
    })
  }
  handleEditComment = (comment) => {
    this.setState({ edit: {} })
    this.props.editComment(comment)
  }
  editComment = (comment) => {
    this.setState({ edit: comment })
  }
  render() {
    const { items, parentId } = this.props
    const comments = (items || []).filter(comment => !comment.deleted && !comment.parentDeleted)
    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        {!comments.length && <p>Be the first to comment ;)</p>}
        {comments.map((comment) => (
          this.state.edit.id !== comment.id &&
          (<Comment key={comment.id}>
            <Comment.Content>
              <Comment.Author>
                <Icon name="user" /> {comment.author}
              </Comment.Author>
              <Comment.Metadata>
                <div><Icon name={'like outline'} /> {comment.voteScore} Likes</div>
                <div>{moment(comment.timestamp).calendar()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={() => { this.props.voteComment({ id: comment.id, vote: 'upVote' }) }}><Icon name={'like outline'} />Like</Comment.Action>
                <Comment.Action onClick={() => { this.props.voteComment({ id: comment.id, vote: 'downVote' }) }}><Icon name={'dislike outline'} />Dislike</Comment.Action>
                <Comment.Action onClick={() => { this.editComment(comment) }}><Icon name={'edit outline'} />Edit</Comment.Action>
                <Comment.Action onClick={() => { this.props.deleteComment({ id: comment.id }) }}><Icon name={'trash outline'} />Delete</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>) || (
            <Comment key={comment.id}>
              <Comment.Content>
                <Comment.Author>
                  <Icon name="user" /> {comment.author}
                </Comment.Author>
                <Comment.Metadata>
                  <div><Icon name={'like outline'} /> {comment.voteScore} Likes</div>
                  <div>{moment(comment.timestamp).calendar()}</div>
                </Comment.Metadata>
                <Form reply onSubmit={() => { this.handleEditComment(this.state.edit) }}>
                  <Form.TextArea required label="Comment" value={this.state.edit.body} onChange={(e) => { this.handleChange('edit', e.target.value) }} />
                  <Button content='Save Comment' labelPosition='left' icon='edit' primary />
                </Form>
                <Comment.Actions>
                  <Comment.Action onClick={() => { this.props.voteComment({ id: comment.id, vote: 'upVote' }) }}><Icon name={'like outline'} />Like</Comment.Action>
                  <Comment.Action onClick={() => { this.props.voteComment({ id: comment.id, vote: 'downVote' }) }}><Icon name={'dislike outline'} />Dislike</Comment.Action>
                  <Comment.Action onClick={() => { this.editComment(comment) }}><Icon name={'edit outline'} />Edit</Comment.Action>
                  <Comment.Action onClick={() => { this.props.deleteComment({ id: comment.id }) }}><Icon name={'trash outline'} />Delete</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>)
        ))}

        <Form reply onSubmit={() => { this.handleSubmit(parentId) }}>
          <Form.Input required label='Name' type='text' value={this.state.form.author} onChange={(e) => { this.handleChange('author', e.target.value) }} />
          <Form.TextArea required label="Comment" value={this.state.form.body} onChange={(e) => { this.handleChange('body', e.target.value) }} />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (postId = '') => {
      dispatch(commentsActions.addComment(postId))
    },
    voteComment: ({ id, vote }) => {
      dispatch(commentsActions.voteComment({ id, vote }))
    },
    deleteComment: ({ id }) => {
      dispatch(commentsActions.deleteComment({ id }))
    },
    editComment: ({ id, body }) => {
      dispatch(commentsActions.editComment({ id, body }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
