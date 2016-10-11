
export const bootstrap = (ext, di) => {
  ext.point('app.routes').extend({
    id: 'poopRoute',
    config: () => {
      const auth = di.container.app.auth
      return {
        path: '/poop',
        onEnter: auth.userRequired(),
        getComponents(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./components/poop'))
          })
        }
      }
    }
  })
}
