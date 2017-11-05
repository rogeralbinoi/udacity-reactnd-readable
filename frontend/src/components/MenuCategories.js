import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MenuCategories = ({ categories }) => (
  <Menu>
    {<Menu.Item as={Link} key={'home-link'} to={'/'}>
      Home
    </Menu.Item>}
    {(categories || []).map(category => (
      <Menu.Item as={Link} key={category.path} to={`/${category.path}`}>
        {category.name}
      </Menu.Item>
    ))}
  </Menu>
)

export default MenuCategories
