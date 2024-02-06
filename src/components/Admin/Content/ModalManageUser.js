import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineAddCircle } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AppendApi } from '../../../services/ApiServices';

const ModalManageUser = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassWord("");
        setUserName("");
        setRole("");
        setImg("");
        setPreviewImg("");
    };
    // const handleShow = () => setShow(true);

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [username, setUserName] = useState('');
    const [role, setRole] = useState('Student');
    const [img, setImg] = useState('');
    const [previewImg, setPreviewImg] = useState("");

    const handleUploadImg = (event) => {
        setImg(event.target.files[0]);
        setPreviewImg(URL.createObjectURL(event.target.files[0]));
    }

    // const validateEmail = (email) => {
    //     return String(email)
    //       .toLowerCase()
    //       .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       );
    //   };

    const handleSaveAddUser = async () => {
        const data = await AppendApi(email, password,username,role,img);
        // console.log('check' + resAdd.data);
        /* Add validation off information user */
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser();
            props.setCurrentPage(1);
            await props.fetchListUserWithPagination(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
        {/* Bstrap Modal + Form */}
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-addNewUser'>
                <Modal.Header closeButton>
                    <Modal.Title>ADD NEW USER </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* ReactBoostrap5 Form(LAYOUT) */}
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" value={password} onChange={(event) => setPassWord(event.target.value)} />
                        </div>

                        <div className="col-12">
                            <label htmlFor="username" className="form-label">User name</label>
                            <input type="text" className="form-control" id="username" value={username} onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">You are ... ?</label>
                            <select id="inputSex" className="form-select">
                                <option value='male'>MALE</option>
                                <option value='female'>FEMALE</option>
                                <option value='anotherSex' disabled>Another</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">ROLE</label>
                            <select id="inputRole" className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option selected>Student</option>
                                <option>Lecturer</option>
                                <option>Viewer</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="inputZip" />
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
                        {/* <div className="col-12">
                            <button type="submit" defaultValue="btn btn-primary">Sign in</button>
                        </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose(); handleSaveAddUser(); }}>
                        Saving
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalManageUser;