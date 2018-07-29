import React from 'react'
import { AuthProtected } from 'auth-n-roll'
import MainTemplate from '../../templates/Main'

const AboutPage = () => (
  <AuthProtected>
    <MainTemplate>
      <h1>About Page</h1>
    </MainTemplate>
  </AuthProtected>
)

export default AboutPage
