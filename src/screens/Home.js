import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'
import Order from './Order'

const cookies = new Cookies()

class Home extends React.Component {

    state = {
        orders: []
    }

    UNSAFE_componentWillMount() {
        if (!cookies.get('token')) {
            this.props.history.push('/login')
        }

        axios.get(`http://192.168.1.102:3000/manager/orders`, {
            headers: {
                Authorization: cookies.get('token')
            }
        }).then(({ data, status }) => {
            if (status === 200) {
                console.log(data)
                this.setState({ orders: data ?? [] })
            }
        }).catch((err) => {
            console.log(err)
            this.props.history.push('/login')
        })
    }

    render() {
        return (
            <div style={{ height: '100vh', overflowX: 'hidden' }}>
                <div className='col-md-12 h-100'>
                    {
                        this.state.orders.map((order) => (
                            <Order order={order}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Home