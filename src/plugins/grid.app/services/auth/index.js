class AuthService {
  constructor(api, sessionStorage) {
    this.api = api
    this.sessionStorage = sessionStorage
  }

  isLoggedIn() {
    console.log('isLoggedIn is executed')
    return new Promise((resolve, reject) => {
      debugger
      this.sessionStorage.getItem('grid-session')
      .then((sessionData) => {
        if(sessionData === null) {
          // no session data
          reject()
        }
        resolve()
      })
    })
  }

  userRequired(fallbackRoute = '/login') {
    console.log('define userRequired')
    return (nextState, replace, callback) => {
      console.log('executing userRequired')
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
          // redirect if logged
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

  logout(newRoute = '/') {
    return (nextState, replace, callback) => {
      this.storage.removeItem('grid-session')
      replace(newRoute)
      callback()
    }
  }
}

function AuthServiceFactory() {
  this.$get = function(container) {
    const api = container.api
    const sessionStorage = container.sessionStorage
    return new AuthService(api, sessionStorage)
  }
}

export default AuthServiceFactory
