import { toast } from 'react-toastify'; 
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UpdateQuestionApi } from '../../../services/ApiServices';
import { MdOutlineAddCircle } from "react-icons/md";    
import _ from 'lodash';
const ManageUpdateQuizz = (props) => {
    const { show, setShow ,dataUpdate} = props;
    const [id,setId] = useState('')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('Student');
    const [img, setImg] = useState('');
    const [previewImg, setPreviewImg] = useState("");
    const handleClose = () => {       
        setShow(false);
        setId("");
        setName("");
        setDescription("");
        setDifficulty("");
        setImg("");
        setPreviewImg("");
        props.resetApi();
         // Reset data for useEffect for updateData
    };
    // console.log(dataUpdate)
    // const handleShow = () => setShow(true);

    useEffect(() => {
        if(!_.isEmpty(dataUpdate)) {
            setId(dataUpdate.id)
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setDifficulty(dataUpdate.difficulty)
            setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
        }
    }, [dataUpdate]);

    const handleUpdateQuizz = async() => {
        const data = await UpdateQuestionApi(id,description,name,difficulty,img);
        // console.log('check' + data);
        /* Add validation off information user */
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListQuizz()
            // await props.fetchListUser();          
            // await props.fetchListUserWithPagination(props.currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    const handleUploadImg = (event) => {
        console.log('ok')
        setImg(event.target.files[0]);
        setPreviewImg(URL.createObjectURL(event.target.files[0]));        // const file = event.target.files[0];
       
    }
    

    
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
                            <label htmlFor="inputEmail4" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputEmail4" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>

                        <div className="col-12">
                            <label htmlFor="username" className="form-label">Description</label>
                            <input type="text" className="form-control" id="username" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputState" className="form-label">Difficulty</label>
                            <select id="inputRole" className="form-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div className="col-12 div-upFile">
                                    {/* <label htmlFor="uploadIMG" className="form-label label-uploadFile"> <MdOutlineAddCircle color='green' />Upload File Image</label> */}
                                    <input type="file" className="form-control" id="uploadIMG" onChange={(event) => handleUploadImg(event)}  />
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
                    <Button variant="primary" onClick={() => { handleClose(); handleUpdateQuizz(); }}>Save Change</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
    
  
export default ManageUpdateQuizz