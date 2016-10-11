import React from 'react'
import {Link} from 'react-router'

import {ext, di} from 'reflux'

class App extends React.Component {
  render() {
    //NOTE: execution on same level - return an array of results
    let extChilds = ext.point('app.main').invoke('render', this, 'superval').value()
    const self = this

    // NOTE: stack using reduce - can even do more with it
    let wrappedChild = ext.point('app.main').reduce(function(prev, ext) {
      if(!prev) {
        return ext.invoke('render', self)
      }
      return ext.invoke('render', self, prev)
    })

    //NOTE: same as above
    let stackedChild = ext.point('app.main').exec('render', self)

    return (<div className="App">
      <div>
        {extChilds}
      </div>
      <div>
        {wrappedChild}
      </div>
      <div>
        {stackedChild}
      </div>
      <div className="App-heading App-flex">
        <h2>Welcome to <span className="App-react">React</span></h2>
      </div>
      <div className="App-instructions App-flex">

        <Link to="/poop">click here to load pooop</Link>
        <p>Edit <code>src/App.js</code> and save to hot reload your changes.</p>
      </div>
      <div>
        {this.props.children}
      </div>

    </div>)
  }
}


export default App
