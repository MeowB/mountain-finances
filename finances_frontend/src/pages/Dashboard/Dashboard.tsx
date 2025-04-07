const Dashboard = () => {
  return (
	<>
		<h1>THIS IS THE DASHBOARD</h1>
		{Array.from({ length: 50 }).map((_, index) => (
			<div key={index} style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}>
				<h2>Dummy Component {index + 1}</h2>
				<p>This is some dummy content for component {index + 1}.</p>
			</div>
		))}
	</>
  )
}

export default Dashboard
