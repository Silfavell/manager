import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Screen1 from './screens/Screen1'
import Screen2 from './screens/Screen2'
import RegisterScreen from './screens/RegisterScreen'
import Login from './screens/Login'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={'/'} component={Screen1} />
				<Route path={'/login'} component={Login} />
				<Route path={'/register'} component={RegisterScreen} />
				<Route path={'/details/:id'} component={Screen2} />

			</Switch>
		</BrowserRouter>
	)
}

export default App