import React from 'react'
import sortBy from 'sort-by'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ListPosts = ({ posts, sortPostsBy }) => {
  const filteredPosts = (posts || []).filter(post => !post.deleted).sort(sortBy(sortPostsBy))
  return (
    <Card.Group>
      {(filteredPosts || []).map(post => (
        <Card as={Link} to={`/${post.category}/${post.id}`} key={post.id}>
          <Card.Content>
            <Card.Header>{post.title}</Card.Header>
            <Card.Meta>
              <div>Category: {post.category}</div>
              <div>{moment(post.timestamp).calendar()}</div>
              <div><Icon name={'like outline'} />{post.voteScore}</div>
            </Card.Meta>
            <Card.Description>{post.body.substring(0, 100)}...</Card.Description>
          </Card.Content>
          <Card.Content>
            <Icon name="user" />
            {post.author}
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

export default ListPosts
