import SideBar from "./SideBar"
import './Admin.scss'
import Header from "../../Header/Header"
import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = (props) => {
   
    return(
        <div className="Admin-container">
            <div className="Admin-SideBar">
                <SideBar/>
            </div>
            <div className="Admin-content">
                {/* <Header/> */}
                    <Outlet/>
            </div>
            
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"          
        />
        </div>
    )
}
export default Admin