import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import _landing from './_comp/_landing';
import _userPanel from './_comp/_userPanel';
import ComingSoonPage from './_comp/_comingSoon';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <_landing />
          </Route>
          <Route path="/user/:userId">
            <_userPanel />
          </Route>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
