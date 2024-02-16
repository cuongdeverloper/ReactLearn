// import axios from 'axios';
import axios from '../utils/AxiosCustomize';
const AppendApi = (email, password,username,role,img) => {
    const FormData = require('form-data');
        const form = new FormData();
        form.append('email', email);
        form.append('password', password);
        form.append('username', username);
        form.append('role', role);
        form.append('userImage', img);
        return axios.post('api/v1/participant', form);
        
}
const UpdateApi = (id,username,role,img) => {
    const FormData = require('form-data');
        const form = new FormData();
        form.append('id', id);
        form.append('username', username);
        form.append('role', role);
        form.append('userImage', img);
        return axios.put('api/v1/participant', form);     
}
const DeleteApi = (userId) => {
    return axios.delete('api/v1/participant', { data: {id: userId}});
}
const GetUserPaginate = (page,limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const GetApi = ()=>{
    return axios.get('api/v1/participant/all');
}
const LoginApi = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`,{email : userEmail, password : userPassword})
}
const RegisterApi = (username, email, password) => {
    return axios.post(`api/v1/register`, {username:username, email: email, password:password})
}
// ` ` if urlencode,   ' ' if formdata in postman 
export{AppendApi, GetApi, UpdateApi, DeleteApi, GetUserPaginate,LoginApi, RegisterApi}