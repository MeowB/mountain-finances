import { useState, useEffect } from "react"
import ModalNewPot from "../../components/ModalNewPot/ModalNewPot"
import './Pots.scss'


const Pots = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

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

		</div>
	)
}

export default Pots
