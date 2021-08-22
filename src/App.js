import React, {lazy, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const MainPage = lazy(() => import('./component/MainPage/MainPage'));
const Page404 = lazy(() => import('./component/Page404/Page404'))

function App() {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/404" component={Page404}/>
          <Redirect path="*" to="/404"/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
