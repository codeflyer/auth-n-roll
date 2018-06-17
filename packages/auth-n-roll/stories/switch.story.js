import React from 'react'
import { storiesOf } from '@storybook/react'

import { Switch, SwitchElement } from '../src/components/Switch'
import { AuthNRollProvider } from '../src/providers/index'

const styles = {
  wrapper: { width: '300px' }
}
storiesOf('Switch', module).add('Sample', () => {
  return (
    <AuthNRollProvider debug>
      <div style={styles.wrapper}>
        <Switch index={'el1'} debug>
          <SwitchElement index={'el1'}>El1</SwitchElement>
          <SwitchElement index={'el2'}>El2</SwitchElement>
          <SwitchElement index={'el3'}>El3</SwitchElement>
          <SwitchElement index={'el4'}>El4</SwitchElement>
        </Switch>
      </div>
    </AuthNRollProvider>
  )
})
