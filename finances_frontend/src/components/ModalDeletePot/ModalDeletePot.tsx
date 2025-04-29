import './ModalDeletePot.scss'

const ModalDeletePot = ({name, id, setModalDeleteIsOpen}: {name: string, id: number, setModalDeleteIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
	console.log(id)

	return (
	<div className="modalDeletePot">
		<h3>Delete '{name}'?</h3>
		<p>Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>

		<button className='deleteButton'>Yes, Confirm deletion</button>
		<button onClick={() => setModalDeleteIsOpen(false)}>No, go Back</button>
	</div>
  )
}

export default ModalDeletePot
