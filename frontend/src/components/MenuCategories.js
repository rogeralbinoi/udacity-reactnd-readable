import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MenuCategories = ({ categories }) => (
  <Menu>
    {(categories || []).map(category => (
      <Menu.Item as={Link} key={category.path} to={`category/${category.path}`}>
        {category.name}
      </Menu.Item>
    ))}
  </Menu>
)

export default MenuCategories
