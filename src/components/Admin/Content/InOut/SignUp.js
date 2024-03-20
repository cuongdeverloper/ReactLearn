import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RegisterApi } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [confirm, setConfirm] = useState(true)
    const [exist, setExist] = useState(false);
    const [errorRepeat, setErrorRepeat] = useState(false);
    const checkExist = () => {
        if (email !== '' && password !== '' && username !== '' && password === repeatPassword && !confirm) {
            setExist(true);
        } else {
            setExist(false);
        }
    }
    const checkSame = () => {
        if (password !== repeatPassword) {
            setErrorRepeat(false)
        } else {
            setErrorRepeat(true)
        }
    }
    useEffect(() => {
        checkExist();
    }, [email, password, username, repeatPassword, confirm]);

    useEffect(() => {
        checkSame();
    }, [password, repeatPassword]);

    const handleOnSubmit = async () => {

        let data = await RegisterApi(username, email, password);
        if (data && +data.EC === 0) {
            toast.success(data.EM);
            navigate('/')

        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <label onClick={() => (navigate('/'))}>&#60;&#60;Back to homepage</label>
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form>
                                        <div className="form-floating mb-3">
                                            <input type="text" id="floatingInput" className="form-control" value={username} onChange={(event) => setUserName(event.target.value)} placeholder='User Name'/>
                                            <label htmlFor="floatingInput">User Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" id="form3Example3cg" className="form-control form-control-lg" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email'/>
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password'/>
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" id="form3Example4cdg" className={`form-control form-control-lg  ${errorRepeat ? '' : 'error-sth'}`} onChange={(event) => setRepeatPassword(event.target.value)} placeholder='Repeat PassWord'/>
                                            <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                        </div>
                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input className="form-check-input me-2" type="checkbox" value={confirm} onChange={() => setConfirm(!confirm)} id="form2Example3cg" />
                                            <label className="form-check-label" htmlFor="form2Example3g">
                                                I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                            </label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body btn-register" onClick={() => handleOnSubmit()} disabled={!exist}>Register</button>
                                        </div>
                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body" onClick={() => (navigate('/login'))}><u>Login here</u></a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
