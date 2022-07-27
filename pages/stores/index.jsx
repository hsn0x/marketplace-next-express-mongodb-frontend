import React, { useEffect, useRef } from "react";
import axios from "axios";
import { axiosServer } from "../../db/axios";
import { useDispatch, useSelector } from "react-redux";
import { marketsActions } from "../../redux/actions";
import { bindActionCreators } from "redux";
import { getError } from "../../utils/error";
import { Card, Carousel, Spinner } from "flowbite-react";
import Link from "next/link";
import StoreBox from "../../components/Store/StoreBox";
import StorePageTitle from "../../components/Stores/StoresPageTitle";
import StorePageLoading from "../../components/Stores/StoresPageLoading";
import StoresBox from "../../components/Stores/StoresBox";
import { notRequireAuthentication } from "../../HOC/notRequireAuthentication";
import { updateAuth, updateIsAuthenticated } from "../../redux/actions/auth";

const Markets = ({ authUser }) => {
    const dispatch = useDispatch();
    const { markets, loading } = useSelector(({ markets }) => markets);
    const {
        markets: searchMarkets,
        query,
        loading: searchLoading,
    } = useSelector(({ marketsSearch }) => marketsSearch);
    const { marketsFetchFail, marketsFetchRequest, marketsFetchSuccess } =
        bindActionCreators(marketsActions, dispatch);

    useEffect(() => {
        dispatch(updateAuth(authUser));
        dispatch(updateIsAuthenticated(!!authUser));
        const fetchMarkets = async () => {
            marketsFetchRequest();
            try {
                const { data } = await axiosServer.get("/markets");
                marketsFetchSuccess(data.rows);
            } catch (error) {
                marketsFetchFail(getError(error));
            }
        };
        fetchMarkets();
    }, []);

    return (
        <div>
            <StorePageLoading loading={loading} />
            <StorePageTitle title="All Stores" />
            {searchMarkets && searchMarkets.length > 0 ? (
                <StoresBox markets={searchMarkets} />
            ) : (
                <StoresBox markets={markets} />
            )}
        </div>
    );
};

export const getServerSideProps = notRequireAuthentication((context) => {
    return {};
});

export default Markets;
