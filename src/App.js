import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';


function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component ={Home} />
        <Route exact path="/cart" component ={Cart} />
        <Redirect to="/" component={Home}/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
