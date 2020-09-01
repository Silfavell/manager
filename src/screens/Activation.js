import React from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'

class Activation extends React.Component {

    state = {
        activationCode: ''
    }

    onActivationCodeChange = (event) => {
        this.setState({ activationCode: event.target.value })
    }


    onBackToLoginClick = () => {
        this.props.history.push('/login')
    }

    onRegisterClick = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/register-manager`, {
            ...this.props.history.location.state,
            activationCode: this.state.activationCode
        }).then(({ data, status }) => {
            if (status === 200) {
                alert(
                    'Bayi üyeliğiniz yönetici tarafından onaylanınca telefonunuza şifreniz mesaj olarak iletilecektir.'
                )
            }
        }).catch((err) => {
            console.log('err', err.response)
        })
    }

    render() {
        return (
            <div style={{ height: '100vh' }}>
                <div className='col-md-12 h-100 d-flex align-items-center justify-content-center'>
                    <div className='m-4 p-4 w-25 border'>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <input
                                    type='text'
                                    placeholder='Aktivasyon Kodu'
                                    onChange={this.onActivationCodeChange}
                                    value={this.state.activationCode}
                                    className='form-control'
                                />
                            </div>
                        </div>

                        <div className='form-group row'>

                            <div className='col-md-6'>
                                <button
                                    type='text'
                                    onClick={this.onBackToLoginClick}
                                    className='btn btn-primary btn-block'>
                                    Giriş'e Dön
                                </button>
                            </div>

                            <div className='col-md-6'>
                                <button
                                    type='text'
                                    onClick={this.onRegisterClick}
                                    className='btn btn-primary btn-block'>
                                    Kayıt Ol
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Activation