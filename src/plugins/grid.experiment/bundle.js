
export const bootstrap = (ext, di) => {
  ext.point('app.routes').extend({
    id: 'poopRoute',
    config: function(routes=[]) {
      const auth = di.container.app.auth
      routes.push({
        path: '/poop',
        onEnter: auth.userRequired(),
        getComponents(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/poop'))
          })
        }
      })
      debugger;
      return routes
    }
  })
}
