import { configure } from '@storybook/react'

const req = require.context('../packages', true, /.story.js$/)
// const req = require.context('../packages/auth-n-roll-components-material-ui', true, /.story.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
