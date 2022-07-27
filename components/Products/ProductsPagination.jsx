import { Card, Pagination } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../db/axios";
import { productsActions } from "../../redux/actions";
import { getError } from "../../utils/error";

const ProductsPagination = ({ totalItems, totalPages, currentPage }) => {
    const dispatch = useDispatch();

    const { productsFetchFail, productsFetchRequest, productsFetchSuccess } =
        bindActionCreators(productsActions, dispatch);

    const onPageChange = (selectedPage) => {
        const fetchProducts = async () => {
            productsFetchRequest();
            try {
                const { data } = await axiosServer.get("/products", {
                    params: {
                        page: selectedPage,
                        size: 5,
                    },
                });
                productsFetchSuccess(data);
            } catch (error) {
                productsFetchFail(getError(error));
            }
        };
        fetchProducts();
    };
    return (
        <div className="flex justify-center p-2">
            <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                showIcons={true}
                totalPages={totalPages}
            />
        </div>
    );
};

export default ProductsPagination;
