import React from 'react'

import Tasks from './Tasks'
import AddTask from './AddTask'

const taskContainerStyle = {
  maxHeight: '500px',
  overflowY: 'scroll'
}

class TasksPage extends React.Component {
  constructor (props) {
    super()
  }
  render () {
    return (
    <div className='container'>
      <div style={taskContainerStyle}>
        <Tasks tasks={this.props.tasks} />
      </div>
      <AddTask taskRunners={this.props.taskRunners} />
    </div>
    )
  }
}

export default TasksPage
