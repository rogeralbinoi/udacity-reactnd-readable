import React from 'react'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { postsActions } from '../actions'
import { Card, Icon, Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'

const WrapperPostInfos = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: .5em 0 .3em;
`

const ListPosts = ({ posts, sortPostsBy, votePost, deletePost, history }) => {
  const filteredPosts = (posts || []).filter(post => !post.deleted).sort(sortBy(sortPostsBy))
  return (
    <Card.Group>
      {(filteredPosts || []).map(post => (
        <Card key={post.id}>
          <Card.Content as={Link} to={`/${post.category}/${post.id}`}>
            <Card.Header>{post.title}</Card.Header>
            <Card.Meta>
              <WrapperPostInfos>
                <div>
                  <Icon name={'calendar outline'} />{moment(post.timestamp).calendar()}
                </div>
                <div>
                  <Icon name={'like outline'} />{post.voteScore}
                </div>
                <div>
                  <Icon name="user" />
                  {post.author}
                </div>
              </WrapperPostInfos>
              <div>Category: {post.category}</div>
            </Card.Meta>
            <Card.Description>{post.body.substring(0, 100)}...</Card.Description>
          </Card.Content>
          <Card.Content extra>

            <Button basic size='mini' as={Link} to={`/post/${post.id}`}><Icon name={'edit outline'} />Edit</Button>
            <Button basic size='mini' onClick={() => { deletePost({ postId: post.id, history: history }) }}><Icon name={'trash outline'} />Delete</Button>
            <Button.Group basic size='mini'>
              <Button icon={'like outline'} content={'Like'} onClick={() => { votePost({ id: post.id, vote: 'upVote' }) }}></Button>
              <Button label={<Label>{post.voteScore}</Label>} onClick={() => { votePost({ id: post.id, vote: 'downVote' }) }} icon={'dislike outline'} content={'dislike'}></Button>
            </Button.Group>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    votePost: ({ id, vote }) => {
      dispatch(postsActions.votePost({ postId: id, vote }))
    },
    deletePost: ({ postId, history }) => {
      dispatch(postsActions.deletePost({ postId, history }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
