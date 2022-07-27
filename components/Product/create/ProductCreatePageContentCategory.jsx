import { Card, Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../../db/axios";
import {
    categoriesActions,
    productCreateActions,
} from "../../../redux/actions";
import { getError } from "../../../utils/error";

const ProductCreatePageContentCategory = () => {
    const dispatch = useDispatch();
    const [categorySelected, setCategorySelected] = useState(0);
    const [categorySubSelected, setCategoryRootSubSelected] = useState(0);
    const [categorySubSubSelected, setCategoryRootSubSubSelected] = useState(0);

    const { categories, loading } = useSelector(({ categories }) => categories);

    const {
        categoriesFetchFail,
        categoriesFetchRequest,
        categoriesFetchSuccess,
    } = bindActionCreators(categoriesActions, dispatch);
    const { productCreateUpdateCategory } = bindActionCreators(
        productCreateActions,
        dispatch
    );

    const handleCategorySelected = (value) => {
        setCategorySelected(value);

        const subCategory = handleCategoriesRootSub(value)[0]?.id;
        setCategoryRootSubSelected(subCategory);

        const subSubCategory = handleCategoriesRootSubSub(subCategory)[0]?.id;
        setCategoryRootSubSubSelected(subSubCategory);

        productCreateUpdateCategory([
            parseInt(value),
            parseInt(subCategory),
            parseInt(subSubCategory),
        ]);
    };
    const handleCategoryRootSubSelected = (value) => {
        setCategoryRootSubSelected(value);

        const subSubCategory = handleCategoriesRootSubSub(value)[0]?.id;
        setCategoryRootSubSubSelected(subSubCategory);

        productCreateUpdateCategory([
            parseInt(categorySelected),
            parseInt(value),
            parseInt(subSubCategory),
        ]);
    };
    const handleCategoryRootSubSubSelected = (value) => {
        setCategoryRootSubSubSelected(value);
        productCreateUpdateCategory([
            parseInt(categorySelected),
            parseInt(categorySubSelected),
            parseInt(value),
        ]);
    };
    const handleCategoriesRoot = (categories) => {
        return categories.filter((category) => category.parentId === 0);
    };
    const handleCategoriesRootSub = (parentId) => {
        parentId = parseInt(parentId);
        return parentId != 0
            ? categories.filter((category) => category.parentId === parentId)
            : [];
    };
    const handleCategoriesRootSubSub = (parentId) => {
        parentId = parseInt(parentId);
        return parentId != 0
            ? categories.filter((category) => category.parentId === parentId)
            : [];
    };

    const categoriesRoot = handleCategoriesRoot(categories);
    const categoriesRootSub = handleCategoriesRootSub(categorySelected);
    const categoriesRootSubSub =
        handleCategoriesRootSubSub(categorySubSelected);

    const CategoriesSelect = ({
        categoriesRoot,
        categoriesRootSub,
        categoriesRootSubSub,
    }) => {
        return (
            <div>
                <div>
                    {categoriesRoot && (
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="category"
                                    value="Select Category"
                                />
                            </div>
                            <Select
                                id="category"
                                required={true}
                                onChange={(e) =>
                                    handleCategorySelected(e.target.value)
                                }
                                value={categorySelected}
                            >
                                <option>Select Category</option>
                                {categoriesRoot &&
                                    categoriesRoot.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </Select>
                        </div>
                    )}
                    {categoriesRootSub.length > 0 && (
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="category"
                                    value="Select Category"
                                />
                            </div>
                            <Select
                                id="category"
                                required={true}
                                onChange={(e) =>
                                    handleCategoryRootSubSelected(
                                        e.target.value
                                    )
                                }
                                value={categorySubSelected}
                            >
                                {categoriesRootSub &&
                                    categoriesRootSub.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                            </Select>
                        </div>
                    )}
                    {categoriesRootSubSub.length > 0 && (
                        <div>
                            {" "}
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="category"
                                    value="Select Category"
                                />
                            </div>{" "}
                            <Select
                                id="category"
                                required={true}
                                onChange={(e) =>
                                    handleCategoryRootSubSubSelected(
                                        e.target.value
                                    )
                                }
                                value={categorySubSubSelected}
                            >
                                {categoriesRootSubSub.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    useEffect(() => {
        const fetchCategories = async () => {
            categoriesFetchRequest();
            try {
                const { data } = await axiosServer.get(
                    "/categories/type/product"
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
            <div className="">
                <Card>
                    <div>
                        <h2 className="text-lg font-bold underline">
                            Category
                        </h2>
                    </div>
                    <CategoriesSelect
                        categoriesRoot={categoriesRoot}
                        categoriesRootSub={categoriesRootSub}
                        categoriesRootSubSub={categoriesRootSubSub}
                    />
                </Card>
            </div>
        </div>
    );
};

export default ProductCreatePageContentCategory;
