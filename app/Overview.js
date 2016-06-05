import React from 'react'

class Overview extends React.Component {
  constructor (props) {
    super()
  }
  render () {
    return (
    <div className='container'>
      <h3>Overview</h3>
      <p>
        This View shows an overview of the tasks in the current kue and maybe some graphs
      </p>
    </div>
    )
  }
}

export default Overview
