import React from 'react'

class Product extends React.Component {
    render() {
        const {
            product
        } = this.props

        return (
            <div className='col-md-12 row m-4 border-bottom bg-light'>
                <div className='col-md-10 d-flex flex-column justify-content-between align-items-center py-2'>
                    <div>{'Ürün: ' + product.name}</div>
                    <div>{'Fiyat: ' + product.price}</div>
                    <div>{'Adet: ' + product.quantity}</div>
                </div>

                <div className='col-md-2'>

                </div>
            </div>
        )
    }
}

export default Product