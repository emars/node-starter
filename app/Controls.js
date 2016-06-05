import React from 'react'

import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap'

class Controls extends React.Component {
  render () {
    return (
    <ButtonToolbar>
      <ButtonGroup>
        <Button>
          <Glyphicon glyph='play'></Glyphicon>
        </Button>
        <Button>
          <Glyphicon glyph='stop'></Glyphicon>
        </Button>
        <Button>
          <Glyphicon glyph='repeat'></Glyphicon>
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
    )
  }
}

export default Controls
