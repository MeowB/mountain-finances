import logo from '../../assets/Logo.png'
import image from '../../assets/loginIllustration.svg'
import './LoginPage.scss'
import PasswordInput from '../../components/PasswordInput/PasswordInput'

const LoginPage = () => {
	return (
		<>
			<header>
				<div className="front-color">
					<img src={logo} alt="logo" />
				</div>
			</header>
			<main>
				<div className="left">
					<img src={logo} alt="logo" />

					<div className="text">
						<h2>Keep track of your money and save for the future</h2>
						<p>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily</p>
					</div>
				</div>
				<form className='login-form' action="post">
					<h1>Login</h1>
					<div className="inputs">
						<label htmlFor="email">Email</label>
						<input type="email" />
						<label htmlFor="password">Password</label>
						<PasswordInput />
						<input type="submit" value="Login" />
					</div>

					<p>Need to create an account ? <a href="#">Sign Up</a></p>
				</form>
			</main>
		</>
	)
}

export default LoginPage
