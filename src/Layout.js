import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import MyComponent from './components/LearnReact/MyComponent';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageQuizz from './components/Admin/Content/ManageQuizz';
import ManageQuestion from './components/Admin/Content/ManageQuestion';
import Login from './components/Admin/Content/InOut/Login';
import { ToastContainer, toast } from 'react-toastify';
import SignUp from "./components/Admin/Content/InOut/SignUp";

const Layout = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="us" element={<User />} />
                        <Route path="learnReact" element={<MyComponent />} />
                    </Route>

                    <Route path="/adm" element={<Admin />} >
                        <Route index element={<DashBoard />} />
                        <Route path="manage-user" element={<ManageUser />} />
                        <Route path="manage-quizz" element={<ManageQuizz />} />
                        <Route path="manage-question" element={<ManageQuestion />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp/>}/>
                    
                    
                </Routes>
            </BrowserRouter>

        </>
    )
}
export default Layout

// Layout use to apply all func compose... to app . 