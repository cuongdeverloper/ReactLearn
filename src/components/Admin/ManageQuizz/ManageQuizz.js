import { useEffect, useState } from 'react';
import './ManageQuizz.scss';
import { MdOutlineAddCircle } from "react-icons/md";
import Select from 'react-select';
import { PostQuestionApi } from '../../../services/ApiServices';
import { toast } from 'react-toastify';
import { GetAllQuestionApi } from '../../../services/ApiServices';
import TableListQuizz from './TableListQuizz';
import Accordion from 'react-bootstrap/Accordion';
import ManageDeleteQuizz from './ManageDeleteQuizz';
import ManageUpdateQuizz from './ManageUpdateQuizz';

const ManageQuizz = () => {
    const [previewImg, setPreviewImg] = useState('');
    const [img, setImg] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate,setDataUpdate] = useState({});
    const [listQuizz, setListQuizz] = useState([]);

    useEffect(() => {
        fetchListQuizz();
    }, []);

    const fetchListQuizz = async () => {
        let res = await GetAllQuestionApi();
        setListQuizz(res.DT);
    }

    const handleUploadImg = (event) => {
        setImg(event.target.files[0]);
        setPreviewImg(URL.createObjectURL(event.target.files[0]));
    }

    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' }
    ];

    const handleSave = async () => {
        let res = await PostQuestionApi(description, name, type?.value, img);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setImg('');
            setType('');
            setDescription('');
        } else {
            toast.error(res.EM);
        }
    }
const resetApi =() =>{
    setDataUpdate({})
}
    const handleButtonModalDeleteUser = (data) => {
        setShowModalDelete(true);
        setDataDelete(data);
    }

    const handleButtonModalUpdateUser = (data) =>{
        setShowModalUpdate(true);
        setDataUpdate(data)
    }
    return (
        <div className="MQ-container">
            <div className="MQ-title mb-3">
                <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add Quiz</Accordion.Header>
                        <Accordion.Body>
                            <fieldset className="border rounded-3 p-3 body-addqz">
                                <legend className="float-none w-auto px-3 body-addqz">ADD QUIZZ</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                                    <label htmlFor="floatingInput">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingDescription" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                                    <label htmlFor="floatingDescription">Description</label>
                                </div>

                                <div className='mb-3'>
                                    <Select
                                        value={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={'Level quizz'} />
                                </div>

                                <div className="col-12 div-upFile">
                                    <label htmlFor="uploadIMG" className="form-label label-uploadFile"> <MdOutlineAddCircle color='green' />Upload File Image</label>
                                    <input type="file" className="form-control" id="uploadIMG" onChange={(event) => handleUploadImg(event)} hidden />
                                </div>

                                <div className="col-12 img-preview mb-3">
                                    {previewImg ? <img src={previewImg} alt="Preview" /> : <label>Preview IMG</label>}
                                </div>
                                <div>
                                    <button type="button" className="btn btn-secondary mb-3" onClick={() => handleSave()}>Save</button>
                                </div>
                            </fieldset>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="MQ-body">
                <TableListQuizz
                    handleButtonModalDeleteUser={handleButtonModalDeleteUser}
                    handleButtonModalUpdateUser={handleButtonModalUpdateUser}
                    fetchListQuizz={fetchListQuizz}
                    listQuizz={listQuizz}
                />

                <ManageDeleteQuizz
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    dataDelete={dataDelete}
                    fetchListQuizz={fetchListQuizz}
                />

                <ManageUpdateQuizz
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    dataUpdate = {dataUpdate}
                    resetApi = {resetApi}
                    fetchListQuizz={fetchListQuizz}
                />
            </div>

            <div className="MQ-footer">
                {/* Footer content here */}
            </div>
        </div>
    );
}

export default ManageQuizz;
