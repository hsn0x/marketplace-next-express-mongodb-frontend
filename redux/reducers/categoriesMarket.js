import { bindActionCreators } from "redux";
import { axiosServer } from "../../db/axios";
import { getError } from "../../utils/error";
import { categoriesMarketActions } from "../actions";

const CATEGORIES_MARKET_FETCH_REQUEST = "CATEGORIES_MARKET_FETCH_REQUEST";
const CATEGORIES_MARKET_FETCH_SUCCESS = "CATEGORIES_MARKET_FETCH_SUCCESS";
const CATEGORIES_MARKET_FETCH_FAIL = "CATEGORIES_MARKET_FETCH_FAIL";
const CATEGORIES_MARKET_CREATE_REQUEST = "CATEGORIES_MARKET_CREATE_REQUEST";
const CATEGORIES_MARKET_CREATE_SUCCESS = "CATEGORIES_MARKET_CREATE_SUCCESS";
const CATEGORIES_MARKET_CREATE_FAIL = "CATEGORIES_MARKET_CREATE_FAIL";
const CATEGORIES_MARKET_DELETE_REQUEST = "CATEGORIES_MARKET_DELETE_REQUEST";
const CATEGORIES_MARKET_DELETE_SUCCESS = "CATEGORIES_MARKET_DELETE_SUCCESS";
const CATEGORIES_MARKET_DELETE_FAIL = "CATEGORIES_MARKET_DELETE_FAIL";
const CATEGORIES_MARKET_DELETE_RESET = "CATEGORIES_MARKET_DELETE_RESET";

const initialState = {
    categoriesMarket: [],
    loading: false,
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_MARKET_FETCH_REQUEST:
            return { ...state, loading: true, error: "" };
        case CATEGORIES_MARKET_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                categoriesMarket: action.payload,
                error: "",
            };
        case CATEGORIES_MARKET_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CATEGORIES_MARKET_CREATE_REQUEST:
            return { ...state, loadingCreate: true };
        case CATEGORIES_MARKET_CREATE_SUCCESS:
            return { ...state, loadingCreate: false };
        case CATEGORIES_MARKET_CREATE_FAIL:
            return { ...state, loadingCreate: false, error: action.payload };
        case CATEGORIES_MARKET_DELETE_REQUEST:
            return { ...state, loadingDelete: true };
        case CATEGORIES_MARKET_DELETE_SUCCESS:
            return { ...state, loadingDelete: false, successDelete: true };
        case CATEGORIES_MARKET_DELETE_FAIL:
            return { ...state, loadingDelete: false };
        case CATEGORIES_MARKET_DELETE_RESET:
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
};

export const fetchCategoriesMarket = () => {
    return async (dispatch, getState) => {
        console.log("fetchCategoriesMarket");
        const {
            categoriesMarketFetchFail,
            categoriesMarketFetchRequest,
            categoriesMarketFetchSuccess,
        } = bindActionCreators(categoriesMarketActions, dispatch);

        categoriesMarketFetchRequest();
        try {
            const { data } = await axiosServer.get("/categories/type/market");
            categoriesMarketFetchSuccess(data.rows);
        } catch (error) {
            categoriesMarketFetchFail(getError(error));
        }
    };
};

export default reducer;
