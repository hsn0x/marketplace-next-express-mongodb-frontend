import { axiosClient, axiosServer } from "../../db/axios";
import { Notify } from "notiflix";
import {
    updateAuth,
    updateIsAuthenticated,
    updateProfile,
} from "../actions/auth";

const UPDATE_LOGIN_EMAIL = "UPDATE_LOGIN_EMAIL";
const UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD";

const initialState = {
    email: "j@me.com",
    password: "qwe",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOGIN_EMAIL:
            return { ...state, email: action.payload };
        case UPDATE_LOGIN_PASSWORD:
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

export const signIn = () => async (dispatch, getState) => {
    const { email, password } = getState().login;
    const loginData = {
        email,
        password,
    };
    try {
        const { data: signInData } = await axiosServer.post(
            "/auth/login",
            loginData
        );
        Notify.success(signInData?.message || "Login Successful", {
            position: "right-top",
            width: "280px",
            distance: "10px",
            opacity: 1,
            timeout: 1000,
            pauseOnHover: true,
            keepOnHover: true,
        });
        dispatch({
            type: "UPDATE_LOGIN_IS_AUTHENTICATED",
            payload: signInData.isAuthenticated,
        });
        const { data: authUserData } = await axiosServer.get("/auth/me");
        await axiosClient.post("/auth/signin", authUserData);

        return signInData;
    } catch (error) {
        Notify.failure(error.response?.data?.message || "Sign in error", {
            position: "right-top",
            timeout: 1000,
            pauseOnHover: true,
            keepOnHover: true,
        });
        return error.response.data;
    }
};

export default reducer;
