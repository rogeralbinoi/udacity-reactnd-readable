import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ListPosts = ({ posts }) => (
  <Card.Group>
    {(posts || []).map(post => (
      <Card as={Link} to={`post/${post.id}`} key={post.id}>
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>Category: {post.category}</Card.Meta>
          <Card.Description>{post.body}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Icon name="user" />
          {post.author}
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
)

export default ListPosts
