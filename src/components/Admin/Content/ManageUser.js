import ModalManageUser from "./ModalManageUser";
import './ManageUser.scss';
import TableUsers from "./TableUser";
import { useEffect, useState } from "react";
import { GetApi } from "../../../services/ApiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalPreviewUser from "./ModalPreviewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPagination from "./TableUserPagination";
import { GetUserPaginate } from "../../../services/ApiServices";
const ManageUser = () => {

    const [showHideModalManageUser, setShowHideModalManageUser] = useState(false);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showPreviewUser, setShowPreviewUser] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const [dataPreview, setDataPreview] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUser, setListUser] = useState([]);
    const [pageCount, setPageCount] = useState(0);
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

    const handleButtonDeleteUser = (data) => {
        setShowDeleteUser(true);
        setDataDelete(data);
    }
    useEffect(() => {
        fetchListUserWithPagination(1)
    }, [])
    const fetchListUser = async () => {
        let res = await GetApi();
        if (res.EC === 0) {
            setListUser(res.DT)
            //   console.log(res.DT)
        }
        // console.log(listUser)
    }

    const limitUser = 5;
    const fetchListUserWithPagination = async (page) => {
        let res = await GetUserPaginate(page,limitUser);
        if (res.EC === 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
            // console.log("check res ",res.DT)
        }
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

                    {/* <TableUsers listUser={listUser} 
                    handleButtonUpdateUser={handleButtonUpdateUser} 
                    handleButtonPreviewUser={handleButtonPreviewUser}
                    handleButtonDeleteUser={handleButtonDeleteUser}/> */}

                    <TableUserPagination 
                    listUser={listUser} 
                    pageCount={pageCount}
                    handleButtonUpdateUser={handleButtonUpdateUser} 
                    handleButtonPreviewUser={handleButtonPreviewUser}
                    handleButtonDeleteUser={handleButtonDeleteUser}
                    fetchListUserWithPagination={fetchListUserWithPagination}
                    />

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
            <ModalDeleteUser
            show = {showDeleteUser}
            setShow = {setShowDeleteUser}
            dataDelete = {dataDelete}
            fetchListUser={fetchListUser}
            />
        </div>
    );
}
export default ManageUser;