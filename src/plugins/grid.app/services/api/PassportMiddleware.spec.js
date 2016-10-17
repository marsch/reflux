/* global expect sinon*/
// @flow

import ApiAdapter, { IApiMiddleware } from './ApiAdapter'
import PassportMiddleware from './PassportMiddleware'

describe('PassportMiddleware', () => {
  let instance = null
  beforeEach(() => {
    instance = new PassportMiddleware()
  })
  describe('onResponseError', () => {
    var stub = null
    beforeEach(() => {
      stub = sinon.stub(instance, 'refreshAccessToken')
    })

    afterEach(() => {
      stub.restore()
    })

    it('should not trigger refreshAccessToken on other errors than 401', () => {
      instance.onResponseError({
        response: {
          status: 404
        }
      })
      expect(stub).have.not.been.called

    })
    it('should trigger refreshAccessToken on 401 error', () => {
      instance.onResponseError({
        response: {
          status: 401
        }
      })
    })
  })

  describe('refreshAccessToken', () => {
    it('should use refresh the access_token')
  })
})
