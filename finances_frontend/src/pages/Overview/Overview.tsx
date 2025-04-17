import './Overview.scss'
import Summary from '../../components/Summary/Summary'
import PotsWidget from '../../components/PotsWidget/PotsWidget'

const Dashboard = () => {
	const handleEdit = (pot) => {
		// Implement the handleEdit function
	};

	const handleDelete = (potId) => {
		// Implement the handleDelete function
	};

	return (
		<>
			<h1 className='overview-header'>Overview</h1>
			<Summary />

			<div className="widgets">
				<div className="widget-1">
					<PotsWidget onEdit={handleEdit} onDelete={handleDelete} />
				</div>
				<div className="widget-2">
					
				</div>
			</div>
		</>
	)
}

export default Dashboard
