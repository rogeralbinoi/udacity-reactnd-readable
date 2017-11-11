import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MenuCategories = ({ categories, active = '' }) => (
  <Menu>
    {<Menu.Item as={Link} key={'home-link'} active={active === ''} to={'/'}>
      Home
    </Menu.Item>}
    {(categories || []).map(category => (
      <Menu.Item as={Link} key={category.path} active={active === category.path} to={`/${category.path}`}>
        {category.name}
      </Menu.Item>
    ))}
  </Menu>
)

export default MenuCategories
