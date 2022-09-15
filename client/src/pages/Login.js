import { Form, message } from 'antd'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'antd/lib/input/Input'
import '../resources/authentication.css'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:5001/api/users/login', values)
            console.log(response)
            localStorage.setItem('expenses-user', JSON.stringify({ ...response.data, password: '' }))
            message.success('login successfull')
            setLoading(false)
            navigate('/')

        } catch (error) {
            message.error('login failed')
            setLoading(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('expenses-user')) {
            navigate('/')
        }
    }, [])

    return (
        <div className='register'>
            {loading && <Spinner />}
            <div className='row justify-content-center align-items-center w-100 h-100'>

                <div className='col-md-5'>

                    <h1>App Login</h1>
                    <Form layout='vertical' onFinish={onFinish}>

                        <Form.Item label='Email' name='email'>

                            <Input />

                        </Form.Item>

                        <Form.Item label='Password' name='password'>

                            <Input type='password' />

                        </Form.Item>

                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/register'>Have no account? Click here to Register</Link>
                            <button className='primary' type='submit'>LOGIN</button>
                        </div>
                    </Form>
                </div>
                <div className='col-md-5'>
                    <div className='lottie'>
                        <lottie-player
                            src="https://assets1.lottiefiles.com/packages/lf20_06a6pf9i.json"
                            background="transparent"
                            speed="1"
                            loop autoplay>
                        </lottie-player>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login