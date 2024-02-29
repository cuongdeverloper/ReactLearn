import Particles2 from "../ParticlesBG/Particles2";
import ListQuizz from "./ListQuizz";
import './User.scss'
const User = (props) => {
    return (
        <div className="User-container">
            <div className="User-content">
                
                <Particles2 />
                <ListQuizz/>
            </div>

        </div>
    )
}
export default User;