import {ext, di} from 'reflux'

window.ext = ext

let modulesContext = require.context('../plugins', true, /^\.\/[^\/]+?\/bundle\.js$/)
modulesContext.keys().forEach((file) => {
  let moduleId   = modulesContext.resolve(file);
  let moduleInstance     = __webpack_require__(moduleId) // eslint-disable-line
  if(moduleInstance && moduleInstance.bootstrap && typeof moduleInstance.bootstrap == 'function') {
    moduleInstance.bootstrap(ext, di)
  }
})

export default function () {
  // help all plugins to configure themselves
  ext.point('core.bootstrap').invoke('exec', null, di)

  // actually execute the typical calls to attach the application to the dom (aka. initial render call)
  ext.point('core.attach').invoke('exec')
}
