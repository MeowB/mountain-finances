import './styles/reset.scss'
import './styles/normalize.scss'
import LoginPage from './pages/LoginPage/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Layout from './Layout/Layout'
import Transactions from './pages/Transactions/Transactions'
import Budget from './pages/Budget/Budget'
import Pots from './pages/Pots/Pots'
import RecurringBills from './pages/RecurringBills/RecurringBills'

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<LoginPage />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/transactions' element={<Transactions />} />
					<Route path='/budget' element={<Budget />} />
					<Route path='/pots' element={<Pots />} />
					<Route path='/recurringBills' element={<RecurringBills />} />

				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
