import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import App from './app';
import MainPage from './components/mainpage/mainPage';


// using react router 4 --> https://github.com/reactjs/redux/blob/master/docs/advanced/UsageWithReactRouter.md

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <App>
          <Route path='/' exact component={MainPage}/>
          <Route path='/news' component={MainPage}/>
        </App>
      </Switch>
    </Router>
  </Provider>
);

// const News = () => (
//   <Switch>
//     <Route exact path='/news' component={NewsMain}/>
//     <Route exact path='/news/:paginationPage' component={NewsMain}/>
//     <Route exact path='/news/view/:id' component={NewsPage}/>
//   </Switch>
// );

Root.propTypes = {
  store: PropTypes.object
};

export default Root