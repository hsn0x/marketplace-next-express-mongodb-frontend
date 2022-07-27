import Link from "next/link";
import React from "react";
import { Button } from "flowbite-react";
import { FaTrash, FaPen } from "react-icons/fa";
import { getError } from "../../../utils/error";
import { bindActionCreators } from "redux";
import { categoriesActions } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { axiosServer } from "../../../db/axios";

const AdminCategoryBoxTree = ({ category, categoryType }) => {
    const dispatch = useDispatch();

    const {
        categoriesFetchFail,
        categoriesFetchRequest,
        categoriesFetchSuccess,
    } = bindActionCreators(categoriesActions, dispatch);

    const fetchCategories = async () => {
        categoriesFetchRequest();
        try {
            const { data } = await axiosServer.get(
                `/categories/type/${categoryType}`
            );
            categoriesFetchSuccess(data.rows);
        } catch (error) {
            categoriesFetchFail(getError(error));
        }
    };

    const handleCategoryDelete = async () => {
        try {
            await axiosServer.delete(`/categories/${category.id}`);
            fetchCategories();
        } catch (error) {
            getError(error);
        }
    };
    const handleCategoryEdit = async () => {
        try {
            fetchCategories();
        } catch (error) {
            getError(error);
        }
    };
    return (
        <span className="">
            <div className="flex items-center hover:bg-gray-300 bg-gray-200 rounded-lg gap-2 mr-2">
                <Link href={`/admin/categories/name/${category.slug}`}>
                    <span className="text-lg font-bold cursor-pointer rounded-lg hover:bg-gray-400 p-2">
                        {category.name}
                    </span>
                </Link>

                <span className="flex mr-3 gap-1">
                    <Button
                        size="xs"
                        color="info"
                        onClick={() => handleCategoryEdit()}
                    >
                        <FaPen />
                    </Button>
                    <span className=" ">
                        <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleCategoryDelete()}
                        >
                            <FaTrash />
                        </Button>
                    </span>
                </span>
            </div>
        </span>
    );
};

export default AdminCategoryBoxTree;
