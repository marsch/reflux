import React from 'react'

class PoopComponent extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      poopToken: 'noop',
      name: 'unknown'
    }
  }

  componentWillMount() {
    this.context.request('app', 'poop', 'shit')
  }

  render() {
    return (
      <div key='poop'>
        poopToken: {this.state.poopToken}

        session: {this.state.name }
      </div>
    )
  }
}

export default PoopComponent
