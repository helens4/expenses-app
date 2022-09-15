import { Button, Dropdown, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import '../resources/default-layout.css'

const DefaultLayout = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('expenses-user'))
    const navigate = useNavigate()
    const menu = (
        <Menu items={[
            {
                label: (
                    <li onClick={() => {
                        localStorage.removeItem('expenses-user')
                        navigate('/login')
                    }}>Logout</li>
                )
            }
        ]}
        />
    )

    return (
        <div className='layout'>
            <div className='header d-flex justify-content-between align-items-center'>
                <div>
                    <h1 className='logo'>Expenses</h1>
                </div>
                <div>
                    <Dropdown overlay={menu} placement='bottomLeft'>
                        <button className='primary'>{user.name}</button>
                    </Dropdown>
                </div>
            </div>

            <div className='content'>
                {children}
            </div>

        </div>
    )
}

export default DefaultLayout