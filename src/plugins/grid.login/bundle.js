
export const bootstrap = (ext, di) => {
  ext.point('app.routes').extend({
    id: 'login',
    config: function(routes) {
      debugger
      const auth = di.container.app.auth
      routes.push({
        path: '/login',
        onEnter: auth.noUserRequired(),
        getComponents(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/login'))
          })
        }
      },{
        path: 'logout',
        onEnter: auth.logout(),
      })
      return routes
    }
  })
}
