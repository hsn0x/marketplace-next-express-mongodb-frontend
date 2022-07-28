import React, { useEffect } from "react";
// import ProductEditPage from "../../../components/Product/create/ProductEditPage";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ProductEditPage from "../../../components/Product/edit/ProductEditPage";
import { axiosServer } from "../../../db/axios";

import { requireAuthentication } from "../../../HOC/requireAuthentication";
import { productActions, productEditActions } from "../../../redux/actions";
import { updateAuth, updateIsAuthenticated } from "../../../redux/actions/auth";
import { getError } from "../../../utils/error";

const EditProductPage = ({ authUser, params }) => {
    const { slug } = params;
    const dispatch = useDispatch();

    const { productFetchFail, productFetchRequest, productFetchSuccess } =
        bindActionCreators(productActions, dispatch);
    const {
        productEditUpdateCategory,
        productEditUpdateDescription,
        productEditUpdateMedia,
        productEditUpdatePrice,
        productEditUpdateQuantity,
        productEditUpdateStore,
        productEditUpdateTitle,
    } = bindActionCreators(productEditActions, dispatch);

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
                productEditUpdateCategory(
                    data.product.categories.map((c) => c.id)
                );
                productEditUpdateDescription(data.product.description);
                productEditUpdateMedia();
                productEditUpdatePrice(data.product.price);
                productEditUpdateQuantity(data.product.quantity);
                productEditUpdateStore(data.product.Market);
                productEditUpdateTitle(data.product.title);
            } catch (error) {
                productFetchFail(getError(error));
                console.log(error);
            }
        };
        fetchProduct();
    }, [
        authUser,
        dispatch,
        slug,
        productFetchFail,
        productFetchRequest,
        productFetchSuccess,
        productEditUpdateCategory,
        productEditUpdateDescription,
        productEditUpdateMedia,
        productEditUpdatePrice,
        productEditUpdateQuantity,
        productEditUpdateStore,
        productEditUpdateTitle,
    ]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="my-20">
                <ProductEditPage />
            </div>
        </div>
    );
};

export const getServerSideProps = requireAuthentication(({ params }) => {
    return {
        params,
    };
});

export default EditProductPage;
