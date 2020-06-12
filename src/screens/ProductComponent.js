import React from 'react'

import './product-component.style.scss'

class ProductComponent extends React.Component {
	render() {
		const imageUrl = `http://127.0.0.1:3000/assets/products/${this.props.product.category}/${this.props.product.image}.png`

		return (
			<div className='product'>
				<div className='child image-container'>
					<img className='image' alt='' src={imageUrl} />
				</div>
				<div className='details'>
					<div>{'Ürün: ' + this.props.product.name}</div>
					<div>{'Fiyat: ' + this.props.product.price}</div>
					<div>{'Adet: ' + this.props.product.quantity}</div>
				</div>
				<div className='child'></div>
			</div>
		)
	}
}

export default ProductComponent