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

const GetApi = ()=>{
    return axios.get('api/v1/participant/all');
}
export{AppendApi, GetApi, UpdateApi, DeleteApi}