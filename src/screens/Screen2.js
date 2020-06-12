import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import OrderComponent from './OrderComponent'
import ProductComponent from './ProductComponent'

import '../screen2.scss'

const cookies = new Cookies()

class Screen2 extends React.Component {

	state = {
		details: null
	}

	UNSAFE_componentWillMount() {
		console.log(this.props)
		axios.get(`http://127.0.0.1:3000/manager/order/${this.props.match.params.id}`, { headers: { Authorization: cookies.get('token') } }).then(({ data }) => {
			console.log('data', data)
			this.setState({ details: data })
		}).catch((err) => {
			console.log('err', err)
		})
	}

	render() {
		return (
			<div className='screen2'>
				{this.state.details && <OrderComponent details={this.state.details} />}
				<div className='product-container'>
					{
						this.state.details && this.state.details.products.map(product => <ProductComponent product={product} />)
					}
				</div>
			</div>
		)
	}
}

export default Screen2