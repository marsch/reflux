/* global expect sinon*/
// @flow
import ApiAdapter, { IApiMiddleware } from './ApiAdapter'

describe('ApiAdapter', () => {

  it('is defined', () => {
    expect(ApiAdapter).to.a('function')
  })

  describe('instance', () => {
    let instance = null
    let requests = null
    let xhr = null

    const resolveApi = (status, header, data) => {
      setTimeout(() => {
        requests[0].respond(status, header, data)
      })
    }

    beforeEach(() => {
      requests = []
      xhr = sinon.useFakeXMLHttpRequest()

      instance = new ApiAdapter({
        get: () => {
          return {
            ENDPOINT: 'http://example.com/api'
          }
        }
      })

      xhr.onCreate = function (xhr) {
        requests.push(xhr);
      };
    })

    afterEach(() => {
      xhr.restore()
    })

    describe('request()', () => {
      it('sends correct request with prefix', (done) => {
        instance.request({ url: '/user'}).then((response) => {
          expect(response.config.method).to.equal('get')
          expect(response.config.headers['Accept']).to.equal('application/json')
          expect(response.config.timeout).to.be.equal(20000)
          expect(response.config.url).to.be.equal('http://example.com/api/user')
          done()
        })
        resolveApi(200)
      })
    })

    describe('use()', () => {
      it('middleware can be registred', (done) => {
        const middleware: IApiMiddleware = {
          onRequest: (config) => {
            config.headers['Authorization'] = 'Bearer SUPERTESTTOKEN'
            return config
          },
          onResponse: (response) => {
            response.data = {
              injected: true
            }
            return response
          }
        }
        instance.use(middleware)
        instance.get({ url: '/user'}).then((response) => {
          expect(response.config.headers['Authorization']).to.equal('Bearer SUPERTESTTOKEN')
          expect(response.data.injected).to.equal(true)
          done()
        })
        resolveApi(200)
      })
    })

  })

})
