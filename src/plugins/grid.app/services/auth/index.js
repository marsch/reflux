class AuthService {
  constructor(api, storage) {
    this.api = api

    // just for:
    // - last check timestamp
    // - token
    // - refresh token?
    this.storage = storage
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.storage.getItem('grid-session')
      .then((sessionData) => {
        if(sessionData === null) {
          // no session data
          reject()
        }
      })
    })
  }

  userRequired(fallbackRoute = '/login') {
    return (nextState, replace, callback) => {
      this.isLoggedIn()
        .then(() => {
          callback()
        })
        .catch(() => {
          replace({
            pathname: fallbackRoute,
            state: { nextPathname: nextState.location.pathname }
          })
          callback()
        })
    }
  }

  noUserRequired(fallbackRoute = '/logout') {
    return (nextState, replace, callback) => {
      this.isLoggedIn()
        .then(() => {
          // redirect if logged in
          replace({
            pathname: fallbackRoute,
            state: { nextPathname: nextState.location.pathname }
          })
          callback()
        })
        .catch(() => {
          callback()
        })
    }
  }
}

function AuthServiceFactory() {
  this.$get = function(container) {
    const api = container.api
    const storage = container.storage
    return new AuthService(api, storage)
  }
}

export default AuthServiceFactory
