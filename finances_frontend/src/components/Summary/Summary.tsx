import './Summary.scss'

const Summary = () => {
	return (

		<section className="summary">
			<div className="current-balance">
				<p>Current Balance</p>
				<p className="money">$4,836.00</p>
			</div>
			<div className="income">
				<p>Income</p>
				<p className="money">$3,814.25</p>
			</div>
			<div className="expenses">
				<p>Expenses</p>
				<p className="money">$1,700.50</p>
			</div>
		</section>
	)
}

export default Summary
