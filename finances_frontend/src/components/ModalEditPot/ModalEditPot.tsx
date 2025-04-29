import { useState, useEffect } from "react";
import './ModalEditPot.scss'


interface ModalEditPotProps {
	setModalEditPotIsOpen: (isOpen: boolean) => void;
	pot: {
		name: string;
		color: string;
		target_amount: number;
		total_saved: number;
	};
}

const ModalEditPot: React.FC<ModalEditPotProps> = ({ setModalEditPotIsOpen, pot }) => {
	const [name, setName] = useState(pot.name);
	const [color, setColor] = useState(pot.color);
	const [targetAmount, setTargetAmount] = useState(pot.target_amount);
	const [bulletColor, setBulletColor] = useState<string>('green')
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [formData, setFormData] = useState({
		name: pot.name,
		target_amount: pot.target_amount,
		color: pot.color,
		total_saved: pot.total_saved
	})

	// Optional: update form if the pot changes
	useEffect(() => {
		setName(pot.name);
		setColor(pot.color);
		setTargetAmount(pot.target_amount);
	}, [pot]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Submit logic here: e.g. send data to backend
		console.log({ name, color, targetAmount });
		setModalEditPotIsOpen(false); // Close modal after submit
		validateForm(formData)
	};

	const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBulletColor(e.target.value)
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
		<div className="modalEditPot">
			<h2>Edit Pot</h2>
			<p>If your saving targets change, feel free to update your pots.</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="potName">Pot Name</label>
				<input
					className={errors.potName ? 'red-border' : ''}
					type="text"
					name="potName"
					id="potName"
					value={formData.name}
					maxLength={30}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				{errors.potName && <p className="error">{errors.potName}</p>}
				<p>{30 - formData.name.length} characters left</p>

				<label>Target Amount:</label>
				<input
					type="number"
					value={targetAmount}
					onChange={e => setTargetAmount(Number(e.target.value))}
				/>

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


				<button type="submit">Save Changes</button>
			</form>
		</div>
	);
};

export default ModalEditPot;
