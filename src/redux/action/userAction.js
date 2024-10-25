export const Fetch_User_Success = 'fetch user success';
export const Fetch_User_LogOut = 'fetch user logOut';

export const doLogin = (data) => {
    console.log('da',data)
    return {
        type: Fetch_User_Success,
        payload: data,
    }
}
export const doLogout = () => {
    return {
        type: Fetch_User_LogOut,
    }
}
