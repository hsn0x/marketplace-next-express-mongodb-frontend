import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import StoreEditPage from "../../../components/Store/edit/StoreEditPage";
import { axiosServer } from "../../../db/axios";

import { requireAuthentication } from "../../../HOC/requireAuthentication";
import { marketActions, marketEditActions } from "../../../redux/actions";
import { updateAuth, updateIsAuthenticated } from "../../../redux/actions/auth";
import { getError } from "../../../utils/error";

const EditMarketPage = ({ authUser, params }) => {
    const { slug } = params;
    const dispatch = useDispatch();

    const { marketFetchFail, marketFetchRequest, marketFetchSuccess } =
        bindActionCreators(marketActions, dispatch);
    const {
        marketEditUpdateName,
        marketEditUpdateUsername,
        marketEditUpdateTitle,
        marketEditUpdateDescription,
        marketEditUpdateAbout,
        marketEditUpdateMedia,
        marketEditUpdateCategory,
    } = bindActionCreators(marketEditActions, dispatch);

    useEffect(() => {
        dispatch(updateAuth(authUser));
        dispatch(updateIsAuthenticated(!!authUser));

        const fetchMarket = async () => {
            marketFetchRequest();
            try {
                const { data } = await axiosServer.get(`/markets/name/${slug}`);
                marketFetchSuccess(data);

                marketEditUpdateName(data.market.name);
                marketEditUpdateUsername(data.market.username);
                marketEditUpdateTitle(data.market.title);
                marketEditUpdateDescription(data.market.description);
                marketEditUpdateAbout(data.market.about);
                marketEditUpdateCategory(
                    data.market.categories.map((c) => c.id)
                );
                marketEditUpdateMedia();
            } catch (error) {
                marketFetchFail(getError(error));
                console.log(error);
            }
        };
        fetchMarket();
    }, [
        authUser,
        dispatch,
        slug,
        marketFetchFail,
        marketFetchRequest,
        marketFetchSuccess,
        marketEditUpdateName,
        marketEditUpdateUsername,
        marketEditUpdateTitle,
        marketEditUpdateDescription,
        marketEditUpdateAbout,
        marketEditUpdateCategory,
        marketEditUpdateMedia,
    ]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="my-20">
                <StoreEditPage />
            </div>
        </div>
    );
};

export const getServerSideProps = requireAuthentication(({ params }) => {
    return {
        params,
    };
});

export default EditMarketPage;
