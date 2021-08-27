import React, {lazy, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from './component/Partial/Header';

const MainPage = lazy(() => import('./component/MainPage/MainPage'));
const DetailPage = lazy(() => import('./component/DetailPage/DetailPage'));
const CollectionPage = lazy(() => import('./component/CollectionPage/CollectionPage'));
const Page404 = lazy(() => import('./component/Page404/Page404'));

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/detail/:name",
    component: DetailPage,
  },
  {
    path: "/collection",
    component: CollectionPage,
  },
  {
    path: "/404",
    component: Page404,
  },
]

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<></>}>
        <Switch>
          {routes.map((route, index) => (
            <Route exact key={index} {...route}/>
          ))}
          <Redirect path="*" to="/404"/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
