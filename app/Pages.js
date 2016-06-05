import React from 'react'

import { Tabs, Tab } from 'react-bootstrap'

import Overview from './OverviewPage'
import Tasks from './TasksPage'
import History from './HistoryPage'

class Pages extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      key: 1
    }
  }
  handleSelect (key) {
    this.setState({ key})
  }
  render () {
    return (
    <Tabs activeKey={this.state.key} onSelect={this.handleSelect.bind(this)}>
      <Tab eventKey={1} title="Overview">
        <Overview />
      </Tab>
      <Tab eventKey={2} title="Tasks">
        <Tasks tasks={this.props.tasks} taskRunners={this.props.taskRunners} />
      </Tab>
      <Tab eventKey={3} title="History">
        <History />
      </Tab>
    </Tabs>
    )
  }
}

export default Pages
