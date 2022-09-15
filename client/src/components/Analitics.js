import '../resources/analytics.css'
import { Progress } from 'antd'

const Analitics = ({ transactions }) => {

    const totalTransactions = transactions.length
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income')
    const totalExpenceTransactions = transactions.filter(transaction => transaction.type === 'expence')
    const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length / totalTransactions) * 100
    const totalExpenceTransactionsPercentage = (totalExpenceTransactions.length / totalTransactions) * 100

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = totalIncomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenceTurnover = totalExpenceTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)

    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenceTurnoverPercentage = (totalExpenceTurnover / totalTurnover) * 100

    const categories = ['salary', 'entertainment', 'freelance', 'food', 'travel', 'investment', 'education', 'medical', 'tax']


    return (
        <div className='analytics'>
            <div className='row'>
                <div className='col-md-3 mt-3'>
                    <div className='transactions-count'>
                        <h4>Total transactions: {totalTransactions}</h4>
                        <hr />
                        <h5>Income: {totalIncomeTransactions.length}</h5>
                        <h4>Expence: {totalExpenceTransactions.length}</h4>

                        <div className='progress-bars'>
                            <Progress
                                className='mx-5'
                                strokeColor='green'
                                type='circle'
                                percent={totalIncomeTransactionsPercentage.toFixed(0)}
                            />
                            <Progress
                                strokeColor='red'
                                type='circle'
                                percent={totalExpenceTransactionsPercentage.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mt-3'>
                    <div className='transactions-count'>
                        <h4>Total turnover: {totalTurnover}</h4>
                        <hr />
                        <h5>Income: {totalIncomeTurnover}</h5>
                        <h4>Expence: {totalExpenceTurnover}</h4>

                        <div className='progress-bars'>
                            <Progress
                                className='mx-5'
                                strokeColor='green'
                                type='circle'
                                percent={totalIncomeTurnoverPercentage.toFixed(0)}
                            />
                            <Progress
                                strokeColor='red'
                                type='circle'
                                percent={totalExpenceTurnoverPercentage.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-5'>
                <div className='col-md-6'>
                    <div className='income-category-analysis'>
                        <h3>Income - Category Wise</h3>
                        {categories.map((category) => {
                            const amount = transactions.filter(t => t.type === 'income' && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                            const percent = (amount / totalIncomeTurnover) * 100

                            return (

                                amount > 0 && <div className='category-card'>
                                    <h5>{category}</h5>
                                    <Progress percent={percent.toFixed(0)} />
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='income-category-analysis'>
                        <h3>Expences - Category Wise</h3>
                        {categories.map((category) => {
                            const amount = transactions.filter(t => t.type === 'expence' && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                            const percent = (amount / totalExpenceTurnover) * 100

                            return (

                                amount > 0 && <div className='category-card'>
                                    <h5>{category}</h5>
                                    <Progress percent={percent.toFixed(0)} />
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analitics