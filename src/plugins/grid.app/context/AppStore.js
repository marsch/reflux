import {contextual} from '@the-grid/multiverse-ui'
import {Map, Struct} from '@the-grid/immutable'

import extensions from 'xtpoint'

//base configuration of the store-struct
let storeConfig = {}

const storeExtensions = extensions.point('core.app.bootstrap.store').invoke('exec').value()
console.log('storeext', storeExtensions)
storeExtensions.forEach(function(storeExtDefinition) {
  storeConfig = Object.assign(storeConfig, storeExtDefinition)
})


const dummyApi = {
  sessionUpdate: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'fake session loaded from server',
        })
      }, 2000)
    })
  }
}

// RouteStruct
const RouteStruct = Struct({
  config: {
    deps: ['path', 'components', 'data-definitionkindathing']
  }
})

const DataDependencyGraph = Struct({
  state: undefined,

  'siteId': {
    get: function() {
      return this.state.siteId
    }
  },

  'site': {
    deps: ['siteId'],
    get: function get(siteId) {
      console.log('here?')
      debugger
      return this.state.sites[siteId]
    }
  },
  'items': {
    deps: ['site'],
    get: function get(site) {

      return ['1','2']
    }
  },
  'item': {
    deps: ['item']
  },

  'published-items': {
    deps: ['items']
  },

  'redesigns': {
    deps: ['published-items']
  },

  'redesign': {
    deps: ['redesigns']
  }

})

window.DataDependencyGraph = DataDependencyGraph

//
const AppStruct = Struct({
  poopToken: undefined,
  session: undefined
})


class AppStore extends contextual.Store {
  init({name, state}) {
    this.state = new AppStruct(state)
    this.actions = Object.assign(this.actions, {

      'poop': (state, payload) => {
        console.log('ppoooop executed', payload)
        return state.set('poopToken', payload)
      },

      // example how to trigger async actions with store
      'session.check': (state) => {
        dummyApi.sessionUpdate()
        .then((session) => {
          this.request('session.update', session)
        })
        console.log('checkSession', state.get('session'))
        return state
      },

      'session.update': (state, payload) => {
        return state.set('session', payload)
      }


    })
  }
}

export default AppStore
