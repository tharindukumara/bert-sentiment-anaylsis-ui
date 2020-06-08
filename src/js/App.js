import React from 'react'
import Home from './containers/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grommet } from 'grommet';

class App extends React.Component {
  render() {
    return (
      <div>
         <Grommet theme='grommet'>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/:url" component={Home} />
            </Switch>
          </Router>
        </Grommet>
        
      </div>
    )
  }
}

export default App;