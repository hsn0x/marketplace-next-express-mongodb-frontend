import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../db/axios";
import { productsFiltersActions } from "../../redux/actions";
import { getError } from "../../utils/error";

const ProductsPageFiltersSubmit = () => {
    const dispatch = useDispatch();
    const { query } = useSelector(({ productsSearch }) => productsSearch);
    const { products, filters } = useSelector(
        ({ productsFilters }) => productsFilters
    );

    const { productsFiltersUpdateProducts } = bindActionCreators(
        productsFiltersActions,
        dispatch
    );

    const handleProductsFiltersSubmit = async () => {
        const filtersData = {
            ...filters,
            minPrice: filters.minPrice && Number(filters.minPrice),
            maxPrice: filters.maxPrice && Number(filters.maxPrice),
            Categories: filters.Categories.filter((c) => c),
        };
        try {
            const { data } = await axiosServer.get(
                `/products/q/filters/${query}`,
                {
                    params: { ...filtersData },
                }
            );
            productsFiltersUpdateProducts(data.rows);
            // await axiosServer.get(`/products/q/filters/${query}?x=s`, {
            //     params: { answer: 42 },
            // });
        } catch (error) {
            getError(error);
        }
    };

    return (
        <div className="">
            <div>
                <Label htmlFor="parent-categories" value="Filter" />
            </div>
            <Button onClick={() => handleProductsFiltersSubmit()}>
                Filter
            </Button>
        </div>
    );
};

export default ProductsPageFiltersSubmit;
