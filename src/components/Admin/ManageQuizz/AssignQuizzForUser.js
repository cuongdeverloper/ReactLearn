import { useState, useEffect } from "react"
import { GetAllQuestionApi } from "../../../services/ApiServices";
import { GetApi,AssignQuizToUser } from "../../../services/ApiServices";
import Select from 'react-select'
import {toast} from 'react-toastify'
import './AssignQuizzForUser.scss'
const AssignQuizzForUser = () => {

    const [selectedOption, setSelectedOption] = useState({})
    const [listQuizz, setListQuizz] = useState([]);

    const [selectedOptionUser, setSelectedOptionUser] = useState({})
    const [listUser, setListUser] = useState([]);
    const fetchListQuizz = async () => {
        let res = await GetAllQuestionApi();
        setListQuizz(res.DT);
    }
    const fetchListUser = async () => {
        let res = await GetApi();
        setListUser(res.DT)
    }
    const assignQuizApi = async() =>{
        let res = await AssignQuizToUser(selectedOption.value,selectedOptionUser.value)
        // console.log(res)
        if(res.EC === 0) {
            toast.success(res.EM)
            setSelectedOption({})
            setSelectedOptionUser({})
        } else {
            toast.error(res.EM)
        }
    }
    useEffect(() => {
        fetchListQuizz();
        fetchListUser();
    }, []);
    const optionsQuiz = listQuizz.map(item => ({
        value: item.id,
        label: `${item.id}: ${item.name}`
    }));
    const userList = listUser.map(item => ({
        value: item.id,
        label: ` ${item.id}:${item.email}`
    }));
    
    return (
        <div className="AssignQuizzForUser-container">
            <div className="AssignQuizz-listquizAndUser">
                <div className='ManageQuestion-body-Quiz'>
                    <p className='m-3'>Select Quiz</p>
                    <Select
                        className='SelectQuizz m-3'
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={optionsQuiz}
                    />
                </div>

                <div className='ManageQuestion-body-Quiz'>
                    <p className='m-3'>Select User</p>
                    <Select
                        className='SelectQuizz m-3'
                        value={selectedOptionUser}
                        onChange={setSelectedOptionUser}
                        options={userList}
                    />
                </div>
            </div>
            <button className="btn btn-warning" onClick={()=> assignQuizApi()}>SAVE</button>

        </div>
    )
}
export default AssignQuizzForUser