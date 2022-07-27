const PRODUCT_EDIT_UPDATE_TITLE = "PRODUCT_EDIT_UPDATE_TITLE";
const PRODUCT_EDIT_UPDATE_DESCRIPTION = "PRODUCT_EDIT_UPDATE_DESCRIPTION";
const PRODUCT_EDIT_UPDATE_PRICE = "PRODUCT_EDIT_UPDATE_PRICE";
const PRODUCT_EDIT_UPDATE_QUANTITY = "PRODUCT_EDIT_UPDATE_QUANTITY";
const PRODUCT_EDIT_UPDATE_CATEGORY = "PRODUCT_EDIT_UPDATE_CATEGORY";
const PRODUCT_EDIT_UPDATE_STORE = "PRODUCT_EDIT_UPDATE_STORE";
const PRODUCT_EDIT_UPDATE_MEDIA = "PRODUCT_EDIT_UPDATE_MEDIA";

const initialState = {
    edit: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_UPDATE_TITLE:
            return {
                ...state,
                edit: { ...state.edit, title: action.payload },
            };
        case PRODUCT_EDIT_UPDATE_DESCRIPTION:
            return {
                ...state,
                edit: { ...state.edit, description: action.payload },
            };
        case PRODUCT_EDIT_UPDATE_PRICE:
            return {
                ...state,
                edit: { ...state.edit, price: action.payload },
            };
        case PRODUCT_EDIT_UPDATE_QUANTITY:
            return {
                ...state,
                edit: { ...state.edit, quantity: action.payload },
            };
        case PRODUCT_EDIT_UPDATE_CATEGORY:
            return {
                ...state,
                edit: { ...state.edit, CategoriesIds: action.payload },
            };
        case PRODUCT_EDIT_UPDATE_STORE:
            return {
                ...state,
                edit: { ...state.edit, MarketId: action.payload },
            };
        case PRODUCT_EDIT_UPDATE_MEDIA:
            return {
                ...state,
                edit: { ...state.edit, Images: action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
