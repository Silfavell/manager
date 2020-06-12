import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

import './order-component.style.scss'

const cookies = new Cookies()

class OrderComponent extends React.Component {

	state = {
		gonnaConfirm: false,
		gonnaCancel: false,
		trackingNumber: '',
		cancellationReason: ''
	}

	back = () => {
		this.setState({
			gonnaConfirm: false,
			gonnaCancel: false
		})
	}

	gonnaConfirm = () => {
		this.setState({
			gonnaConfirm: true
		})
	}

	gonnaCancel = () => {
		this.setState({
			gonnaCancel: true
		})
	}

	onConfirmClick = () => {
		if (this.state.trackingNumber.length === 12) {
			axios.put(`http://127.0.0.1:3000/manager/orders/confirm/${this.props.details._id}`, { trackingNumber: this.state.trackingNumber }, { headers: { Authorization: cookies.get('token') } })
				.then(val => {
					this.setState({ gonnaConfirm: false })
				}).catch((reason) => {
					alert(reason.message)
				})
		} else {
			alert('Kargo takip numarası hatalı')
		}
	}

	onCancelClick = () => {
		if (this.state.cancellationReason.length > 10) {
			axios.put(`http://127.0.0.1:3000/manager/orders/cancel/${this.props.details._id}`, { cancellationReason: this.state.cancellationReason }, { headers: { Authorization: cookies.get('token') } })
				.then(val => {
					this.setState({ gonnaCancel: false })
				}).catch((reason) => {
					alert(reason.message)
				})
		} else {
			alert('Lütfen 10 karaterden uzun iptal sebebi giriniz')
		}
	}

	renderButtons = () => (
		<>
			<Link to={{ pathname: `/details/${this.props.details._id}` }}>
				<div className='button'>
					Detaya git
						</div>
			</Link>
			<div className='button' onClick={this.gonnaConfirm}>Onayla (Kargo no)</div>
			<div className='button' onClick={this.gonnaCancel}>İptal et (İptal sebebi)</div>
		</>
	)

	renderConfirm = () => (
		<>
			<input
				value={this.state.trackingNumber}
				onChange={(e) => {
					this.setState({ trackingNumber: e.target.value })
				}}
				className='input' />
			<div className='button' onClick={this.onConfirmClick}>Siparişi onayla</div>
			<div className='button' onClick={this.back}>Geri</div>
		</>
	)

	renderCancel = () => (
		<>
			<input
				value={this.state.cancellationReason}
				onChange={(e) => {
					this.setState({ cancellationReason: e.target.value })
				}}
				className='input' />
			<div className='button' onClick={this.onCancelClick}>Siparişi iptal et</div>
			<div className='button' onClick={this.back}>Geri</div>
		</>
	)

	renderRight = () => {
		if (this.state.gonnaConfirm) {
			return this.renderConfirm()
		} else if (this.state.gonnaCancel) {
			return this.renderCancel()
		} else {
			return this.renderButtons()
		}
	}

	render() {
		return (
			<div className='order-component'>
				<div className='child2 image-container'>
					<img className='image' alt='' src={'http://127.0.0.1:3000/assets/loading.gif'} />
				</div>
				<div className='details'>
					<div>Alıcı: {this.props.details.customer}</div>
					<div>Tarih: {new Date(this.props.details.date).toLocaleDateString('tr', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
					<div>Adres: {this.props.details.address}</div>
					<div>Ürünler: {this.props.details.products.map(product => product?.name + ' x ' + product?.quantity + ' ')}</div>
				</div>
				<div className='child2 button-container'>
					{this.renderRight()}
				</div>
			</div>
		)
	}
}

export default OrderComponent