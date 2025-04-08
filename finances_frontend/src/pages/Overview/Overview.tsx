import './Overview.scss'
import Summary from '../../components/Summary/Summary'
import PotsWidget from '../../components/PotsWidget/PotsWidget'

const Dashboard = () => {
	return (
		<>
			<h1 className='overview-header'>Overview</h1>
			<Summary />

			<div className="widgets">
				<div className="widget-1">
					<PotsWidget />
				</div>
				<div className="widget-2">
					
				</div>
			</div>
		</>
	)
}

export default Dashboard
