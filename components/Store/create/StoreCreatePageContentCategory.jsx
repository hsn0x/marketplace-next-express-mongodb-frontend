import { Card, Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { axiosServer } from "../../../db/axios";
import { categoriesActions, marketCreateActions } from "../../../redux/actions";
import { getError } from "../../../utils/error";

const StoreCreatePageContentCategory = () => {
    /**
     * @type {ReduxDispatch}
     */
    const dispatch = useDispatch();
    /**
     * Categories States
     */
    const [categorySelected, setCategorySelected] = useState("0");
    const [categorySubSelected, setCategoryRootSubSelected] = useState("0");
    const [categorySubSubSelected, setCategoryRootSubSubSelected] =
        useState("0");

    /**
     * Categories Fetched
     */
    const { categories, loading } = useSelector(({ categories }) => categories);

    /**
     * Categories Actions
     */
    const {
        categoriesFetchFail,
        categoriesFetchRequest,
        categoriesFetchSuccess,
    } = bindActionCreators(categoriesActions, dispatch);
    const { marketCreateUpdateCategory } = bindActionCreators(
        marketCreateActions,
        dispatch
    );

    /**
     * Handle Category Selected
     */
    const handleCategorySelected = (value) => {
        setCategorySelected(value);

        const subCategory = handleCategoriesRootSub(value)[0]?._id;
        setCategoryRootSubSelected(subCategory);

        const subSubCategory = handleCategoriesRootSubSub(subCategory)[0]?._id;
        setCategoryRootSubSubSelected(subSubCategory);

        marketCreateUpdateCategory([value, subCategory, subSubCategory]);
    };
    /**
     * Handle Category Selected Root Sub
     */
    const handleCategorySelectedRootSub = (value) => {
        setCategoryRootSubSelected(value);

        const subSubCategory = handleCategoriesRootSubSub(value)[0]?._id;
        setCategoryRootSubSubSelected(subSubCategory);

        marketCreateUpdateCategory([categorySelected, value, subSubCategory]);
    };
    /**
     * Handle Category Selected Root Sub Sub
     */
    const handleCategorySelectedRootSubSub = (value) => {
        setCategoryRootSubSubSelected(value);
        marketCreateUpdateCategory([
            categorySelected,
            categorySubSelected,
            value,
        ]);
    };

    /**
     * Handle Categories Root
     */
    const handleCategoriesRoot = (categories) => {
        return categories.filter((category) => category.parentId === "0");
    };
    /**
     * Handle Categories Root Sub
     */
    const handleCategoriesRootSub = (parentId) => {
        return parentId != "0"
            ? categories.filter((category) => {
                  return category.parentId === parentId;
              })
            : [];
    };
    /**
     * Handle Categories Root Sub Sub
     */
    const handleCategoriesRootSubSub = (parentId) => {
        return parentId != "0"
            ? categories.filter((category) => category.parentId === parentId)
            : [];
    };

    // Handle Categories Root
    const categoriesRoot = handleCategoriesRoot(categories);
    // Handle Categories Root Sub
    const categoriesRootSub = handleCategoriesRootSub(categorySelected);
    // Handle Categories Root Sub Sub
    const categoriesRootSubSub =
        handleCategoriesRootSubSub(categorySubSelected);
    // const categoriesRootSubSub = handleCategoriesRootSub(categoriesRootSub);

    /**
     *  Categories Select Component
     */
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
                                            key={category._id}
                                            value={category._id}
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
                                value={categorySubSelected}
                            >
                                {categoriesRootSub &&
                                    categoriesRootSub.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
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
                                value={categorySubSubSelected}
                            >
                                {categoriesRootSubSub.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
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
                const params = {
                    page: 0,
                    size: 99999999999,
                };
                const { data } = await axiosServer.get(
                    "/categories/type/market",
                    {
                        params,
                    }
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

export default StoreCreatePageContentCategory;
