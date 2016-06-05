import React from 'react'

import { addTask } from './actions'

import { Panel, FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap'

class AddTask extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'LOG',
      args: []
    }
  }
  getTaskRunnerCollection () {
    const coll = []
    for (let key in this.props.taskRunners) {
      coll.push(key)
    }
    return coll
  }
  addArg () {
    const { args } = this.state

    args.push('')

    this.setState({ args})
  }
  onArgChange (i, e) {
    const val = e.target.value

    const { args } = this.state

    args[i] = val

    this.setState({ args})
  }

  addTask () {
    const task = {
      type: this.state.type,
      args: this.state.args
    }

    console.log(task)
    addTask(task)
  }

  onTaskTypeChange (e) {
    const type = e.target.value

    this.setState({ type})
  }
  render () {
    return (
    <Panel>
      <h3>Add Task</h3>
      <FormGroup controlId='taskRunner'>
        <ControlLabel>
          Task Type:
        </ControlLabel>
        <FormControl
          componentClass='select'
          placeholder='task type'
          value={this.state.type}
          onChange={this.onTaskTypeChange.bind(this)}>
          {this.getTaskRunnerCollection.call(this).map((type) => {
             return (
             <option value={type}>
               {type}
             </option>
             )
           })}
        </FormControl>
      </FormGroup>
      <Button onClick={this.addArg.bind(this)}>
        <Glyphicon glyph='plus'></Glyphicon>
      </Button>
      {this.state.args.map((arg, i) => {
         const controlId = `Arg${i}`
       
         return (
         <FormGroup controlId={controlId}>
           <ControlLabel>
             {controlId}
           </ControlLabel>
           <FormControl
             type='text'
             placeholder='Argument Value'
             value={this.state.args[i]}
             onChange={this.onArgChange.bind(this, i)} />
         </FormGroup>
         )
       })}
      <div className='text-right'>
        <Button onClick={this.addTask.bind(this)}>
          Add
        </Button>
      </div>
    </Panel>
    )
  }
}

export default AddTask
