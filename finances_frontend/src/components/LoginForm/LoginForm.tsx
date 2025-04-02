import PasswordInput from "../PasswordInput/PasswordInput"

const LoginForm = ({register, setRegister}: {register: boolean, setRegister: Function}) => {
	return (
		<form className='login-form' action="post">
			<h1>Login</h1>
			<div className="inputs">
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email"/>
				<label htmlFor="password">Password</label>
				<PasswordInput id="password" />
				<input type="submit" value="Login" />
			</div>

			<p>Need to create an account ? <a onClick={() => setRegister(!register)}>Sign Up</a></p>
		</form>
	)
}

export default LoginForm
