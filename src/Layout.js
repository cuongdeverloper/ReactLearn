import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import MyComponent from './components/LearnReact/MyComponent';
import HomePage from './components/Home/HomePage';
import ManageUser from "./components/Admin/Content/ManageUser/ManageUser";
import DashBoard from './components/Admin/Content/DashBoard';
import ManageQuizz from './components/Admin/ManageQuizz/ManageQuizz';
import Login from './components/Admin/Content/InOut/Login';
import { ToastContainer, toast } from 'react-toastify';
import SignUp from "./components/Admin/Content/InOut/SignUp";
import HomePageUser from "./components/User/Content/HomePageUser";
import FreeGame from "./components/User/Content/FreeGame";
import ListQuizz from "./components/User/ListQuizz";
import DetailQuizz from "./components/User/DetailQuizz";
import FaceR from "./components/Face/FaceR";

const NotFound = () => {
    return (
        <div className="mt-3 alert alert-danger">
            404.Not found data from URL
        </div>
    )
}
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
                        {/* <Route path="fc/:c" element={<FaceR />} /> */}

                    </Route>

                    <Route path="/adm" element={<Admin />} >
                        <Route index element={<DashBoard />} />
                        <Route path="manage-user" element={<ManageUser />} />
                        <Route path="manage-quizz" element={<ManageQuizz />} />
                        
                    </Route>

                    <Route path="/us" element={<User />} >
                        <Route index element={<ListQuizz />} />
                        <Route path="homapageuser" element={<HomePageUser />} />
                        <Route path="playgame" element={<FreeGame />} />
                    </Route>

                    <Route path="/quizz/:idcode" element={<DetailQuizz />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />

                    <Route path='*' element={<NotFound />} />

                </Routes>
            </BrowserRouter>

        </>
    )
}
export default Layout

// Layout use to apply all func compose... to app . 