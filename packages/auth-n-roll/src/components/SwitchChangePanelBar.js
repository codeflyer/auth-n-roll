import React from 'react'

const styles = {
  wrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: '#ddd',
    padding: '3px'
  },
  button: {
    margin: '3px',
    padding: '5px',
    height: '30px',
    fontSize: '13px'

  }
}

export const SwitchChangePanelBar = props => (
  <div style={styles.wrapper}>
    <div>
      {props.indexList.map(index => (
        <button onClick={() => props.onClick(index)} style={Object.assign({}, styles.button, {fontWeight: index === props.currentIndex ? 'bold' : 'normal'})}>
          {index}
        </button>
      ))}
    </div>
  </div>
)
