import { Form, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'antd/lib/input/Input'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Register = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            setLoading(true)
            await axios.post('http://localhost:5001/api/users/register', values)
            message.success('registration successfull')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            message.error('sth went wrong')
            console.log(error)
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
                    <div className='lottie'>
                        <lottie-player
                            src="https://assets1.lottiefiles.com/packages/lf20_06a6pf9i.json"
                            background="transparent"
                            speed="1"
                            loop autoplay>
                        </lottie-player>
                    </div>
                </div>
                <div className='col-md-5'>

                    <h1>App Register</h1>
                    <Form layout='vertical' onFinish={onFinish}>

                        <Form.Item label='Name' name='name'>

                            <Input />

                        </Form.Item>

                        <Form.Item label='Email' name='email'>

                            <Input />

                        </Form.Item>

                        <Form.Item label='Password' name='password'>

                            <Input type='password' />

                        </Form.Item>

                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/login'>Already Registered? Click here to Login</Link>
                            <button className='primary' type='submit'>REGISTER</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register