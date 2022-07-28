import { Card, Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../../db/axios";
import { categoriesActions, productEditActions } from "../../../redux/actions";
import { getError } from "../../../utils/error";

const ProductEditPageContentCategory = () => {
    const dispatch = useDispatch();

    const { edit } = useSelector(({ productEdit }) => productEdit);
    const { categories, loading } = useSelector(({ categories }) => categories);

    const [categorySelected, setCategorySelected] = useState(0);
    const [categorySubSelected, setCategoryRootSubSelected] = useState(0);
    const [categorySubSubSelected, setCategoryRootSubSubSelected] = useState(0);

    const {
        categoriesFetchFail,
        categoriesFetchRequest,
        categoriesFetchSuccess,
    } = bindActionCreators(categoriesActions, dispatch);

    const { productEditUpdateCategory } = bindActionCreators(
        productEditActions,
        dispatch
    );

    const handleCategorySelected = (value) => {
        setCategorySelected(value);

        const subCategory = handleCategoriesRootSub(value)[0]?.id;
        setCategoryRootSubSelected(subCategory);

        const subSubCategory = handleCategoriesRootSubSub(subCategory)[0]?.id;
        setCategoryRootSubSubSelected(subSubCategory);

        productEditUpdateCategory([
            parseInt(value),
            parseInt(subCategory),
            parseInt(subSubCategory),
        ]);
    };
    const handleCategorySelectedRootSub = (value) => {
        setCategoryRootSubSelected(value);

        const subSubCategory = handleCategoriesRootSubSub(value)[0]?.id;
        setCategoryRootSubSubSelected(subSubCategory);

        productEditUpdateCategory([
            parseInt(categorySelected),
            parseInt(value),
            parseInt(subSubCategory),
        ]);
    };
    const handleCategorySelectedRootSubSub = (value) => {
        setCategoryRootSubSubSelected(value);
        productEditUpdateCategory([
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
    // const categoriesRootSubSub = handleCategoriesRootSub(categoriesRootSub);

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
                                value={edit?.Categories[0] || categorySelected}
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
                                    handleCategorySelectedRootSub(
                                        e.target.value
                                    )
                                }
                                value={
                                    edit?.Categories[1] || categorySubSelected
                                }
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
                                    handleCategorySelectedRootSubSub(
                                        e.target.value
                                    )
                                }
                                value={
                                    edit?.Categories[2] ||
                                    categorySubSubSelected
                                }
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

                setCategorySelected(edit.Categories[0] || 0);
                setCategoryRootSubSelected(edit.Categories[1] || 0);
                setCategoryRootSubSubSelected(edit.Categories[2] || 0);
            } catch (error) {
                categoriesFetchFail(getError(error));
            }
        };
        fetchCategories();
    }, [edit?.Categories]);

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

export default ProductEditPageContentCategory;
