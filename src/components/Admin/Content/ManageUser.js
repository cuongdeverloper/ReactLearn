import ModalManageUser from "./ModalManageUser";
import './ManageUser.scss';
import { useState } from "react";
import TableUsers from "./TableUser";
const ManageUser = (props) => {
    
    const [showHideModalManageUser, setShowHideModalManageUser] = useState(false);
    const funcSetSh = () => {
        setShowHideModalManageUser(true);
    }
    return (
        <div className='ManageUser-container'>
            <div className='Manageuser-header'>
                ManagerUser

            </div>

            <div className='Manageuser-content'>
                <div className="div-btn-addNewUser">
                    <button className="btn btn-primary" onClick={() => funcSetSh()}>Add new user</button>
                </div>

                <div className="div-btn-tableUsers">
                   <TableUsers/>

                    {/* ReactBoostrap Modal */}
                </div>

            </div>
            <ModalManageUser show={showHideModalManageUser}
                setShow={setShowHideModalManageUser} />
        </div>
    );
}
export default ManageUser;