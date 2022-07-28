const PRODUCTS_FILTERS_UPDATE_PRODUCTS = "PRODUCTS_FILTERS_UPDATE_PRODUCTS";
const PRODUCTS_FILTERS_UPDATE_MIN_PRICE = "PRODUCTS_FILTERS_UPDATE_MIN_PRICE";
const PRODUCTS_FILTERS_UPDATE_MAX_PRICE = "PRODUCTS_FILTERS_UPDATE_MAX_PRICE";
const PRODUCTS_FILTERS_UPDATE_CATEGORY = "PRODUCTS_FILTERS_UPDATE_CATEGORY";
const PRODUCTS_SEARCH_FETCH_REQUEST = "PRODUCTS_SEARCH_FETCH_REQUEST";
const PRODUCTS_SEARCH_FETCH_SUCCESS = "PRODUCTS_SEARCH_FETCH_SUCCESS";
const PRODUCTS_SEARCH_FETCH_FAIL = "PRODUCTS_SEARCH_FETCH_FAIL";

const initialState = {
    filters: {
        minPrice: null,
        maxPrice: null,
        Categories: [],
    },
    products: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_SEARCH_FETCH_REQUEST:
            return { ...state, loading: true, error: "" };
        case PRODUCTS_SEARCH_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: "",
            };
        case PRODUCTS_SEARCH_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case PRODUCTS_FILTERS_UPDATE_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case PRODUCTS_FILTERS_UPDATE_MIN_PRICE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    minPrice: action.payload,
                },
            };
        case PRODUCTS_FILTERS_UPDATE_MAX_PRICE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    maxPrice: action.payload,
                },
            };
        case PRODUCTS_FILTERS_UPDATE_CATEGORY:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    Categories: action.payload,
                },
            };
        default:
            return state;
    }
};

export default reducer;
