import React from 'react'

import { Panel } from 'react-bootstrap'

class Tasks extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
    <Panel>
      <table className="table">
        <thead>
          <tr>
            <th>
              Task ID
            </th>
            <th>
              Task Type
            </th>
            <th>
              Task State
            </th>
            <th>
              Task Added
            </th>
            <th>
              Controls
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks.map((task) => (
             <tr>
               <td>
                 {task.id}
               </td>
               <td>
                 {task.type}
               </td>
               <td>
                 {task.state}
               </td>
               <td>
                 {task.created_at}
               </td>
               <td>
                 <button className='btn btn-primary'>
                   asdf
                 </button>
               </td>
             </tr>
           ))}
        </tbody>
      </table>
    </Panel>
    )
  }
}

export default Tasks
