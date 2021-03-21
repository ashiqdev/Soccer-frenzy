import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TeamDetail from './components/TeamDetail/TeamDetail';
import Teams from './components/Teams/Teams';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Teams />
        </Route>

        <Route exact path='/team/:id'>
          <TeamDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
