import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../db/axios";
import { productsSearchActions } from "../../redux/actions";
import { getError } from "../../utils/error";

const ProductsPageTitleSearch = () => {
    const dispatch = useDispatch();
    const { products, query, loading } = useSelector(
        ({ productsSearch }) => productsSearch
    );

    const {
        productsSearchUpdateQuery,
        productsSearchFetchFail,
        productsSearchFetchRequest,
        productsSearchFetchSuccess,
    } = bindActionCreators(productsSearchActions, dispatch);

    const handleSearch = async (event) => {
        event.preventDefault();
        productsSearchFetchRequest();
        try {
            const validQuery = query
                .trim()
                .split(" ")
                .filter((q) => q !== "")
                .join(" ");
            if (!validQuery) return;

            const { data } = await axiosServer.get(`/products/q/${validQuery}`);
            productsSearchFetchSuccess(data.rows);
        } catch (error) {
            productsSearchFetchFail(getError(error));
        }
    };

    return (
        <div>
            <div className="w-96">
                <form onSubmit={(event) => handleSearch(event)}>
                    <div className="flex gap-1">
                        <div className="w-96">
                            <TextInput
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for Product"
                                onChange={(event) =>
                                    productsSearchUpdateQuery(
                                        event.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <Button type="submit">Search</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductsPageTitleSearch;
