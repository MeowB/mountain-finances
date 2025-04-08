import './styles/reset.scss'
import './styles/normalize.scss'
import LoginPage from './pages/LoginPage/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Overview/Overview'
import Layout from './Layout/Layout'
import Transactions from './pages/Transactions/Transactions'
import Budget from './pages/Budget/Budget'
import Pots from './pages/Pots/Pots'
import RecurringBills from './pages/RecurringBills/RecurringBills'
import ProtectedRoute from './wrapper/ProtectedRoute'

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LoginPage />} />

				<Route element={<Layout />}>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/transactions'
						element={
							<ProtectedRoute>
								<Transactions />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/budget'
						element={
							<ProtectedRoute>
								<Budget />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/pots'
						element={
							<ProtectedRoute>
								<Pots />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/recurringBills'
						element={
							<ProtectedRoute>
								<RecurringBills />
							</ProtectedRoute>
						}
					/>

				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
