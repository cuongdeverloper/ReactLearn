import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { doLogin } from '../../../../redux/action/userAction';
import "./Login.scss";
import { ImSpinner9 } from "react-icons/im";
import Particles1 from '../../../ParticlesBG/Particles1';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState(true)
    const [exist, setExist] = useState(false);
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setIsLoadingLogin(true)
        let data = await LoginApi(email, password);
        
        if (data && +data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoadingLogin(false)
            navigate('/');
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoadingLogin(false)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior of the Enter key
            handleSubmit();
        }
    };

    const checkExist = () => {
        if (email !== '' && password !== '' && !confirm) {
            setExist(true);
        } else {
            setExist(false);
        }
    }

    useEffect(() => {
        checkExist();
    }, [email, password, confirm]);

    return (
        // <>
        // <Particles1/>
        // </>
        
        <div className="Login-container">
            <div className='Login-container-parti'>
            <Particles1/>
            </div>
            
            <div className="Login-header">
                <span onClick={() => navigate('/')}> &#60;&#60; Go back home</span>
            </div>
            
            <div className="Login-body">
                <form>
                    <h1 className='form-title'>React JS</h1>
                    <div className="Login-body-social mb-3">
                        <div className="div-icon-social btn btn-primary "><a href="#" className="icon-social"><i ><FaFacebookF /></i></a></div>
                        <div className="div-icon-social btn btn-secondary"><a href="#" className="icon-social"><i ><FaInstagram /></i></a></div>
                        <div className="div-icon-social btn btn-success"><a href="#" className="icon-social"><i ><FaTiktok /></i></a></div>
                    </div>
                    <span>or use your email for registration</span>
                    <div className="Login-body-form mb-2">
                        <div className="form-outline form-input form-email" >
                            <label className="form-label" htmlFor="emailForm">Email</label>
                            <input type="text" id="emailForm" placeholder='email' className="form-control input-field" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="form-outline form-input form-password" >
                            <label className="form-label" htmlFor="passwordForm">Password</label>
                            <input type="password" id="passwordForm" placeholder='password' className="form-control input-field" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={handleKeyDown} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={() => setConfirm(!confirm)} onKeyDown={handleKeyDown} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Confirm the rules</label>
                        </div>
                    </div>
                    <div className="Login-body-buttonSignUp">
                        <button type='button' className='btn-login btn btn-secondary ' onClick={handleSubmit} disabled={!exist}>
                            {isLoadingLogin === true && <ImSpinner9 className="loaderIcon" />}
                            LOGIN
                        </button>
                    </div>
                    <div className="Login-body-forgotPassword">
                        <a href='#'>Forgot password</a>
                    </div>
                    <div className="Login-header-donthaveyet">
                        <label onClick={() => (navigate('/SignUp'))}>Dont have an account yet ?</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
