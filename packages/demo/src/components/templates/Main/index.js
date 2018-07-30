import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { AppBar } from '../../organisms/AppBar'

const MainTemplate = ({ children }) => (
  <div>
    <AppBar/>
    <div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  </div>
)

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default MainTemplate
