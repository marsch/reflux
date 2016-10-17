import PouchDB from 'pouchdb'
PouchDB.adapter('worker', require('worker-pouch'))
PouchDB.debug.enable('pouchdb:*')

import pouchWorker from 'worker-pouch'

export default function() {
  this.$get = function() {
    return async (dbName) => {
      const isSupported = await pouchWorker.isSupportedBrowser()
      if(isSupported) {
        return new PouchDB(dbName, {adapter: 'worker'})
      }
      return new PouchDB(dbName)
    }
  }
}
