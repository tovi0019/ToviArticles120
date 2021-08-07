import React from 'react';
import store from './Redux/Store'
import { Provider } from 'react-redux'
import './App.css';
import ViewArticles from './ViewArticles'
import Article from './Article'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'




function App() {

  // const history = createBrowserHistory();
  return (
    <Provider store={store}>
     
      <Router >
        <Switch>
          <div className="App">
          <Route exact path="/" >
              <ViewArticles />
            </Route>
            <Route exact path="/Article" >
              <Article />
            </Route> 
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
