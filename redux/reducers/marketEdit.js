const MARKET_EDIT_UPDATE_NAME = "MARKET_EDIT_UPDATE_NAME";
const MARKET_EDIT_UPDATE_USERNAME = "MARKET_EDIT_UPDATE_USERNAME";
const MARKET_EDIT_UPDATE_TITLE = "MARKET_EDIT_UPDATE_TITLE";
const MARKET_EDIT_UPDATE_DESCRIPTION = "MARKET_EDIT_UPDATE_DESCRIPTION";
const MARKET_EDIT_UPDATE_ABOUT = "MARKET_EDIT_UPDATE_ABOUT";
const MARKET_EDIT_UPDATE_CATEGORY = "MARKET_EDIT_UPDATE_CATEGORY";
const MARKET_EDIT_UPDATE_MEDIA = "MARKET_EDIT_UPDATE_MEDIA";

const initialState = {
    edit: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MARKET_EDIT_UPDATE_NAME:
            return {
                ...state,
                edit: { ...state.edit, name: action.payload },
            };
        case MARKET_EDIT_UPDATE_USERNAME:
            return {
                ...state,
                edit: { ...state.edit, username: action.payload },
            };
        case MARKET_EDIT_UPDATE_TITLE:
            return {
                ...state,
                edit: { ...state.edit, title: action.payload },
            };
        case MARKET_EDIT_UPDATE_DESCRIPTION:
            return {
                ...state,
                edit: { ...state.edit, description: action.payload },
            };
        case MARKET_EDIT_UPDATE_ABOUT:
            return {
                ...state,
                edit: { ...state.edit, about: action.payload },
            };
        case MARKET_EDIT_UPDATE_CATEGORY:
            return {
                ...state,
                edit: { ...state.edit, Categories: action.payload },
            };
        case MARKET_EDIT_UPDATE_MEDIA:
            return {
                ...state,
                edit: { ...state.edit, Images: action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
