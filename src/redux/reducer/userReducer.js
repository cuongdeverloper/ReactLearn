import { Fetch_User_Success } from "../action/userAction";

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Fetch_User_Success:
            return {
                ...state, 
                account: {
                    access_token: action?.payload.DT?.access_token,
                    refresh_token: action?.payload.DT?.refresh_token,
                    username: action?.payload.DT?.username,
                    image: action?.payload?.DT.image,
                    role: action?.payload?.DT?.role,
                },
                isAuthenticated: true,
            };
        default:
            return state; // Trả về trạng thái hiện tại khi không có action nào khớp
    }
};

export default userReducer;
