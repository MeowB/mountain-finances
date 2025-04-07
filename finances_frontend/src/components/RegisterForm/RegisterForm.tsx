import { useState } from "react"
import PasswordInput from "../PasswordInput/PasswordInput"


const RegisterForm = ({ register, setRegister }: { register: boolean, setRegister: Function }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setErrors({})
		e.preventDefault();

		const form = e.currentTarget;
		const newFormData = {
			username: (form.elements.namedItem("name") as HTMLInputElement).value,
			email: (form.elements.namedItem("email") as HTMLInputElement).value,
			password: (form.elements.namedItem("password") as HTMLInputElement).value,
			confirmPassword: (form.elements.namedItem("confirmPassword") as HTMLInputElement).value
		};
		setFormData(newFormData);

		if (!validateForm()) return

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "Something went wrong");
			}

			alert("Registration successful!");
			setFormData({ username: "", email: "", password: "", confirmPassword: "" }); // Reset form
		} catch (error) {
			alert(error);
		}
	};

	const validateForm = () => {
		let newErrors: Record<string, string> = {};

		if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
			newErrors.username = "Username must be 3-20 characters (letters, numbers, underscores only)";
		}

		if (!/^[\w-]+(\.[\w-]+)*@[\w-]+\.[a-zA-Z]{2,7}$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!/^(?=.*\d).{8,}$/.test(formData.password)) {
			newErrors.password = "Password must be at least 8 characters and contain a number";
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Return `true` if no errors
	};


	return (
		<form className='login-form' action="post" onSubmit={(e) => handleSubmit(e)}>
			<h1>Sign Up</h1>
			<div className="inputs">
				<label htmlFor="name">Name</label>
				<input className={errors.username ? 'red-border' : ''} type="text" name="name" id="name" required />
				{errors.username && <p className="error">{errors.username}</p>}

				<label htmlFor="email">Email</label>
				<input className={errors.email ? 'red-border' : ''} type="email" name="email" id="email" required />
				{errors.email && <p className="error">{errors.email}</p>}

				<label htmlFor="password">Password</label>
				<PasswordInput classnames={errors.password ? 'red-border' : ''} id="password" />
				{errors.password && <p className="error">{errors.password}</p>}

				<label htmlFor="confirmPassword">Confirm Password</label>
				<PasswordInput classnames={errors.confirmPassword ? 'red-border' : ''} id="confirmPassword" />
				{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

				<input type="submit" value="Create an Account" />
			</div>

			<p>Already have an account ? <a onClick={() => setRegister(!register)}>Log in</a></p>
		</form>
	)
}

export default RegisterForm
