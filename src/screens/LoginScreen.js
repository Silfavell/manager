import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
// import { Link } from 'react-router-dom'

import './login-screen.scss'
import { Link } from 'react-router-dom'

const cookies = new Cookies()

class LoginScreen extends React.Component {
  state = {
    phoneNumber: '905468133191',
    password: '1234',
    wrongPhoneOrPassword: false
  }

  render() {
    // cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im9yZGVycyI6W10sInZlcmlmaWVkIjp0cnVlLCJfaWQiOiI1ZWEwMThmZTk5MGI2MjM0NWM5MjVlZTciLCJwaG9uZV9udW1iZXIiOiIrOTA1NDY4MTMzMTk4IiwibmFtZV9zdXJuYW1lIjoiTXVoYW1tZXQgxLBwZWsiLCJlbWFpbCI6Im11aGFtbWV0aXBlazU3QGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkR2FacmlHMnRGNGt5V2VUMy9XODRWdXV6VElBRnFUc3NQUUFMNi5MOGlPcFU4cTkuQmlJN2UiLCJfX3YiOjB9LCJpYXQiOjE1ODc1NTMwNTJ9.ma6j2gO8RhGM7ZwOZLTLyF1k7QuuiEz8-o8ytGcVgdw')
    // this.props.history.push('/')
    return (
      <div id={'container'}>
        <div className={'center'}>
          {
            this.state.wrongPhoneOrPassword && (
              <div className={'center-child'} style={{ color: 'red' }}>
                Şifre veya telefon numarası yanlış!
              </div>
            )
          }
          <div className={'center-child'}>
            <input
              value={this.state.phoneNumber}
              placeholder={'Phone Number'}
              onChange={(e) => {
                this.setState({ phoneNumber: e.target.value })
              }}
            />
          </div>
          <div className={'center-child'}>
            <input
              value={this.state.password}
              placeholder={'Password'}
              type={'password'}
              onChange={(e) => {
                this.setState({ password: e.target.value })
              }}
            />
          </div>
          <div className={'center-child-2'}>
            <Link to={'/register'} className='btn'>
              Register
            </Link>
            <div
              className='btn'
              onClick={() => {
                axios.post('http://127.0.0.1:3000/login-manager', {
                  phoneNumber: this.state.phoneNumber,
                  password: this.state.password
                }).then((response) => {
                  if (response.data.token) {
                    cookies.set('token', response.data.token)
                    this.props.history.push('/')
                  } else {
                    this.setState({ wrongPhoneOrPassword: true })
                  }
                }).catch(({ response }) => {
                  console.log('err', response)
                  this.setState({ wrongPhoneOrPassword: true })
                })
              }}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginScreen
