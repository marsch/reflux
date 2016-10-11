import './App.css'

import React from 'react'
import App from './App'
import AppContext from './context/AppContext'
import { Router, browserHistory, RouterContext } from 'react-router';
import extensions from 'xtpoint'


class Noop extends React.Component {
  render() {
    if (!this.props || !this.props.children) return null
    return (
      <div>
      {this.props.children}
      </div>
    )
  }
}

class AppRoot extends React.Component {

  myCreateElement(Component, props) {
      console.log('create element', Component)
      // copy it
      let propsCopy = Object.assign({}, props)

      let routerPropTypes = Router.propTypes
      delete routerPropTypes['children']
      let routerContextPropTypes = RouterContext.propTypes

      Object.keys(routerPropTypes).forEach(propType => delete propsCopy[propType])
      Object.keys(routerContextPropTypes).forEach(propType => delete propsCopy[propType])

      // quite useful may be we should keep them in enables /site/:id/live/:otherid - queryParams are also missing - which can be done here too
      delete propsCopy['route']
      delete propsCopy['routeParams']

      return <Component {...propsCopy} />
  }


  getChildRoutes = (next, callback) => {
    console.log('getting child routes')
    //route definitions
    //inject acl templates here:
    //
    // like onEnter: requiredAcl([AccessLevel.UNAUTHORIZED, AccessLevel.Visitor, AccessLevel.FacebookUser])
    const childRoutes = extensions.point('app.routes').invoke('config', this).value()

    // route views definition
    //const routeViews = extensions.point('app.route.views').invoke('config', this).value()

    //FIXME: 1:n vs. 1:1 here - might be a foolish assumption
    const machtingChildRoutes = childRoutes.find(function(route) {
      return route.path == next.location.pathname
    })

    return callback(null, [machtingChildRoutes]);
  }

  render() {
    const routes = {
      path: '/',
      component: App,
      getChildRoutes: this.getChildRoutes
    }

    return (
      <AppContext>
        <Router children={routes} history={browserHistory} createElement={this.myCreateElement}/>
      </AppContext>
    )
  }
}

AppRoot.childContextTypes = {
  store: React.PropTypes.object
}

export default AppRoot
