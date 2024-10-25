// import axios from 'axios';
import axios from '../utils/AxiosCustomize';
const AppendApi = (email, password, username, role, img) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', img);
    return axios.post('api/v1/participant', form);

}
const UpdateApi = (id, username, role, img) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', img);
    return axios.put('api/v1/participant', form);
}
const DeleteApi = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}
const GetUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const GetApi = () => {
    return axios.get('api/v1/participant/all');
}
const LoginApi = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword, delay: 3000 })
}
const RegisterApi = (username, email, password) => {
    return axios.post(`api/v1/register`, { username: username, email: email, password: password })
}
const GetQuizzApi = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const GetDataQuizzApi = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}
const PostSubmitQuizzApi = (data) => {
    return axios.post('api/v1/quiz-submit', { ...data });  //raw 
}
const PostQuestionApi = (description, name, difficulty, quizImage) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('description', description);
    form.append('name', name);
    form.append('difficulty', difficulty);
    form.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', form);
}
const GetAllQuestionApi = () => {
    return axios.get('api/v1/quiz/all')
}
const DeleteQuestionApi = (QuesId) => {
    return axios.delete(`api/v1/quiz/${QuesId}`);
}
const UpdateQuestionApi = (id,description, name, difficulty, quizImage) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('id', id);
    form.append('description', description);
    form.append('name', name);
    form.append('difficulty', difficulty);
    form.append('quizImage', quizImage);
    return axios.put('api/v1/quiz', form);
}
const PostNewQuestionForQuizz = (quiz_id,description,questionImage) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('quiz_id', quiz_id);
    form.append('description', description);
    form.append('questionImage', questionImage);
    return axios.post('api/v1/question', form);
}
const PostNewAnswerForQuizz = (description,correct_answer,question_id) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('description', description);
    form.append('correct_answer', correct_answer);
    form.append('question_id', question_id);
    return axios.post('api/v1/answer', form);
}
const AssignQuizToUser = (quizId,userId) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('quizId', quizId);
    form.append('userId', userId);
    return axios.post('api/v1/quiz-assign-to-user', form);
}
const ApiGetQuestionFromQuizId = (quizId) =>{
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
const ApiUpdateInsertQuizzWithQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa',{...data});
}
const ApiDashBoardOverView = () =>{
    return axios.get('api/v1/overview');
}
const ApiChangePassword = (current_password,new_password) =>{
    const FormData = require('form-data');
    const form = new FormData();
    form.append('current_password',current_password)
    form.append('new_password',new_password)
    return axios.post('api/v1/change-password',form)
}

const ApiUpdateProfile = (username,userImage) =>{
    const FormData = require('form-data');
    const form = new FormData();
    form.append('username',username)
    form.append('userImage',userImage)
    return axios.post('api/v1/profile',form)
}
const getMongo = () =>{
    return axios.get('v1/api/users',{withCredentials:true})
}
const getApiCustomerMongoDB = () =>{
    return axios.get('v1/api/customers');
}
export { AppendApi, GetApi, UpdateApi, DeleteApi, GetUserPaginate, LoginApi, RegisterApi, 
        GetQuizzApi, GetDataQuizzApi, PostSubmitQuizzApi, PostQuestionApi, GetAllQuestionApi,
        DeleteQuestionApi, UpdateQuestionApi,PostNewQuestionForQuizz,PostNewAnswerForQuizz,AssignQuizToUser
        ,ApiGetQuestionFromQuizId,ApiUpdateInsertQuizzWithQA, ApiDashBoardOverView,ApiChangePassword,
        ApiUpdateProfile,getMongo,getApiCustomerMongoDB }