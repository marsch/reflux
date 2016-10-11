import React from 'react'

// NOTE: probably not needed as a definition - could be the outcome of the store component or something
class AppContext extends React.Component {
  render() {
    return this.props.children
  }
}

export default AppContext
