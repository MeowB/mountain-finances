import logo from '../../assets/Logo.png'
import './LoginPage.scss'
import LoginForm from '../../components/LoginForm/LoginForm'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { useState } from 'react'

const LoginPage = () => {
	let [register, setRegister] = useState(false)

	return (
		<>
			<header>
				<div className="front-color">
					<img src={logo} alt="logo" />
				</div>
			</header>
			<main className='login-page'>
				<div className="left">
					<img src={logo} alt="logo" />

					<div className="text">
						<h2>Keep track of your money and save for the future</h2>
						<p>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily</p>
					</div>
				</div>
				{register
					? <RegisterForm register={register} setRegister={setRegister} />
					: <LoginForm register={register} setRegister={setRegister} />
				}
			</main>
		</>
	)
}

export default LoginPage
