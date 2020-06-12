import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Screen2 from './screens/Screen2'

import Login from './screens/Login'
import Register from './screens/Register'
import Activation from './screens/Activation'
import Home from './screens/Home'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={'/'} component={Home} />
				<Route path={'/login'} component={Login} />
				<Route path={'/register'} component={Register} />
				<Route path={'/activation'} component={Activation} />


				<Route path={'/details/:id'} component={Screen2} />
			</Switch>
		</BrowserRouter>
	)
}

export default App