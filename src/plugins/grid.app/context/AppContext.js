import React from 'react'
import {contextual} from '@the-grid/multiverse-ui'
import AppStore from './AppStore'

const displayName = 'AppContext'

// NOTE: probably not needed as a definition - could be the outcome of the store component or something
class AppContext extends React.Component {
  render() {
    return this.props.children
  }
}

AppContext.PropTypes = {
  children: React.PropTypes.any.isRequired
}

export default contextual.install(AppContext, 'app', () => {
  const store = new AppStore({name: 'app', state: {}})
  window.appStore = store

  return store
})
