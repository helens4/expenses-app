import { Form, Modal, Input, Select, message } from 'antd'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'

const AddEditTransaction = ({ setShowAddEdit, getTransactions, selectedItemForEdit, setSelectedItemForEdit }) => {

    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('expenses-user'))
            setLoading(true)
            if (selectedItemForEdit) {
                await axios.post('http://localhost:5001/api/transactions/edit-transaction', {
                    payload: {
                        ...values,
                        userId: user._id
                    },
                    transactionId: selectedItemForEdit._id
                })
                getTransactions()
                message.success('transaction updated successfully')
            } else {
                await axios.post('http://localhost:5001/api/transactions/add-transaction', { ...values, userId: user._id })
                getTransactions()
                message.success('transaction added successfully')
            }
            setShowAddEdit(false)
            setSelectedItemForEdit(null)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            message.error('sth went wrong')
            console.log(error)
        }
    }

    return (
        <Modal
            title='Add Transaction'
            visible={true}
            onCancel={() => setShowAddEdit(false)}
            footer={false}
        >

            {loading && <Spinner />}
            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>

                <Form.Item label='Amount' name='amount'>
                    <Input type='text' />
                </Form.Item>

                <Form.Item label='Type' name='type'>
                    <Select>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expence'>Expence</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Category' name='category'>
                    <Select>
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='freelance'>Freelance</Select.Option>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='investment'>Investment</Select.Option>
                        <Select.Option value='entertainment'>Entertainment</Select.Option>
                        <Select.Option value='travel'>Travel</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='medical'>Medical</Select.Option>
                        <Select.Option value='tax'>Tax</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Date' name='date'>
                    <Input type='date' />
                </Form.Item>

                <Form.Item label='Reference' name='reference'>
                    <Input type='text' />
                </Form.Item>

                <Form.Item label='Description' name='description'>
                    <Input type='text' />
                </Form.Item>

                <div className='d-flex justify-content-end'>
                    <button className='primary' type='submit'>SAVE</button>
                </div>

            </Form>

        </Modal>
    )
}

export default AddEditTransaction