import { Link } from "react-router-dom"
import greenMoneyBag from '../../assets/greenMoneyBag.svg'
import './PotsWidget.scss'
import { useTab } from '../../context/TabContext'

const PotsWidget = () => {
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
					<div className="single-pot">
						<div className="left-line"></div>
						<p>Savings</p>
						<p className="money">$159</p>
					</div>
					<div className="single-pot">
						<div className="left-line"></div>
						<p>Gift</p>
						<p className="money">$40</p>
					</div>
					<div className="single-pot">
						<div className="left-line"></div>
						<p>Concert Tickets</p>
						<p className="money">$110</p>
					</div>
					<div className="single-pot">
						<div className="left-line"></div>
						<p>New Laptop</p>
						<p className="money">$10</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PotsWidget
