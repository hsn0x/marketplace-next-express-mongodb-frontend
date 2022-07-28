import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import AdminCategoryBoxTreeAddNewModal from "./AdminCategoryBoxTreeAddNewModal";
import { axiosServer } from "../../../db/axios";
import Router from "next/router";
import { getError } from "../../../utils/error";
import { bindActionCreators } from "redux";
import { categoriesActions } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const AdminCategoryBoxTreeAddNew = ({ category, categoryType }) => {
    const dispatch = useDispatch();
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [newCategoryInput, setNewCategoryInput] = useState(false);

    function handleNewCategory() {
        setShowNewCategoryInput(true);
    }
    function handleCancelNewCategory() {
        setShowNewCategoryInput(false);
    }

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

    const handleSaveNewCategory = async () => {
        try {
            console.log({
                name: newCategoryInput,
                parentId: category._id,
                type: categoryType,
            });
            await axiosServer.post("/categories", {
                name: newCategoryInput,
                parentId: category._id,
                type: categoryType,
            });

            fetchCategories();
            setShowNewCategoryInput(false);
        } catch (error) {}
    };

    useEffect(() => {}, []);

    return (
        <div className="flex">
            <div className="mr-2">
                {showNewCategoryInput && (
                    <TextInput
                        id="newCategory"
                        type="text"
                        placeholder="Category Name"
                        required={true}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                    />
                )}
            </div>
            <div className="mr-2">
                {!showNewCategoryInput && (
                    <>
                        {" "}
                        <Button
                            color="info"
                            onClick={() => handleNewCategory()}
                        >
                            Add new Category
                            <FaPlus />
                        </Button>
                    </>
                )}
            </div>
            <div className="mr-2 flex gap-1">
                {showNewCategoryInput && (
                    <>
                        <Button
                            color="info"
                            onClick={() => handleSaveNewCategory()}
                        >
                            Save
                            <FaPlus />
                        </Button>
                        <Button
                            color="info"
                            onClick={() => handleCancelNewCategory()}
                        >
                            Cancel
                            <FaPlus />
                        </Button>
                    </>
                )}
            </div>

            {/* <AdminCategoryBoxTreeAddNewModal /> */}
        </div>
    );
};

export default AdminCategoryBoxTreeAddNew;
