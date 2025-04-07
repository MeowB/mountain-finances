import { useState } from "react"
import PasswordInput from "../PasswordInput/PasswordInput"
import { useNavigate } from "react-router"



const LoginForm = ({ register, setRegister }: { register: boolean, setRegister: Function }) => {
	const [errors, setErrors] = useState<Record<string, string>>({})
	let navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrors({})
		let newErrors: Record<string, string> = {}

		const form = e.currentTarget
		const formData = {
			email: (form.elements.namedItem("email") as HTMLInputElement).value,
			password: (form.elements.namedItem("password") as HTMLInputElement).value,
		}
		
		// Pass formData directly to validateInput
		if (!await validateInput(formData)) return
		

		try {

			const response = await fetch(`/api/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			})
			const data = await response.json()
			if (data.error == 'Invalid credentials') {
				newErrors.password = data.error
				setErrors(newErrors)
				return
			}
			localStorage.setItem('token', data.token)
			navigate('/dashboard')
			

		} catch (error) {
			console.error(error)
		}
	}

	const validateInput = async (validationFormData: { email: string, password: string }) => {
		let newErrors: Record<string, string> = {}

		try {
			const response = await fetch(`/api/getUserByEmail?email=${validationFormData.email}`)
			const data = await response.json()
			console.log(data)
			if (data.error == "User not found") {
				newErrors.email = data.error
				setErrors(newErrors)
				return
			}
		} catch (error) {
			console.error(error);
		}


		// Add validation logic here if needed
		return Object.keys(newErrors).length === 0
	}

	return (
		<form className='login-form' action="post" onSubmit={(e) => handleSubmit(e)}>
			<h1>Login</h1>
			<div className="inputs">
				<label htmlFor="email">Email</label>
				<input className={errors.email ? 'red-border' : ''}  type="email" name="email" id="email" />
				{errors.email && <p className="error">{errors.email}</p>}
				<label htmlFor="password">Password</label>
				<PasswordInput classnames={errors.password ? 'red-border' : ''} id="password" />
				{errors.password && <p className="error">{errors.password}</p>}
				<input type="submit" value="Login" />
			</div>

			<p>Need to create an account ? <a onClick={() => setRegister(!register)}>Sign Up</a></p>
		</form>
	)
}

export default LoginForm
