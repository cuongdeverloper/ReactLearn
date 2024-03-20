import { Outlet,useNavigate } from "react-router-dom";
import Particles2 from "../ParticlesBG/Particles2";
import ListQuizz from "./ListQuizz";
import SideBarQuizz from "./SideBarQuizz";
import './User.scss'
import Header from "../../Header/Header";
const User = (props) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/')
    };
    return (
        <div className="User-container">

            <div className="User-sidebar">
                <SideBarQuizz />
            </div>
            

            <div className="User-content">
                <Header />
                <Outlet />

            </div>
            <div className="User-goback">
            <button type="button" className="btn btn-outline-secondary" onClick={()=>goBack()}>Go back</button>
                
            </div>
        </div>
    )
}
export default User;