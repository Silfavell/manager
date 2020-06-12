import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

import './login-screen.scss'

const cookies = new Cookies()

class RegisterScreen extends React.Component {
  state = {
    phoneNumber: '905468133191',
    nameSurname: 'Muhammet İpek',
    password: '1234',
    email: 'muhammetipek3457@hotmail.com',
    activateScreen: false,
    activationCode: '',
  }

  renderRegister = () => (
    <div className={'center'}>
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
          value={this.state.nameSurname}
          placeholder={'Name Surname'}
          onChange={(e) => {
            this.setState({ nameSurname: e.target.value })
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
      <div className={'center-child'}>
        <input
          value={this.state.email}
          placeholder={'E-mail'}
          onChange={(e) => {
            this.setState({ email: e.target.value })
          }}
        />
      </div>
      <div className={'center-child-2'}>
        <Link to={'/login'} className='btn'>
          Back to login
        </Link>
        <div
          className='btn'
          onClick={() => {
            if (!this.state.activateScreen) {
              axios
                .post('http://127.0.0.1:3000/send-activation-code', {
                  phoneNumber: this.state.phoneNumber,
                  activationCodeType: 2// REGISTER MANAGER
                })
                .then(({ status }) => {
                  if (status === 202) {
                    this.setState({ activateScreen: true })
                  }
                })
                .catch((err) => {
                  console.log('err', err.response.data)
                })
            } else {
              axios
                .post('http://127.0.0.1:3000/register-manager', {
                  phoneNumber: this.state.phoneNumber,
                  nameSurname: 'Muhammet Ipek',
                  password: this.state.password,
                  email: this.state.email,
                  activationCode: this.state.activationCode
                })
                .then((value) => {
                  console.log('value', value)
                  cookies.set('token', value.token)
                })
                .catch((err) => {
                  console.log('err', err.response.data)
                })
            }
          }}
        >
          Register
        </div>
      </div>
    </div>
  )

  renderActivation = () => (
    <div className={'center'}>
      <div className={'center-child'}>
        <input
          value={this.state.activationCode}
          placeholder={'Activation Code'}
          onChange={(e) => {
            this.setState({ activationCode: e.target.value })
          }}
        />
      </div>
      <div className={'center-child-2'}>
        <Link to={'/login'} className='btn'>
          Back to login
        </Link>
        <div
          className='btn'
          onClick={() => {
            axios.post('http://127.0.0.1:3000/register-manager', {
              phoneNumber: this.state.phoneNumber,
              password: this.state.password,
              nameSurname: this.state.nameSurname,
              email: this.state.email,
              activationCode: this.state.activationCode
            }).then(({ data, status }) => {
              console.log(data)
              if (status === 200) {
                alert(
                  'Bayi üyeliğiniz yönetici tarafından onaylanınca telefonunuza şifreniz mesaj olarak iletilecektir.'
                )
              }
            }).catch((err) => {
              console.log('err', err)
            })
          }}
        >
          Register
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <div id={'container'}>
        {!this.state.activateScreen
          ? this.renderRegister()
          : this.renderActivation()}
      </div>
    )
  }
}

export default RegisterScreen
