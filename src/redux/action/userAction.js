export const Fetch_User_Success = 'fetch user success';

export const doLogin = (data) => {
    return {
        type: Fetch_User_Success,
        payload: data,
    }
}