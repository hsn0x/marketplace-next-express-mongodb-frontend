import axios from "axios";
import { axiosClient, axiosServer } from "../../db/axios";
import { Notify } from "notiflix";
import {
    updateAuth,
    updateIsAuthenticated,
    updateProfile,
} from "../actions/auth";

const UPDATE_IS_AUTHENTICATED = "UPDATE_IS_AUTHENTICATED";
const UPDATE_AUTH = "UPDATE_AUTH";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const UPDATE_SIGN_IN = "UPDATE_SIGN_IN";
const UPDATE_SIGN_UP = "UPDATE_SIGN_UP";

const initialState = {
    isAuthenticated: false,
    user: null,
    profile: null,
    email: "",
    password: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        case UPDATE_AUTH:
            return { ...state, user: action.payload };
        case UPDATE_PROFILE:
            return { ...state, profile: action.payload };
        case UPDATE_EMAIL:
            return { ...state, email: action.payload };
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload };
        case UPDATE_SIGN_IN:
            return action.payload;
        case UPDATE_SIGN_UP:
            return action.payload;
        default:
            return state;
    }
};

// export const signIn = () => async (dispatch, getState) => {
//     const { email, password } = getState().auth;
//     const data = { email, password };
//     try {
//         // const { data: signInData } = await axiosServer.post(
//         //     "/auth/login",
//         //     data
//         // );
//         const { data: signInData } = await axiosServer.post("/auth/login", {
//             email: "j@me.com",
//             password: "qwe",
//         });
//         Notify.success(signInData?.message || "Login Successful", {
//             position: "right-bottom",
//             width: "280px",
//             distance: "10px",
//             opacity: 1,
//             timeout: 2000,
//             pauseOnHover: true,
//         });
//         dispatch({
//             type: "UPDATE_IS_AUTHENTICATED",
//             payload: signInData.isAuthenticated,
//         });
//         const { data: authUserData } = await axiosServer.get("/auth/me");
//         await axiosClient.post("/auth/signin", authUserData);

//         return signInData;
//     } catch (error) {
//         Notify.failure(error.response?.data?.message || "Sign in error", {
//             position: "center",
//             timeout: 6000,
//             pauseOnHover: true,
//         });
//         return error.response.data;
//     }
// };

export const fetchProfile = () => {
    return async (dispatch, getState) => {
        if (
            getState().auth &&
            getState().auth.user &&
            getState().auth.isAuthenticated &&
            !getState().auth.profile
        ) {
            try {
                const { data: fetchedProfile } = await axiosServer.get(
                    "/auth/me"
                );
                dispatch({
                    type: "UPDATE_AUTH",
                    payload: fetchedProfile.user,
                });
                dispatch({
                    type: "UPDATE_PROFILE",
                    payload: fetchedProfile.user,
                });
                Notify.success(fetchedProfile?.message || "Login Successful", {
                    position: "right-top",
                    width: "280px",
                    distance: "10px",
                    opacity: 1,
                    timeout: 1000,
                    pauseOnHover: true,
                    keepOnHover: true,
                });
                return fetchedProfile;
            } catch (error) {
                Notify.failure(
                    error.response?.data?.message || "You need to logged In",
                    {
                        position: "right-top",
                        timeout: 1000,
                        pauseOnHover: true,
                        keepOnHover: true,
                    }
                );
                dispatch(signOut());

                return error.response?.data;
            }
        }
    };
};

// export const signUp = () => async (dispatch, getState) => {
//     const { email, password } = getState().auth;
//     const data = { email, password };
//     try {
//         const response = await axiosClient.post("/auth/signup", {
//             email,
//             password,
//         });
//         Notify.success("Sign Up Successful", {
//             position: "center",
//             timeout: 2000,
//             pauseOnHover: true,
//             keepOnHover: true,
//         });
//     } catch (error) {
//         notifyMessage = error.response?.data?.message || "Sign Out Failed";
//         Notify.failure(error.response?.data?.message, {
//             position: "center",
//             timeout: 6000,
//             pauseOnHover: true,
//         });
//     }
// };

export const signOut = (e) => {
    return async (dispatch, getState) => {
        try {
            await axiosServer.get("/auth/logout");
            await axiosClient.get("/auth/signout");
            dispatch(updateAuth(null));
            dispatch(updateIsAuthenticated(false));
            dispatch(updateProfile(null));
            Notify.success("Logged out", {
                position: "right-top",
                timeout: 1000,
                pauseOnHover: true,
                keepOnHover: true,
            });
        } catch (error) {
            console.log(error);
            Notify.failure(error.response?.data?.message || "Sign Out Failed", {
                position: "right-top",
                timeout: 1000,
                pauseOnHover: true,
            });
            return null;
        }
    };
};

export default reducer;
