import ModalManageUser from "./ModalManageUser";
import './ManageUser.scss';
import TableUsers from "./TableUser";
import { useEffect, useState } from "react";
import { GetApi } from "../../../services/ApiServices";
const ManageUser = (props) => {

    const [showHideModalManageUser, setShowHideModalManageUser] = useState(false);
    const funcSetSh = () => {
        setShowHideModalManageUser(true);
    }

    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        fetchListUser();
    }, [])
    const fetchListUser = async () => {
        let res = await GetApi();
        if (res.EC === 0) {
            setListUser(res.DT)
            //   console.log(res)
        }
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

                    <TableUsers listUser={listUser} />


                </div>

            </div>
            <ModalManageUser show={showHideModalManageUser}
                setShow={setShowHideModalManageUser}
                fetchListUser={fetchListUser} /> {/* ReactBoostrap Modal */}

        </div>
    );
}
export default ManageUser;