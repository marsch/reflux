import ApiAdapter from './ApiAdapter'
import PassportMiddleware from './PassportMiddleware'


/**
 * usage:
 *
 */
class Api {
  constructor({sessionStorage, config}) {
    this.sessionStorage = sessionStorage

    this.userStorage = null
    this.sessionData = null

    this.apiAdapter = new ApiAdapter(config)
    this.passportMiddleware = new PassportMiddleware(config, this.sessionStorage)

    // intercepts errors for refresh-token-flow
    // intercepts requests for authorize requests
    this.apiAdapter.use(this.passportMiddleware)
  }

  async isAuthenticated() {
    if(!this.sessionData) {
      this.sessionData =
        await this.sessionStorage
        .get('grid-session')
        .catch((err) => {
          return null
        })
    }

    if(!this.sessionData) {
      return false
    }
    return true
  }

  async get(url, config) {
    const result = this.apiAdapter.get(url, config).catch((e) => e)
  }


}

function AuthServiceFactory() {
  this.$get = function(container) {
    const sessionStorage = container.sessionStorage
    const config = container.config
    return new Api({sessionStorage, config})
  }
}

export default AuthServiceFactory
