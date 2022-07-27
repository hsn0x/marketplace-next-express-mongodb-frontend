import {
    Button,
    Card,
    Carousel,
    Rating,
    Spinner,
    Tabs,
    TextInput,
} from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ProductsBox from "../../../components/Products/ProductsBox";
import StorePageContent from "../../../components/Store/StorePageContent";
import StorePageHeader from "../../../components/Store/StorePageHeader";
import StorePageTabs from "../../../components/Store/StorePageTabs";
import { axiosServer } from "../../../db/axios";
import { marketActions } from "../../../redux/actions";
import { getError } from "../../../utils/error";

const MarketPage = ({ params }) => {
    const { slug } = params;

    const dispatch = useDispatch();

    const { market, loading } = useSelector(({ market }) => market);

    const { marketFetchFail, marketFetchRequest, marketFetchSuccess } =
        bindActionCreators(marketActions, dispatch);

    useEffect(() => {
        const fetchMarket = async () => {
            marketFetchRequest();
            try {
                const { data } = await axiosServer.get(`/markets/name/${slug}`);
                marketFetchSuccess(data);
            } catch (error) {
                marketFetchFail(getError(error));
                console.log(error);
            }
        };
        fetchMarket();
    }, []);

    return (
        <div>
            {loading && (
                <div className="flex justify-center items-center">
                    <Spinner
                        aria-label="Extra small spinner example"
                        size="xl"
                    />
                </div>
            )}
            {market && (
                <div className="grid grid-cols-1 gap-1">
                    <div>
                        <StorePageHeader
                            Images={market.Images}
                            Avatars={market.Avatars}
                            name={market.name}
                            username={market.username}
                            user={market.User}
                        />
                    </div>

                    <div>
                        <StorePageContent
                            title={market.title}
                            description={market.description}
                        />
                    </div>

                    <div>
                        <StorePageTabs
                            products={market.Products}
                            about={market.about}
                            market={market}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export async function getServerSideProps({ params }) {
    return {
        props: { params },
    };
}

export default MarketPage;
