class ApiService {

}

function ApiServiceFactory() {
  this.$get = function(container) {
    const config = container.config
    return new ApiService(config)
  }
}

export default ApiServiceFactory
