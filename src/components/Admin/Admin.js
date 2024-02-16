import SideBar from "./SideBar"
import './Admin.scss'
import Header from "../../Header/Header"
import { Outlet } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
const Admin = (props) => {
   
    return(
        <div className="Admin-container">
            <div className="Admin-SideBar">
                <SideBar/>
            </div>
            <div className="Admin-content">
                <Header/>
                    <Outlet/>
            </div>
            
      
        </div>
    )
}
export default Admin