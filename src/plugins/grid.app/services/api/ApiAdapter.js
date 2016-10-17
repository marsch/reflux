// @flow
import axios from 'axios'

export interface IApiMiddleware {
  onResponse(response: Object): Object,
  onResponseError(error: Object): Object,
  onRequest(config: Object): Object,
  onRequestError(error: Object): Object
}

class ApiAdapter {
  constructor(config) {
    this.config = config
    this.axios = axios.create()

    this.axios.interceptors.request.use((config) => {
      config.headers['Accept'] = 'application/json'
      config.timeout = 20000
      return config
    })

    // Add a response interceptor
    // this.axios.interceptors.response.use((response) => {
    //   // Do something with response data
    //   // if(response.headers && response.headers.location) {
    //   //   let jobId = (response.headers.location.match(JOBIDPattern) || [])[1];
    //   //   if(jobId) {
    //   //     if (window.G && window.G.store) {
    //   //       // FIXME: EVIL hard to track
    //   //       window.G.actions.jobs.fetchJob.request({jobID: jobId});
    //   //     }
    //   //   }
    //   // }
    //   return response;
    // }, (error) => {
    //   if(error.response.status === 401) {
    //     return new Promise((resolve, reject) => {
    //       const originalConfig = error.config
    //       this.refreshToken()
    //       .then(() => {
    //         axios(updatedConfig)
    //         .then((response) => {
    //           resolve(response)
    //         })
    //         .catch((error) => {
    //           // non related to auth error
    //           reject(error)
    //         })
    //       })
    //       .catch(() => {
    //         this.router.history.push('/')
    //         reject('token refresh');
    //       })
    //     })
    //   } else {
    //     return Promise.reject(error);
    //   }
    // });
  }

  // refreshToken() {
  //   return new Promise((resolve, reject) => {
  //     if(!this.refresh_token) {
  //       return reject('no refresh token')
  //     }
  //
  //     let reqOpts = {
  //       url: `${this.config.get('AUTH').ENDPOINT}/auth/token`,
  //       method: 'PUT',
  //       data: {
  //         refresh_token: this.refresh_token,
  //         client_id: this.config.get('AUTH').CLIENT_ID
  //       },
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       timeout: 20000
  //     };
  //
  //     axios(reqOpts)
  //     .then((response) => {
  //       // ... proceed original request here
  //       const {access_token} = response.data
  //       this.token = access_token
  //
  //       // if in the browser - update the cookie
  //       if (typeof window !== 'undefined') {
  //         Cookie.set('token', access_token, { expires: 1 })
  //       }
  //       return resolve(response.data)
  //     })
  //     .catch(function(error) {
  //       return reject(error)
  //     })
  //   })
  // }
  //


  use(middleware: IApiMiddleware) {
    const {onResponse, onResponseError, onRequest, onRequestError} = middleware
    if(onResponse) {
      this.axios.interceptors.response.use(onResponse, onResponseError)
    }

    if(onRequest) {
      this.axios.interceptors.request.use(onRequest, onRequestError)
    }
  }

  //exposing scoped axios api
  request(config) {
    config.url = `${this.config.get('API').ENDPOINT}${config.url}`
    return this.axios.request(config)
  }

  get(url, config) {
    url = `${this.config.get('API').ENDPOINT}${url}`
    return this.axios.get(url, config)
  }

  post(url, config) {
    url = `${this.config.get('API').ENDPOINT}${url}`
    return this.axios.post(url, config)
  }

  delete(url, config) {
    url = `${this.config.get('API').ENDPOINT}${url}`
    return this.axios.delete(url, config)
  }

  head(url, config) {
    url = `${this.config.get('API').ENDPOINT}${url}`
    return this.axios.head(url, config)
  }

  post(url, config) {
    url = `${this.config.get('API').ENDPOINT}${url}`
    return this.axios.post(url, config)
  }

}


export default ApiAdapter
