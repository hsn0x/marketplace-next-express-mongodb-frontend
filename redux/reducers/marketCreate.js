const MARKET_CREATE_UPDATE_NAME = "MARKET_CREATE_UPDATE_NAME";
const MARKET_CREATE_UPDATE_USERNAME = "MARKET_CREATE_UPDATE_USERNAME";
const MARKET_CREATE_UPDATE_TITLE = "MARKET_CREATE_UPDATE_TITLE";
const MARKET_CREATE_UPDATE_DESCRIPTION = "MARKET_CREATE_UPDATE_DESCRIPTION";
const MARKET_CREATE_UPDATE_CATEGORY = "MARKET_CREATE_UPDATE_CATEGORY";
const MARKET_CREATE_UPDATE_MEDIA = "MARKET_CREATE_UPDATE_MEDIA";
const MARKET_CREATE_UPDATE_ABOUT = "MARKET_CREATE_UPDATE_ABOUT";

const initialState = {
    create: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MARKET_CREATE_UPDATE_NAME:
            return {
                ...state,
                create: { ...state.create, name: action.payload },
            };
        case MARKET_CREATE_UPDATE_USERNAME:
            return {
                ...state,
                create: { ...state.create, username: action.payload },
            };
        case MARKET_CREATE_UPDATE_TITLE:
            return {
                ...state,
                create: { ...state.create, title: action.payload },
            };
        case MARKET_CREATE_UPDATE_DESCRIPTION:
            return {
                ...state,
                create: { ...state.create, description: action.payload },
            };
        case MARKET_CREATE_UPDATE_CATEGORY:
            return {
                ...state,
                create: { ...state.create, CategoriesIds: action.payload },
            };
        case MARKET_CREATE_UPDATE_MEDIA:
            return {
                ...state,
                create: { ...state.create, Images: action.payload },
            };
        case MARKET_CREATE_UPDATE_ABOUT:
            return {
                ...state,
                create: { ...state.create, about: action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
