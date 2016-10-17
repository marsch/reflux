import React from 'react'
import {ext, di} from 'reflux'

class Login extends React.Component {
  onChange = (event) => {
    console.log('change', this.props, event)
  }
  render() {
    return (
      <div>login - magic fuck email flow
        <input type='text' onChange={this.onChange}/>
        <input type='button' onClick={() => this.context.router.push('/')} />
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
}

export default Login
