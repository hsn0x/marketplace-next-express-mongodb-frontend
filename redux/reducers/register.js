import { axiosClient, axiosServer } from "../../db/axios";
import { Notify } from "notiflix";
import {
    updateAuth,
    updateIsAuthenticated,
    updateProfile,
} from "../actions/auth";

const UPDATE_REGISTER_FIRST_NAME = "UPDATE_REGISTER_FIRST_NAME";
const UPDATE_REGISTER_LAST_NAME = "UPDATE_REGISTER_LAST_NAME";
const UPDATE_REGISTER_USERNAME = "UPDATE_REGISTER_USERNAME";
const UPDATE_REGISTER_EMAIL = "UPDATE_REGISTER_EMAIL";
const UPDATE_REGISTER_PASSWORD = "UPDATE_REGISTER_PASSWORD";
const UPDATE_REGISTER_PASSWORD_CONFIRMED = "UPDATE_REGISTER_PASSWORD_CONFIRMED";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmed: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REGISTER_FIRST_NAME:
            return { ...state, firstName: action.payload };
        case UPDATE_REGISTER_LAST_NAME:
            return { ...state, lastName: action.payload };
        case UPDATE_REGISTER_USERNAME:
            return { ...state, username: action.payload };
        case UPDATE_REGISTER_EMAIL:
            return { ...state, email: action.payload };
        case UPDATE_REGISTER_PASSWORD:
            return { ...state, password: action.payload };
        case UPDATE_REGISTER_PASSWORD_CONFIRMED:
            return { ...state, passwordConfirmed: action.payload };
        default:
            return state;
    }
};

export const signUp = () => async (dispatch, getState) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirmed,
    } = getState().register;

    const registerData = {
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirmed,
    };
    try {
        const response = await axiosServer.post("/auth/register", registerData);
        Notify.success("Sign Up Successful", {
            position: "right-top",
            timeout: 1000,
            pauseOnHover: true,
            keepOnHover: true,
        });
    } catch (error) {
        console.log(error);
        const notifyMessage =
            error.response?.data?.message || "Sign Out Failed";
        Notify.failure(notifyMessage, {
            position: "right-top",
            timeout: 1000,
            pauseOnHover: true,
            keepOnHover: true,
        });
    }
};

export default reducer;
