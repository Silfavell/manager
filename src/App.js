import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Screen1 from './screens/Screen1'
import Screen2 from './screens/Screen2'

import Login from './screens/Login'
import Register from './screens/Register'
import Activation from './screens/Activation'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={'/'} component={Screen1} />
				<Route path={'/details/:id'} component={Screen2} />

				<Route path={'/login'} component={Login} />
				<Route path={'/register'} component={Register} />
				<Route path={'/activation'} component={Activation} />

			</Switch>
		</BrowserRouter>
	)
}

export default App