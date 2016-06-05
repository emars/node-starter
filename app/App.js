import React from 'react'
import { render } from 'react-dom'

import Tasks from './Tasks'
import AddTask from './AddTask'
import Pages from './Pages'
import Controls from './Controls'

import { connect } from './actions'

class App extends React.Component {
  constructor (props) {
    super(props)

    const socket = connect()

    socket.on('tasks', (tasks) => {
      console.log(tasks)
      this.setState({tasks})
    })

    socket.on('taskrunners', (taskRunners) => {
      console.log(taskRunners)
      this.setState({taskRunners})
    })

    socket.on('version', () => {
      this.setState({version})
    })

    this.state = {
      tasks: [{
        id: -1,
        name: 'Test Task',
        state: 'Running',
        timestamp: + new Date()
      }],
      taskRunners: [],
      version: ''
    }
  }
  render () {
    return (
    <div className='container'>
      <Controls />
      <Pages taskRunners={this.state.taskRunners} tasks={this.state.tasks} />
    </div>
    )
  }
}

render(<App />, document.getElementById('root'))
