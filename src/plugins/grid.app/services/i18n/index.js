class i18nService {
}

function i18nServiceFactory() {
  this.$get = function() {
    return new i18nService()
  }
}

export default i18nServiceFactory
