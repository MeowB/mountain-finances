import { useState, useEffect } from "react"
import ModalNewPot from "../../components/ModalNewPot/ModalNewPot"
import './Pots.scss'
import { Link } from 'react-router-dom'


const Pots = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
	const [pots, setPots] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const handleClickOutside = (event: MouseEvent) => {
		const modalElement = document.querySelector(".modalNewPot");
		if (modalElement && !modalElement.contains(event.target as Node)) {
			setModalIsOpen(false);
		}
	};

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
					<ModalNewPot setModalIsOpen={setModalIsOpen} />
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
							<p className="potName">{pot.name}</p>
							<p className="potAmount">${pot.total_saved}</p>
							<div className="potColor" style={{ backgroundColor: pot.color }}></div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Pots
