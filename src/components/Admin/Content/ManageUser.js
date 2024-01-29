import ModalManageUser from "./ModalManageUser";
import './ManageUser.scss';
import TableUsers from "./TableUser";
import { useEffect, useState } from "react";
import { GetApi } from "../../../services/ApiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalPreviewUser from "./ModalPreviewUser";
const ManageUser = (props) => {

    const [showHideModalManageUser, setShowHideModalManageUser] = useState(false);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showPreviewUser, setShowPreviewUser] = useState(false);
    const [dataPreview, setDataPreview] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [listUser, setListUser] = useState([]);
    const funcSetSh = () => {
        setShowHideModalManageUser(true);
    }

    const handleButtonPreviewUser = (data) => {
        setShowPreviewUser(true);
        setDataPreview(data)
        // console.log(data)
        // console.log(dataPreview)
    }
    const handleButtonUpdateUser = (data) => {
        setShowUpdateUser(true);
        setDataUpdate(data);
    }


    useEffect(() => {
        fetchListUser();
    }, [])
    const fetchListUser = async () => {
        let res = await GetApi();
        if (res.EC === 0) {
            setListUser(res.DT)
            //   console.log(res)
        }
        // console.log(listUser)
    }

    const resetApi = () => {
        setDataUpdate({});
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

                    <TableUsers listUser={listUser} 
                    handleButtonUpdateUser={handleButtonUpdateUser} 
                    handleButtonPreviewUser={handleButtonPreviewUser}/>

                </div>

            </div>
            <ModalManageUser show={showHideModalManageUser}
                setShow={setShowHideModalManageUser}
                fetchListUser={fetchListUser} />  
                {/* / Render lai user/ */}

            <ModalUpdateUser show={showUpdateUser}
                setShow={setShowUpdateUser}
                dataUpdate={dataUpdate}
                resetApi={resetApi}
                fetchListUser={fetchListUser}
            />
            <ModalPreviewUser
            show={showPreviewUser}
            setShow={setShowPreviewUser}
            dataPreview={dataPreview}
            fetchListUser={fetchListUser}
            resetApi={resetApi}
            />
        </div>
    );
}
export default ManageUser;