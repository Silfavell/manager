import React from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'

import Order from './Order'
import Product from './Product'

class Details extends React.Component {
    state = {
        order: null
    }

    UNSAFE_componentWillMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/manager/order/${this.props.match.params.id}`).then(({ data }) => {
            this.setState({ order: data })
        }).catch((err) => {
            console.log('err', err)
        })
    }

    render() {
        if (this.state.order) {
            return (
                <div style={{ height: '100vh', overflowX: 'hidden' }}>
                    <div className='col-md-12 h-100'>
                        <Order order={this.state.order} />
                        {
                            this.state.order.products.map((product) => (
                                <Product product={product} />
                            ))
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div>Lütfen Bekleyin..</div>
            )
        }
    }
}

export default Details