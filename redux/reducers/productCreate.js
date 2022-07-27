const PRODUCT_CREATE_UPDATE_TITLE = "PRODUCT_CREATE_UPDATE_TITLE";
const PRODUCT_CREATE_UPDATE_DESCRIPTION = "PRODUCT_CREATE_UPDATE_DESCRIPTION";
const PRODUCT_CREATE_UPDATE_PRICE = "PRODUCT_CREATE_UPDATE_PRICE";
const PRODUCT_CREATE_UPDATE_QUANTITY = "PRODUCT_CREATE_UPDATE_QUANTITY";
const PRODUCT_CREATE_UPDATE_CATEGORY = "PRODUCT_CREATE_UPDATE_CATEGORY";
const PRODUCT_CREATE_UPDATE_STORE = "PRODUCT_CREATE_UPDATE_STORE";
const PRODUCT_CREATE_UPDATE_MEDIA = "PRODUCT_CREATE_UPDATE_MEDIA";

const initialState = {
    create: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_UPDATE_TITLE:
            return {
                ...state,
                create: { ...state.create, title: action.payload },
            };
        case PRODUCT_CREATE_UPDATE_DESCRIPTION:
            return {
                ...state,
                create: { ...state.create, description: action.payload },
            };
        case PRODUCT_CREATE_UPDATE_PRICE:
            return {
                ...state,
                create: { ...state.create, price: action.payload },
            };
        case PRODUCT_CREATE_UPDATE_QUANTITY:
            return {
                ...state,
                create: { ...state.create, quantity: action.payload },
            };
        case PRODUCT_CREATE_UPDATE_CATEGORY:
            return {
                ...state,
                create: { ...state.create, CategoriesIds: action.payload },
            };
        case PRODUCT_CREATE_UPDATE_STORE:
            return {
                ...state,
                create: { ...state.create, MarketId: action.payload },
            };
        case PRODUCT_CREATE_UPDATE_MEDIA:
            return {
                ...state,
                create: { ...state.create, Images: action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
