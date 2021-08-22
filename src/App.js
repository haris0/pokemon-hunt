import React, {lazy, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const MainPage = lazy(() => import('./component/MainPage/MainPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/" component={MainPage}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
