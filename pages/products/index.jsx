import React, { useEffect, useRef } from "react";
import axios from "axios";
import { axiosServer } from "../../db/axios";
import { useDispatch, useSelector } from "react-redux";
import { categoriesProductActions, productsActions } from "../../redux/actions";
import { bindActionCreators } from "redux";
import { getError } from "../../utils/error";
import { Card, Carousel, Pagination, Spinner } from "flowbite-react";
import Link from "next/link";
import ProductBox from "../../components/Product/ProductBox";
import ProductsPageTitle from "../../components/Products/ProductsPageTitle";
import ProductPageLoading from "../../components/Products/ProductsPageLoading";
import { notRequireAuthentication } from "../../HOC/notRequireAuthentication";
import { updateAuth, updateIsAuthenticated } from "../../redux/actions/auth";
import ProductsBox from "../../components/Products/ProductsBox";
import ProductsPageFilters from "../../components/Products/ProductsPageFilters";
import ProductsPagination from "../../components/Products/ProductsPagination";

const Products = ({ authUser }) => {
    const dispatch = useDispatch();
    const {
        rows: products,
        loading,
        totalItems,
        totalPages,
        currentPage,
    } = useSelector(({ products }) => products);
    const {
        products: searchProducts,
        query,
        loading: searchLoading,
    } = useSelector(({ productsSearch }) => productsSearch);
    const { products: filtersProducts, loading: filtersLoading } = useSelector(
        ({ productsFilters }) => productsFilters
    );

    const { productsFetchFail, productsFetchRequest, productsFetchSuccess } =
        bindActionCreators(productsActions, dispatch);
    const {
        categoriesProductFetchFail,
        categoriesProductFetchRequest,
        categoriesProductFetchSuccess,
    } = bindActionCreators(categoriesProductActions, dispatch);

    useEffect(() => {
        dispatch(updateAuth(authUser));
        dispatch(updateIsAuthenticated(!!authUser));
        const fetchProducts = async () => {
            productsFetchRequest();
            try {
                const { data } = await axiosServer.get("/products", {
                    params: {
                        page: currentPage,
                        size: 21,
                    },
                });
                productsFetchSuccess(data);
            } catch (error) {
                productsFetchFail(getError(error));
            }
        };
        fetchProducts();

        const fetchCategoriesProduct = async () => {
            categoriesProductFetchRequest();
            try {
                const params = {
                    page: 0,
                    size: 999999999,
                };
                const { data } = await axiosServer.get(
                    "/categories/type/product",
                    { params }
                );
                categoriesProductFetchSuccess(data.rows);
            } catch (error) {
                categoriesProductFetchFail(getError(error));
            }
        };
        fetchCategoriesProduct();
    }, []);

    return (
        <div className="flex flex-col gap-1">
            <div>
                <ProductPageLoading loading={loading} />
            </div>
            <div>
                <ProductsPageTitle title="All Products" />
            </div>
            <div>
                <ProductsPageFilters title="All Products" />
            </div>
            <div>
                <ProductsPagination
                    totalItems={totalItems}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>
            <div>
                {searchProducts && searchProducts.length > 0 ? (
                    <ProductsBox products={searchProducts} />
                ) : filtersProducts && filtersProducts.length > 0 ? (
                    <ProductsBox products={filtersProducts} />
                ) : (
                    <ProductsBox products={products} />
                )}
            </div>
            <div>
                <ProductsPagination
                    totalItems={totalItems}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export const getServerSideProps = notRequireAuthentication((context) => {
    return {};
});

export default Products;
