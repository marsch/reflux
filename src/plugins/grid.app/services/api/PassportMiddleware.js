// @flow
import axios from 'axios'
import querystring from 'querystring'

class PassportMiddleware {
  constructor(config, sessionStorage) {
    this.config = config
    this.sessionStorage = sessionStorage
  }

  async onResponseError(error) {
    if(error.response.status === 401) {
      const originalConfig = error.config
      const tokenResponse = await this.refreshAccessToken().catch((error) => {
        // error
        return error
      })

      if(typeof tokenResponse != 'string') {
        //this.router.history.push('/')
        return Promise.reject(tokenResponse)
      }

      // use the new token
      const updatedConfig = Object.assign({}, originalConfig, { headers: { 'Authorization': `Bearer ${tokenResponse}` }})
      return axios(updatedConfig)

    }
  }

  async refreshAccessToken() {
    const reqOpts = {
      url: `${this.config.get('AUTH').ENDPOINT}/auth/token`,
      method: 'PUT',
      data: {
        refresh_token: this.refresh_token,
        client_id: this.config.get('AUTH').CLIENT_ID
      },
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 20000
    }
    return axios(reqOpts).then(() => {
      const {access_token, refresh_token} = response.data

      //TODO: save access_token and refresh_token to session store

      return access_token
    })
  }

  requestLoginEmail(email, redirectURI) {
    return axios({
      method: 'post',
      timeout: 20000,
      url: `${this.config.get('AUTH').ENDPOINT}/auth/send`,
      data: {
        email,
        redirectURI
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  fetchAccessToken(token, user, provider='email') {
    const data = querystring.stringify({
      'client_id': this.config.get('AUTH').CLIENT_ID,
      'scope': [
        'content_management',
        'website_management',
        'share',
        'update_profile'
      ].join(','),
      token,
      user,
      provider
    })
    
    return axios({
      url: this.config.get('AUTH').LOGIN_EMAIL_ENDPOINT,
      method: 'POST',
      timeout: 20000,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }


}

export default PassportMiddleware
