import React, { useState } from 'react'
import './ModalNewPot.scss'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

const ModalNewPot = ({ setmodalNewPotIsOpen }: { setmodalNewPotIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	// let navigate = useNavigate()
	const [bulletColor, setBulletColor] = useState<string>('green')
	const [formData, setFormData] = useState({
		name: '',
		target_amount: 0,
		color: '',
		total_saved: 0
	})
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBulletColor(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.currentTarget
		const newFormData = {
		  name: (form.elements.namedItem('potName') as HTMLInputElement).value,
		  target_amount: parseFloat((form.elements.namedItem('target') as HTMLInputElement).value),
		  color: (form.elements.namedItem('theme') as HTMLInputElement).value,
		  total_saved: 0,
		};

		setFormData(newFormData)

		if (!validateForm(newFormData)) return

		const token = localStorage.getItem("token")

		try {
			const response = await fetch('/api/addPot', {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify(newFormData)
			})

			const data = await response.json()
			if (!response.ok) {
				if (data.errors) {
					setErrors(data.errors) // Handle server-side validation errors
				} else {
					throw new Error(data.message || "Something went wrong")
				}
				return
			}

			// navigate(0)
			setmodalNewPotIsOpen(false)
		} catch (error) {
			console.error(error)
			setErrors({ general: "An unexpected error occurred. Please try again later." })
		}
	}

	const validateForm = (data: typeof formData) => {
		let newErrors: Record<string, string> = {}

		if (data.name.length === 0) {
			newErrors.potName = "You must provide a pot name"
		}

		if (data.target_amount === 0) {
			newErrors.targetValue = "You must provide a target value"
		}

		setErrors(newErrors)

		return Object.keys(newErrors).length === 0
	}

	return (
		<div className="modalNewPot">
			<h3>Add New Pot</h3>
			<p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>

			<form action="POST" onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="potName">Pot Name</label>
				<input 
					className={errors.potName ? 'red-border' : ''} 
					type="text" 
					name="potName" 
					id="potName" 
					placeholder="e.g. Rainy Days" 
					maxLength={30} 
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				{errors.potName && <p className="error">{errors.potName}</p>}
				<p>{30 - formData.name.length} characters left</p>

				<div className="target">
					<label htmlFor="target">Target</label>
					<input className={errors.targetValue ? 'red-border' : ''} type="text" name="target" id="target" placeholder="e.g. 2000" />
					{errors.targetValue && <p className="error">{errors.targetValue}</p>}
					<p className='dollarPrepend'>$</p>
				</div>
				<label htmlFor="theme">Theme</label>
				<div className="selectColor">
					<select name="theme" id="theme" onChange={(e) => handleColorChange(e)}>
						<option value="green">Green</option>
						<option value="yellow">Yellow</option>
						<option value="cyan">Cyan</option>
						<option value="navy">Navy</option>
						<option value="red">Red</option>
						<option value="purple">Purple</option>
					</select>
					<div className={`bullet ${bulletColor}`}></div>
				</div>

				{errors.general && <p className="error">{errors.general}</p>}
				<input type="submit" value="Add pot" />
			</form>
		</div>
	)
}

export default ModalNewPot
