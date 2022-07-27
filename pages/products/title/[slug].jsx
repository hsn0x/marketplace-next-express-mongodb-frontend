import {
    Button,
    Card,
    Carousel,
    Rating,
    Spinner,
    TextInput,
} from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ProductPageDetails from "../../../components/Product/ProductPageDetails";
import ProductPageImages from "../../../components/Product/ProductPageImages";
import ProductPageLoading from "../../../components/Product/ProductPageLoading";
import ProductPageTabs from "../../../components/Product/ProductPageTabs";
import { axiosServer } from "../../../db/axios";
import { productActions } from "../../../redux/actions";
import { updateAuth, updateIsAuthenticated } from "../../../redux/actions/auth";
import { getError } from "../../../utils/error";

const ProductPage = ({ authUser, params }) => {
    const { slug } = params;

    const dispatch = useDispatch();
    const { product, loading } = useSelector(({ product }) => product);

    const { productFetchFail, productFetchRequest, productFetchSuccess } =
        bindActionCreators(productActions, dispatch);

    useEffect(() => {
        dispatch(updateAuth(authUser));
        dispatch(updateIsAuthenticated(!!authUser));

        const fetchProduct = async () => {
            productFetchRequest();
            try {
                const { data } = await axiosServer.get(
                    `/products/title/${slug}`
                );
                productFetchSuccess(data);
            } catch (error) {
                productFetchFail(getError(error));
                console.log(error);
            }
        };
        fetchProduct();
    }, [authUser, dispatch]);

    return (
        <div>
            <ProductPageLoading loading={loading} />
            {product && (
                <div className="flex flex-col gap-1">
                    <div>
                        <Card>
                            <div className="grid grid-cols-2 gap-2">
                                <ProductPageImages Images={product.Images} />
                                <ProductPageDetails
                                    title={product.title}
                                    price={product.price}
                                    store={product.Market}
                                    description={product.description}
                                />
                            </div>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <div>
                                <ProductPageTabs
                                    user={product.User}
                                    reviews={product.reviews}
                                    comments={product.comments}
                                    about={product.about}
                                />
                            </div>
                        </Card>
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

export default ProductPage;
