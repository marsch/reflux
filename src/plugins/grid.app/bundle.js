import React from 'react'
import {render} from 'react-dom'
import AppRoot from './AppRoot'

import ConfigurationServiceFactory from './services/configuration'
import ApiServiceFactory from './services/api'
import AuthServiceFactory from './services/auth'
import StorageServiceFactory from './services/storage'
import RouterActionsFactory from './services/router'

export const bootstrap = (ext) => {


  // register core services of the app
  ext.point('core.bootstrap').extend({
    id: 'main',
    exec: async (di) => {
      di.provider('app.config', ConfigurationServiceFactory)
      di.provider('app.api', ApiServiceFactory)
      di.provider('app.auth', AuthServiceFactory)
      di.provider('app.getStorage', StorageServiceFactory)
      di.provider('app.router', RouterActionsFactory)

      di.value('app.sessionStorage', await di.container.app.getStorage('grid-session-db'))

      console.log('config service goes here', di.container.app.config)
      console.log('auth service goes here', di.container.app.auth)
      console.log('api service goes here', di.container.app.api)
      console.log('storage service goes here', di.container.app.storage)

    }
  })



  ext.point('core.attach').extend({
    id: 'main',
    exec: () => {
      return render(<AppRoot/>, document.querySelector('#app'))
    }
  })

}
