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
export{AppendApi}