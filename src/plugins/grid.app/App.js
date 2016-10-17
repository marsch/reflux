import React from 'react'
import {Link} from 'react-router'

import {ext, di} from 'reflux'

class App extends React.Component {
  render() {
    return (
      <div className="App">
          {this.props.children}
      </div>
    )
  }
}


export default App
