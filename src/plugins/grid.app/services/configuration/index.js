import defaultSettings from './defaults'

class ConfigurationService {
  constructor() {
    console.log('configuration service is contructed, yeahhhh', defaultSettings)

  }


}

function ConfigurationServiceFactory() {
  this.$get = function() {
    return new ConfigurationService()
  }
}

export default ConfigurationServiceFactory
