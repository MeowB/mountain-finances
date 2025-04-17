import { useState, useEffect } from "react"
import ModalNewPot from "../../components/ModalNewPot/ModalNewPot"
import './Pots.scss'
import optionDot from '../../assets/option-dot.png'


const Pots = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
	const [pots, setPots] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedPot, setSelectedPot] = useState<any | null>(null)

	const handleClickOutside = (event: MouseEvent) => {
		const modalElement = document.querySelector(".modalNewPot");
		if (modalElement && !modalElement.contains(event.target as Node)) {
			setModalIsOpen(false);
			setSelectedPot(null);
		}
	};

	const handleEdit = (pot: any) => {
		setSelectedPot(pot);
		setModalIsOpen(true);
	};

	const handleDelete = async (potId: string) => {
		const token = localStorage.getItem("token")

		try {
			const response = await fetch(`/api/deletePot/${potId}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})

			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.message || "Something went wrong")
			}

			alert("Pot deleted successfully!")
			setPots(pots.filter(pot => pot.id !== potId))
		} catch (error) {
			console.error(error)
			setError("An unexpected error occurred. Please try again later.")
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const fetchPots = async () => {
			const token = localStorage.getItem("token")
			try {
				const response = await fetch('/api/getPots', {
					method: "GET",
					headers: {
						"Content-type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				})

				const data = await response.json()
				console.log(data)
				if (!response.ok) {
					throw new Error(data.message || "Something went wrong")
				}

				setPots(data)
				setLoading(false)
			} catch (error) {
				console.error(error)
				setError("An unexpected error occurred. Please try again later.")
				setLoading(false)
			}
		}

		fetchPots()
	}, [])

	return (
		<div className="potsPage">
			{modalIsOpen && (
				<div className="modal">
					<ModalNewPot setModalIsOpen={setModalIsOpen} potData={selectedPot} isEditMode={!!selectedPot} />
				</div>
			)}
			<div className="title">
				<h1>Pots</h1>
				<button onClick={() => setModalIsOpen(!modalIsOpen)}>+ Add New Pot</button>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{!loading && !error && (
				<div className="potsList">
					{pots.map(pot => (
						<div key={pot.id} className="potItem">
							<div className="title">
								<div className="text">
									<div className={`potColor ${pot.color}`}></div>
									<p className="potName">{pot.name}</p>
								</div>
								<div className="options">
									<img src={optionDot} alt="" onClick={() => handleEdit(pot)} />
								</div>
							</div>
							<div className="content">
								<div className="text">
									<p>Total Saved</p>
									<p className="potAmount">${pot.total_saved}</p>

								</div>
								<div className="progress">
									<div className="progressBar">
										<div className={`bar ${pot.color}`} style={{ width: `${(pot.total_saved / pot.target_amount) * 100}%` }}></div>
									</div>
									<div className="text">
										<p>${((pot.total_saved / pot.target_amount) * 100).toFixed(2)}%</p>
										<p>Target of ${pot.target_amount}</p>
									</div>
								</div>
							</div>
							<div className="buttons">
								<button>+ Add Money</button>
								<button>Withdraw</button>
								<button onClick={() => handleEdit(pot)}>Edit</button>
								<button onClick={() => handleDelete(pot.id)}>Delete</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Pots
