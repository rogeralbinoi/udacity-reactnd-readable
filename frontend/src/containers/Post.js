import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Container, Button, Header, Icon, Message, Label } from 'semantic-ui-react'
import AppHeader from '../components/AppHeader'
import MenuCategories from '../components/MenuCategories'
import Comments from '../components/Comments'
import { categoriesActions, postsActions, commentsActions } from '../actions'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const WrapperPost = styled.div`
  margin: 2rem 0;
  .title {
    width: 100%;
    margin-bottom: 0;
  }
  span {
    margin: 0;
    padding: 0;
  }
  .post {
    width: 100%;
    margin-top: 2rem;
    font-size: 1.2rem;
  }
`

const WrapperPostActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem 0;
`

const WrapperMessages = styled.div`
  padding: 1em 0;
`

const WrapperInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: .3rem;
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid #eee;
  > span {
    padding: 0 .5rem;
    border-right: 1px solid #aaa;
  }
`

class Post extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPost(this.props.match.params.id)
    this.props.fetchComments(this.props.match.params.id)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchPost(nextProps.match.params.id)
    }
  }
  render() {
    const { title, body, author, category, timestamp, voteScore, comments, id } = this.props.post
    const date = moment(timestamp).calendar()
    return [
      <AppHeader key="AppHeader">
        <Container>Readable</Container>
      </AppHeader>,
      !!this.props.messages.length && (<Container>
        <WrapperMessages>
          {this.props.messages.map((message) => {
            return (<Message warning={message.warning} positive={message.positive} >
              <Message.Header>{message.title}</Message.Header>
              <p>{message.description}</p>
            </Message>)
          })}
        </WrapperMessages>
      </Container>),
      <Container key="main">
        <MenuCategories categories={this.props.categories.items} active={this.props.match.params.category} />
      </Container>,
      <Container key="post">
        <WrapperPost>
          <Header className={'title'} as='h1'>{title}
          </Header>
          <WrapperInfo>
            <span><Icon name={'user'} /> {author}</span>
            <span>Category: {category}</span>
            <span><Icon name={'calendar'} /> {date}</span>
          </WrapperInfo>
          <WrapperPostActions>
            <Button.Group basic size='mini'>
              <Button icon={'like outline'} content={'Like'} onClick={() => { this.props.votePost({ id: id, vote: 'upVote' }) }}></Button>
              <Button label={<Label>{voteScore}</Label>} onClick={() => { this.props.votePost({ id: id, vote: 'downVote' }) }} icon={'dislike outline'} content={'dislike'}></Button>
            </Button.Group>
            <Button.Group basic size='mini'>
              {<Button as={Link} to={`/post/${id}`}><Icon name={'edit outline'} />Edit</Button>}
              <Button onClick={() => { this.props.deletePost({ postId: id, history: this.props.history, category: this.props.match.params.category }) }}><Icon name={'trash outline'} />Delete</Button>
            </Button.Group>
          </WrapperPostActions>
          {!!body && (<p className="post">{body}</p>)}
        </WrapperPost>
      </Container>,
      <Container key="comments">
        <Comments items={comments} parentId={id} />
      </Container>
    ]
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    post: state.post,
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(categoriesActions.fetchCategories())
    },
    fetchPost: (postId = '') => {
      dispatch(postsActions.fetchPost(postId))
    },
    fetchComments: (postId = '') => {
      dispatch(commentsActions.fetchComments(postId))
    },
    votePost: ({ id, vote }) => {
      dispatch(postsActions.votePost({ postId: id, vote }))
    },
    deletePost: ({ postId, history, category }) => {
      dispatch(postsActions.deletePost({ postId, history, category }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
