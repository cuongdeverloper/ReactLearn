import SideBar from "./SideBar"
import './Admin.scss'
const Admin = (props) => {
    return(
        <div className="Admin-container">
            <div className="Admin-SideBar">
                <SideBar/>
            </div>
            <div className="Admin-content">
                    content here
            </div>
        </div>
    )
}
export default Admin