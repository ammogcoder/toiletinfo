import React from 'react';
import './App.css';
import './pure-min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages'; 
import map from './pages/map';
import create from './pages/create';
import list from './pages/list';

function App() {
return (
	<Router>
	<Navbar />
	<Switch>
		<Route path='/' exact component={map} />
		<Route path='/create' component={create} />
		<Route path='/list' component={list} /> 
		<Route path='/map' component={map} /> 
	</Switch>
	</Router>
);
}

export default App;
