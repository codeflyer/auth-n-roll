import { renderRoutes } from 'react-router-config'

import NotFoundPage from '../components/pages/NotFound'
import HomePage from '../components/pages/Home'
import AboutPage from '../components/pages/About'

export const routes = [
  {
    path: `/`,
    component: HomePage,
    label: 'Home Page',
    exact: true
  },
  {
    path: `/about`,
    component: AboutPage,
    label: 'About Page',
    exact: true
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

export { renderRoutes }
