import { useState, useEffect } from "react"
import ModalNewPot from "../../components/ModalNewPot/ModalNewPot"
import ModalEditPot from "../../components/ModalEditPot/ModalEditPot"
import './Pots.scss'
import ModalDeletePot from "../../components/ModalDeletePot/ModalDeletePot"


const Pots = () => {
	const [modalNewPotIsOpen, setmodalNewPotIsOpen] = useState<boolean>(false)
	const [modalEditPotisOpen, setModalEditPotIsOpen] = useState<boolean>(false)
	const [modalDeletePotisOpen, setModalDeletePotIsOpen] = useState<boolean>(false)
	const [pots, setPots] = useState<any[]>([])
	const [selectedPot, setSelectedPot] = useState<any | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [openTooltipId, setOpenTooltipId] = useState<number | null>(null)

	const handleClickOutside = (event: MouseEvent) => {
		const modalNewElement = document.querySelector(".modalNewPot");
		const modalEditElement = document.querySelector(".modalEditPot");
		const modalDeleteElement = document.querySelector(".modalDeletePot")
		const tooltip = document.querySelector('.tooltip-box')

		if (modalDeleteElement && !modalDeleteElement.contains(event.target as Node)) {
			setModalDeletePotIsOpen(false)
		}
		if (modalNewElement && !modalNewElement.contains(event.target as Node)) {
			setmodalNewPotIsOpen(false);
		}
		if (modalEditElement && !modalEditElement.contains(event.target as Node)) {
			setModalEditPotIsOpen(false);
		}
		if (tooltip && !tooltip.contains(event.target as Node)) {
			setOpenTooltipId(0)
		}
	};

	const handlePotSelection = (pot: any) => {
		setSelectedPot(pot)
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
	}, [modalNewPotIsOpen])

	const toggleTooltip = (id: number) => {
		setOpenTooltipId(prev => (prev === id ? null : id))
	}

	return (
		<div className="potsPage">
			{modalNewPotIsOpen && (
				<div className="modal">
					<ModalNewPot setmodalNewPotIsOpen={setmodalNewPotIsOpen} />
				</div>
			)}

			{modalEditPotisOpen && (
				<div className="modal">
					<ModalEditPot pot={selectedPot} setModalEditPotIsOpen={setModalEditPotIsOpen} />
				</div>
			)}

			{modalDeletePotisOpen && (
				<div className="modal">
					<ModalDeletePot name={selectedPot.name} id={selectedPot.id} setModalDeleteIsOpen={setModalDeletePotIsOpen} /> 
				</div>
			)}

			<div className="title">
				<h1>Pots</h1>
				<button onClick={() => setmodalNewPotIsOpen(!modalNewPotIsOpen)}>+ Add New Pot</button>
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
									<span onClick={() => toggleTooltip(pot.id)}>...
									</span>
									{openTooltipId === pot.id && (
										<div className="tooltip-box">
											<a onClick={() => {
												handlePotSelection(pot);
												setOpenTooltipId(0);
												setModalEditPotIsOpen(!modalEditPotisOpen);
											}}>Edit Pot</a>
											<a onClick={() => {
												handlePotSelection(pot);
												setOpenTooltipId(0);
												setModalDeletePotIsOpen(!modalDeletePotisOpen)
											}}>Delete Pot</a>
										</div>
									)}
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
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Pots
