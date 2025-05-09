import { Outlet } from "react-router-dom"
import NavMenu from "../components/NavMenu/NavMenu"
import { useState } from "react"
import './Layout.scss'
import { TabProvider } from "../context/TabContext"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

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
						<ToastContainer />
						<Outlet />
					</div>
				</TabProvider>
			</div>
		</main>
	)
}

export default Layout
