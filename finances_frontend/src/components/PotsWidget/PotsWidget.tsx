import { Link } from "react-router-dom"
import greenMoneyBag from '../../assets/greenMoneyBag.svg'
import './PotsWidget.scss'
import { useTab } from '../../context/TabContext'

const PotsWidget = ({ pots, onEdit, onDelete }) => {
	const { setActiveTab } = useTab()

	return (
		<div className="pots">
			<div className="top">
				<h2>Pots</h2>
				<Link to='/pots' onClick={() => setActiveTab(3)}>See Details ►</Link>
			</div>
			<div className="bottom">
				<div className="left">
					<div className="img">
						<img src={greenMoneyBag} alt="money bag" />
					</div>
					<div className="text">
						<p>Total Saved</p>
						<p className="money">$850</p>
					</div>

				</div>
				<div className="right">
						{pots.map(pot => (
							<div key={pot.id} className="single-pot">
								<div className="left-line"></div>
								<p>{pot.name}</p>
								<p className="money">${pot.total_saved}</p>
								<button onClick={() => onEdit(pot)}>Edit</button>
								<button onClick={() => onDelete(pot.id)}>Delete</button>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default PotsWidget
