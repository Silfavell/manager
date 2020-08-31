import React from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

const cookies = new Cookies()

class Order extends React.Component {

    onDetailsClick = () => {
        window.history.pushState({}, null, `/details/${this.props.order._id}`)
        window.location.reload()
    }

    onConfirmClick = () => {
        const message = prompt('Kargo Takip Numarası')

        if (message) {
            if (message.length === 12) {
                axios.put(`${process.env.REACT_APP_API_URL}/manager/orders/confirm/${this.props.order._id}`,
                    { message },
                    { headers: { Authorization: cookies.get('manager-token') } })
                    .then(({ status }) => {
                        if (status === 200) {
                            alert('Sipariş onaylanmıştır.')
                            window.location.reload()
                        }
                    }).catch((reason) => {
                        alert(reason.message)
                    })
            } else {
                alert('Kargo takip numarası hatalı')
            }
        }
    }

    onCancelClick = () => {
        const message = prompt('Iptal Sebebi')

        if (message) {
            if (message.length > 10) {
                axios.put(`${process.env.REACT_APP_API_URL}/manager/orders/cancel/${this.props.order._id}`,
                    { message },
                    { headers: { Authorization: cookies.get('manager-token') } })
                    .then(({ status }) => {
                        if (status === 200) {
                            alert('Sipariş Iptal Edilmiştir.')
                            window.location.reload()
                        }
                    }).catch((reason) => {
                        alert(reason.message)
                    })
            } else {
                alert('Lütfen 10 karaterden uzun iptal sebebi giriniz.')
            }
        }
    }

    onConfirmReturnClick = () => {
        const confirm = window.confirm('Iadeyi onaylıyor musunuz ?')

        if (confirm) {
            axios.put(`${process.env.REACT_APP_API_URL}/manager/orders/accept-return/${this.props.order._id}`, {},
                { headers: { Authorization: cookies.get('manager-token') } })
                .then(({ status }) => {
                    if (status === 200) {
                        alert('Sipariş Iadesi Kabul Edilmiştir.')
                        window.location.reload()
                    }
                }).catch((reason) => {
                    alert(reason.message)
                })
        }
    }

    onCancelReturnClick = () => {
        const message = prompt('Iade Iptal Sebebi')

        if (message) {
            if (message.length > 10) {
                axios.put(`${process.env.REACT_APP_API_URL}/manager/orders/cancel-return/${this.props.order._id}`,
                    { message },
                    { headers: { Authorization: cookies.get('manager-token') } })
                    .then(({ status }) => {
                        if (status === 200) {
                            alert('Iade Iptal Edilmiştir.')
                            window.location.reload()
                        }
                    }).catch((reason) => {
                        alert(reason.message)
                    })
            } else {
                alert('Lütfen 10 karaterden uzun iade iptal sebebi giriniz.')
            }
        }
    }

    renderButton = (title, func) => (
        <div className='form-group row'>
            <div className='col-md-12'>
                <button
                    type='text'
                    onClick={func}
                    className='btn btn-primary btn-block'>{title}</button>
            </div>
        </div>
    )

    getButtons = () => {
        console.log(this.props.order.status)
        switch (this.props.order.status) {
            case 0: return (
                <>
                    {this.renderButton('Onayla', this.onConfirmClick)}
                    {this.renderButton('Iptal Et', this.onCancelClick)}
                </>
            )

            case 5: return (
                <>
                    {this.renderButton('Iadeyi Kabul Et', this.onConfirmReturnClick)}
                    {this.renderButton('Iadet Reddet', this.onCancelReturnClick)}
                </>
            )

            default: return null
        }
    }

    render() {
        const {
            order: {
                customer,
                date,
                address,
                paidPrice
            }
        } = this.props

        return (
            <div className='col-md-12 row m-4 border-bottom'>
                <div className='col-md-10 d-flex flex-column justify-content-between align-items-center py-2'>
                    <div>Alıcı: {customer}</div>
                    <div>Tarih: {new Date(date).toLocaleDateString('tr', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                    <div>Adres: {address}</div>
                    <div>Toplam Ücret: {paidPrice.toFixed(2).replace('.', ',')}</div>
                </div>

                <div className='col-md-2'>
                    <div className='form-group row'>
                        <div className='col-md-12'>
                            {
                                this.renderButton('Detaya Git', this.onDetailsClick)
                            }
                            {
                                this.getButtons()
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order