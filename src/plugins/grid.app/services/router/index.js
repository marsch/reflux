import {browserHistory} from 'react-router'

function RouterActionsFactory() {
  this.$get = function() {
    // expose api to programmatically navigate
    return {
      history: browserHistory
    }
  }
}

export default RouterActionsFactory
