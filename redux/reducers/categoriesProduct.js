import { bindActionCreators } from "redux";
import { axiosServer } from "../../db/axios";
import { getError } from "../../utils/error";
import { categoriesProductActions } from "../actions";

const CATEGORIES_PRODUCT_FETCH_REQUEST = "CATEGORIES_PRODUCT_FETCH_REQUEST";
const CATEGORIES_PRODUCT_FETCH_SUCCESS = "CATEGORIES_PRODUCT_FETCH_SUCCESS";
const CATEGORIES_PRODUCT_FETCH_FAIL = "CATEGORIES_PRODUCT_FETCH_FAIL";
const CATEGORIES_PRODUCT_CREATE_REQUEST = "CATEGORIES_PRODUCT_CREATE_REQUEST";
const CATEGORIES_PRODUCT_CREATE_SUCCESS = "CATEGORIES_PRODUCT_CREATE_SUCCESS";
const CATEGORIES_PRODUCT_CREATE_FAIL = "CATEGORIES_PRODUCT_CREATE_FAIL";
const CATEGORIES_PRODUCT_DELETE_REQUEST = "CATEGORIES_PRODUCT_DELETE_REQUEST";
const CATEGORIES_PRODUCT_DELETE_SUCCESS = "CATEGORIES_PRODUCT_DELETE_SUCCESS";
const CATEGORIES_PRODUCT_DELETE_FAIL = "CATEGORIES_PRODUCT_DELETE_FAIL";
const CATEGORIES_PRODUCT_DELETE_RESET = "CATEGORIES_PRODUCT_DELETE_RESET";

const initialState = {
    categoriesProduct: [],
    loading: false,
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_PRODUCT_FETCH_REQUEST:
            return { ...state, loading: true, error: "" };
        case CATEGORIES_PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                categoriesProduct: action.payload,
                error: "",
            };
        case CATEGORIES_PRODUCT_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CATEGORIES_PRODUCT_CREATE_REQUEST:
            return { ...state, loadingCreate: true };
        case CATEGORIES_PRODUCT_CREATE_SUCCESS:
            return { ...state, loadingCreate: false };
        case CATEGORIES_PRODUCT_CREATE_FAIL:
            return { ...state, loadingCreate: false, error: action.payload };
        case CATEGORIES_PRODUCT_DELETE_REQUEST:
            return { ...state, loadingDelete: true };
        case CATEGORIES_PRODUCT_DELETE_SUCCESS:
            return { ...state, loadingDelete: false, successDelete: true };
        case CATEGORIES_PRODUCT_DELETE_FAIL:
            return { ...state, loadingDelete: false };
        case CATEGORIES_PRODUCT_DELETE_RESET:
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
};

export const fetchCategoriesProduct = () => {
    return async (dispatch, getState) => {
        const {
            categoriesProductFetchFail,
            categoriesProductFetchRequest,
            categoriesProductFetchSuccess,
        } = bindActionCreators(categoriesProductActions, dispatch);

        categoriesProductFetchRequest();
        try {
            const { data } = await axiosServer.get("/categories/type/product");
            categoriesProductFetchSuccess(data.rows);
        } catch (error) {
            categoriesProductFetchFail(getError(error));
        }
    };
};

export default reducer;
