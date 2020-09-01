/* eslint-disable */
import axios from 'axios'
import Cookies from 'universal-cookie'
import VanillaToasts from 'vanillatoasts'

const cookies = new Cookies()

export default () => {
    // Add a request interceptor
    axios.interceptors.request.use((config) => { // Do something before request is sent
        //config.cancelToken = new axios.CancelToken((c) => {
        //    cancel = c
        //})

        if (cookies.get('manager-token')) {
            config.headers.Authorization = cookies.get('manager-token')
        }

        return config
    }, (error) => // Do something with request error
        Promise.reject(error))

    // Add a response interceptor
    axios.interceptors.response.use((response) => // Do something with response data
        response,
        (error) => { // Do something with response error
            if (error.response) {
                if (error.response.status === 401) {
                    VanillaToasts.create({
                        title: `Devam etmeden önce giriş yapmalısınız.`,
                        positionClass: 'topRight',
                        type: 'error',
                        timeout: 5 * 1000
                    })
                } else {
                    VanillaToasts.create({
                        title: error?.response?.data?.error ?? 'Beklenmedik bir hata oluştu, lütfen daha sonra tekrar deneyiniz',
                        positionClass: 'topRight',
                        type: 'error',
                        timeout: 5 * 1000
                    })
                }

                return Promise.reject(error)
            }
        })
}
