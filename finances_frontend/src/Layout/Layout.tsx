import { Outlet } from "react-router-dom"
import NavMenu from "../components/NavMenu/NavMenu"
import { useState } from "react"
import './Layout.scss'
import { TabProvider } from "../context/TabContext"

const Layout = () => {
	let [isMinimized, setIsMinimized] = useState(false)
	let width = isMinimized ? '50px' : '300px'

	return (
		<main>
			<div className="layout">
				<TabProvider>
					<NavMenu isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
					<div className="gap" style={{ width: width }}></div>


					<div className="content">
						<Outlet />
					</div>
				</TabProvider>
			</div>
		</main>
	)
}

export default Layout
