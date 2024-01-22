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

    const handleSaveAddUser = async () => {
        // Validate
        // const validateEmail = (email) => {
        //     return String(email)
        //         .toLowerCase()
        //         .match(
        //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //         );
        // };

        // const isValidEmail = validateEmail(email);
        // if (!isValidEmail) {
        //     toast.warning("Invalid email !", {
        //         position: toast.POSITION.TOP_CENTER,
        //     })
        //     return;
        // }

        const data = await AppendApi(email, password,username,role,img);
        // console.log('check' + resAdd.data);


        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);

        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                ADD USER
            </Button> */}
            {/* ReactBoostrap Modal */}
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
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword4" value={password} onChange={(event) => setPassWord(event.target.value)} />
                        </div>

                        <div class="col-12">
                            <label for="username" class="form-label">User name</label>
                            <input type="text" class="form-control" id="username" value={username} onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div class="col-md-4">
                            <label for="inputState" class="form-label">You are ... ?</label>
                            <select id="inputState" class="form-select">
                                <option selected value='male'>MALE</option>
                                <option value='female'>FEMALE</option>
                                <option value='anotherSex' disabled>Another</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="inputState" class="form-label">ROLE</label>
                            <select id="inputState" class="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option selected>Student</option>
                                <option>Lecturer</option>
                                <option>Viewer</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label for="inputZip" class="form-label">Zip</label>
                            <input type="text" class="form-control" id="inputZip" />
                        </div>
                        <div class="col-12 div-upFile">
                            <label htmlFor="uploadIMG" class="form-label label-uploadFile"> <MdOutlineAddCircle color='green' />Upload File Image</label>
                            <input type="file" class="form-control" id="uploadIMG" onChange={(event) => handleUploadImg(event)} hidden />

                        </div>
                        <div class="col-12 img-preview" >{
                            previewImg ? <img src={previewImg} /> : <label>Preview IMG</label>
                        }
                        </div>
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck" />
                                <label class="form-check-label" for="gridCheck" >
                                    Check me out
                                </label>
                            </div>
                        </div>
                        {/* <div class="col-12">
                            <button type="submit" class="btn btn-primary">Sign in</button>
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