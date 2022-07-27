import React, { useEffect, useRef } from "react";
import axios from "axios";
import { axiosServer } from "../../../../db/axios";
import { useDispatch, useSelector } from "react-redux";
import { categoriesActions } from "../../../../redux/actions";
import { bindActionCreators } from "redux";
import { getError } from "../../../../utils/error";
import { Card, Carousel, Spinner } from "flowbite-react";
import Link from "next/link";
import CategoryBox from "../../../../components/Category/CategoryBox";
import CategoriesPageTitle from "../../../../components/Admin/Categories/AdminCategoriesPageTitle";
import CategoriesPageLoading from "../../../../components/Admin/Categories/AdminCategoriesPageLoading";
import { notRequireAuthentication } from "../../../../HOC/notRequireAuthentication";
import {
    updateAuth,
    updateIsAuthenticated,
} from "../../../../redux/actions/auth";
import CategoriesBox from "../../../../components/Admin/Categories/AdminCategoriesBox";

const CategoriesPage = ({ authUser }) => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector(({ categories }) => categories);

    const {
        categoriesFetchFail,
        categoriesFetchRequest,
        categoriesFetchSuccess,
    } = bindActionCreators(categoriesActions, dispatch);

    useEffect(() => {
        dispatch(updateAuth(authUser));
        dispatch(updateIsAuthenticated(!!authUser));
        const fetchCategories = async () => {
            categoriesFetchRequest();
            try {
                const { data } = await axiosServer.get(
                    "/categories/type/market"
                );
                categoriesFetchSuccess(data.rows);
            } catch (error) {
                categoriesFetchFail(getError(error));
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <CategoriesPageLoading loading={loading} />
            <CategoriesPageTitle title="All Categories" />
            {<CategoriesBox categories={categories} categoryType="market" />}
        </div>
    );
};

export const getServerSideProps = notRequireAuthentication((context) => {
    return {};
});

export default CategoriesPage;
