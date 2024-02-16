import React, { useState,useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Login.scss";
import Header from "../../../../Header/Header";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import _ from 'lodash';
import { LoginApi } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
// import { initMDB,Input } from "mdb-ui-kit";

// Import phần UI
// initMDB({ Input });

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [exist, setExist] = useState(false);
    const navigate = useNavigate();
    const goBackHome = () => {
        navigate('/')
    }
    const handleSubmit = async() => {
        let data = await LoginApi(email, password);
        // console.log("check>>", data)
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            navigate('/')
            
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    
    const checkExist = () => {
        if (email !== '' && password !== '') {
            setExist(true);
        } else {
            setExist(false);
        }
    }
    useEffect(() => {
        checkExist();
    }, [email, password]);

    return (
        <div className="Login-container">
           
            <div className="Login-header">
                {/* <Header /> */}
                <span onClick={() => goBackHome()}> &#60;&#60; Go back home</span>

            </div>

            <div className="Login-body">
                <form>
                    <h1>React JS</h1>
                    <div className="Login-body-social mb-3">
                        <div className="div-icon-social btn btn-primary "><a href="#" className="icon-social"><i ><FaFacebookF /></i></a></div>
                        <div className="div-icon-social btn btn-secondary"><a href="#" className="icon-social"><i ><FaInstagram /></i></a></div>
                        <div className="div-icon-social btn btn-success"><a href="#" className="icon-social"><i ><FaTiktok /></i></a></div>
                    </div>
                    <span>or use your email for registration</span>
                    <div className="Login-body-form mb-2">
                        <div className="form-outline form-input form-email" >
                            <label className="form-label" htmlFor="emailForm">Email</label>
                            <input type="text" id="emailForm" placeholder='email' className="form-control input-field" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                        </div>
                        <div className="form-outline form-input form-password" >
                            <label className="form-label" htmlFor="passwordForm">Password</label>
                            <input type="password" id="passwordForm" placeholder='password' className="form-control input-field" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />

                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>

                        </div>
                    </div>


                    <div className="Login-body-buttonSignUp">
                        <button type='button' className='btn-login btn btn-outline-danger' onClick={() => handleSubmit()} disabled={!exist}>Sign Up</button>
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