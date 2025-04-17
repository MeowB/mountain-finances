import { useState, useEffect } from "react"
import ModalNewPot from "../../components/ModalNewPot/ModalNewPot"
import ModalEditPot from "../../components/ModalEditPot/ModalEditPot"
import ModalDeletePot from "../../components/ModalDeletePot/ModalDeletePot"
import TooltipMenu from "../../components/TooltipMenu/TooltipMenu"
import './Pots.scss'
import optionDot from '../../assets/option-dot.png'


const Pots = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
	const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false)
	const [selectedPot, setSelectedPot] = useState<any>(null)
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

	const handleEdit = (potData: any) => {
		setSelectedPot(potData);
		setEditModalIsOpen(true);
	};

	const handleDelete = (potData: any) => {
		setSelectedPot(potData);
		setDeleteModalIsOpen(true);
	};

	const handleDeleteConfirm = async (id: number) => {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(`/api/deletePot/${id}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			});

			if (!response.ok) {
				throw new Error("Failed to delete pot");
			}

			setPots(pots.filter(pot => pot.id !== id));
		} catch (error) {
			console.error(error);
			setError("An unexpected error occurred. Please try again later.");
		}
	};

	return (
		<div className="potsPage">
			{modalIsOpen && (
				<div className="modal">
					<ModalNewPot setModalIsOpen={setModalIsOpen} />
				</div>
			)}
			 {editModalIsOpen && selectedPot && (
				<div className="modal">
					<ModalEditPot setModalIsOpen={setEditModalIsOpen} potData={selectedPot} />
				</div>
			)}
			{deleteModalIsOpen && selectedPot && (
				<div className="modal">
					<ModalDeletePot setModalIsOpen={setDeleteModalIsOpen} potData={selectedPot} handleDelete={handleDeleteConfirm} />
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
									<TooltipMenu potData={pot} onEdit={handleEdit} onDelete={handleDelete} />
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
