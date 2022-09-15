
import { message, Select, Table, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AddEditTransaction from '../components/AddEditTransaction'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import '../resources/transactions.css'
import Analitics from '../components/Analitics'

const Home = () => {

    const [showAddEdit, setShowAddEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [selectedRange, setSelectedRange] = useState([])
    const [type, setType] = useState('all')
    const [viewType, setViewType] = useState('analytics')
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)


    const { RangePicker } = DatePicker

    const getTransactions = async () => {
        try {
            setLoading(true)
            const user = JSON.parse(localStorage.getItem('expenses-user'))
            const response = await axios.post('http://localhost:5001/api/transactions/get-all-transactions',
                { userId: user._id, frequency, ...(frequency === 'custom' && { selectedRange }), type }
            )
            setData(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            message.error('sth went wrong')
        }

    }

    const deleteTransaction = async (record) => {
        try {
            setLoading(true)
            await axios.post('http://localhost:5001/api/transactions/delete-transaction', { transactionId: record._id })
            message.success('transaction deleted successfully')
            getTransactions()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            message.error('sth went wrong')
        }
    }

    useEffect(() => {
        getTransactions()
    }, [frequency, selectedRange, type])

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date'
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={
                        () => {
                            setSelectedItemForEdit(record)
                            setShowAddEdit(true)
                        }

                    } />
                    <DeleteOutlined onClick={() => deleteTransaction(record)} />
                </div>
            }
        }
    ]

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <div className='filter d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                    <div className='d-flex flex-column mx-5'>
                        <h6>Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value='7'>Last Week</Select.Option>
                            <Select.Option value='30'>Last Month</Select.Option>
                            <Select.Option value='365'>Last 1 Year</Select.Option>
                            <Select.Option value='custom'>Custom</Select.Option>
                        </Select>

                        {frequency === 'custom' && (
                            <div className='mt-2'>
                                <RangePicker
                                    value={selectedRange}
                                    onChange={(values) => setSelectedRange(values)}
                                />
                            </div>
                        )}
                    </div>

                    <div className='d-flex flex-column'>
                        <h6>Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value='all'>All</Select.Option>
                            <Select.Option value='income'>Income</Select.Option>
                            <Select.Option value='expence'>Expense</Select.Option>
                        </Select>

                        {frequency === 'custom' && (
                            <div className='mt-2'>
                                <RangePicker
                                    value={selectedRange}
                                    onChange={(values) => setSelectedRange(values)}
                                />
                            </div>
                        )}
                    </div>

                </div>


                <div className='d-flex'>
                    <div>
                        <div className='view-switch'>
                            <UnorderedListOutlined
                                size={30}
                                className={viewType === 'table' ? 'active-icon' : 'inactive-icon'}
                                onClick={() => setViewType('table')}
                            />
                            <AreaChartOutlined
                                size={30}
                                className={viewType === 'analytics' ? 'active-icon' : 'inactive-icon'}
                                onClick={() => setViewType('analytics')}
                            />
                        </div>

                    </div>

                    <button className='primary' onClick={() => setShowAddEdit(true)}>ADD NEW</button>
                </div>
            </div>



            <div className='table-analitics'>
                {
                    viewType === 'table' ?
                        <div className='table'>
                            <Table columns={columns} dataSource={data} />
                        </div> : <Analitics transactions={data} />
                }


            </div>


            {showAddEdit && <AddEditTransaction
                setShowAddEdit={setShowAddEdit}
                getTransactions={getTransactions}
                selectedItemForEdit={selectedItemForEdit}
                setSelectedItemForEdit={setSelectedItemForEdit}
            />}
        </DefaultLayout>
    )
}

export default Home