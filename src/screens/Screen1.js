import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import OrderComponent from './OrderComponent'
import '../screen1.scss'

const cookies = new Cookies()

class Screen1 extends React.Component {
  state = {
    orders: [],
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
        this.setState({ orders: data ? Object.values(data) : [] })
      }
    }).catch((err) => {
      console.log(err)
      this.props.history.push('/login')
    })
  }

  render() {
    return (
      <div className='screen1'>
        {this.state.orders.map((order) => (
          <OrderComponent details={order} />
        ))}
      </div>
    )
  }
}

export default Screen1
