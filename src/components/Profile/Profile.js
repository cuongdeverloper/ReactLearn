import Header from '../../Header/Header'
import { GiWizardFace } from "react-icons/gi";
import { IoIosKey } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";
import { IoMdLock } from "react-icons/io";
import './Profile.scss'
import { useDispatch, useSelector } from 'react-redux';
import { ApiChangePassword,ApiUpdateProfile } from '../../services/ApiServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import _ from 'lodash';
import { MdOutlineAddCircle } from 'react-icons/md';
const Profile = () => {
    const [userName,setUserName] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [previewIMG,setPreviewIMG] = useState('')
    const [img, setImg] = useState('');
    const getDatRedux = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const handleChangePassword = async () => {
        const res = await ApiChangePassword(currentPassword, newPassword);
        console.log(res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
    }

    const handleChangeImage = (event) => {
        setImg(event.target.files[0]);
        setPreviewIMG(URL.createObjectURL(event.target.files[0]));        
    }

    const handleUpdateProfile = async() =>{
        const res = await ApiUpdateProfile(userName,img);
        // dispatch(doLogin(res))
        console.log(res)
    }

    useEffect(() => {
        if(!_.isEmpty(getDatRedux)) {    
            setPreviewIMG(`data:image/jpeg;base64,${getDatRedux.image}`);
        }
        
    }, [getDatRedux]);
    
    return (
        <div className="Profile-container">
            <div className="Profile-header">
                <Header />
            </div>

            <div className="Profile-content container-fluid row">
                <div className="Profile-ctLeft  col-3 ">
                    <div className='fixed-ctLeft'>
                        <h3>Manage account</h3>
                        <div className='internal-content'>
                            <ul className='internal-content-ul'>
                                <li>
                                    <a>
                                        <span><GiWizardFace /></span>
                                        <span>React ID</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <span><IoIosInformationCircle /></span>
                                        <span>Personal information</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <span><IoIosKey /></span>
                                        <span>Account sign-in</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <span><IoMdLock /></span>
                                        <span>Login management</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>

                <div className="Profile-ctRight border col-9">
                    <div className='table-information row'>
                        <div className='table-left col-5'>
                            <h4>REACT ID</h4>
                            <p>Involves players assuming different identities or roles,</p>
                        </div>
                        <div className='table-right table-1 col-7'>
                            <div className="form-floating form-1">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" defaultValue={getDatRedux.username} onChange={(event) => setUserName(event.target.value)}></textarea>
                                <label htmlFor="floatingTextarea" >Your name</label>
                            </div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={previewIMG} />
                                <Card.Body>
                                    <Card.Title>{getDatRedux.username}</Card.Title>
                                    <label htmlFor="uploadIMG" className="form-label label-uploadFile"> <MdOutlineAddCircle color='green' />Change image</label>
                                    <input type="file" className="form-control" id="uploadIMG" onChange={(event) => handleChangeImage(event)} hidden />
                                </Card.Body>
                            </Card>
                            <button className='btn btn-success btn-scss' onClick={() => handleUpdateProfile()}>Save change</button>
                        </div>
                    </div>

                    <div className='table-2 table-information row'>
                        <div className='table-left col-5'>
                            <h4>Personal information</h4>
                            <p>This information is private and will not be shared with other players. Read the Riot Privacy Notice anytime</p>
                        </div>
                        <div className='table-right col-7'>

                            <div className="form-floating ff-100">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" defaultValue={getDatRedux.email} disabled></textarea>
                                <label htmlFor="floatingTextarea">Email</label>
                            </div>


                            <div className='ff-50-div'>
                                <div className="form-floating ff-50">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" defaultValue={'VN'} disabled></textarea>
                                    <label htmlFor="floatingTextarea">Country</label>
                                </div>
                                <div className="form-floating ff-50">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" defaultValue={getDatRedux.role}></textarea>
                                    <label htmlFor="floatingTextarea">Role</label>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='table-information row'>
                        <div className='table-left col-5'>
                            <h4>Account Sign-in</h4>
                            <p>Change your password</p>
                        </div>
                        <div className='table-right col-7'>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="currentPassword" placeholder="Password" defaultValue={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
                                <label htmlFor="currentPassword">Current Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="newPassword" placeholder="Password" defaultValue={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                                <label htmlFor="floatingNewPassword">New Password</label>
                            </div>

                            <button className='btn btn-success btn-scss' onClick={() => handleChangePassword()}>Save change</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
export default Profile