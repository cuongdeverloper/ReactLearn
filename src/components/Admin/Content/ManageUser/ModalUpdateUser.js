import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineAddCircle } from "react-icons/md";
import _ from 'lodash';
import './ManageUser.scss';
import { toast } from 'react-toastify'; 
import {UpdateApi} from '../../../../services/ApiServices'

const ModalUpdateUser = (props) => {
    const { show, setShow ,dataUpdate} = props;
    const handleClose = () => {       
        setShow(false);
        setEmail("");
        setUserName("");
        setRole("");
        setImg("");
        setPreviewImg("");
        props.resetApi();
         // Reset data for useEffect for updateData
    };
    // const handleShow = () => setShow(true);

    useEffect(() => {
        if(!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setRole(dataUpdate.role);
            setUserName(dataUpdate.username)
            setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
        }
    }, [dataUpdate]);

    const handleUpdateUser = async() => {
        const data = await UpdateApi(dataUpdate.id,username,role,img);
        // console.log('check' + resAdd.data);
        /* Add validation off information user */
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser();
            
            await props.fetchListUserWithPagination(props.currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    const handleUploadImg = (event) => {
        setImg(event.target.files[0]);
        setPreviewImg(URL.createObjectURL(event.target.files[0]));        // const file = event.target.files[0];
       
    }
    const [email, setEmail] = useState('');
    // const [password, setPassWord] = useState('');
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('Student');
    const [img, setImg] = useState('');
    const [previewImg, setPreviewImg] = useState("");

    
    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-addNewUser'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">

                        <div className="col-md-12">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(event) => setEmail(event.target.value)} disabled/>
                        </div>

                        <div className="col-12">
                            <label htmlFor="username" className="form-label">User name</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputState" className="form-label">ROLE</label>
                            <select id="inputRole" className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option>Student</option>
                                <option>Lecturer</option>
                                <option>Viewer</option>
                            </select>
                        </div>
                        <div className="col-12 div-upFile">
                            <label htmlFor="uploadIMG" className="form-label label-uploadFile"> <MdOutlineAddCircle color='green' />Upload File Image</label>
                            <input type="file" className="form-control" id="uploadIMG" onChange={(event) => handleUploadImg(event)} hidden />

                        </div>
                        <div className="col-12 img-preview" >{
                            previewImg ? <img src={previewImg} /> : <label>Preview IMG</label>
                        }
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" htmlFor="gridCheck" >
                                    Check me out
                                </label>
                            </div>
                        </div>                
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose(); handleUpdateUser(); }}>Save Change</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;