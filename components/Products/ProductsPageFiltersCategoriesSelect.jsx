import { Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
    categoriesProductActions,
    productsFiltersActions,
} from "../../redux/actions";
import { getError } from "../../utils/error";

const ProductsPageFiltersCategoriesSelect = () => {
    const dispatch = useDispatch();

    const { categoriesProduct } = useSelector(
        ({ categoriesProduct }) => categoriesProduct
    );

    const [categorySubSubSelected, setCategoryRootSubSubSelected] = useState(0);
    const [categorySelected, setCategorySelected] = useState(0);
    const [categorySubSelected, setCategoryRootSubSelected] = useState(0);

    const { productsFiltersUpdateCategory } = bindActionCreators(
        productsFiltersActions,
        dispatch
    );

    const handleCategoriesRoot = (categoriesProduct) => {
        return categoriesProduct.filter((category) => category.parentId === 0);
    };
    const handleCategoriesRootSub = (parentId) => {
        parentId = parseInt(parentId);
        return parentId != 0
            ? categoriesProduct.filter(
                  (category) => category.parentId === parentId
              )
            : [];
    };
    const handleCategoriesRootSubSub = (parentId) => {
        parentId = parseInt(parentId);
        return parentId != 0
            ? categoriesProduct.filter(
                  (category) => category.parentId === parentId
              )
            : [];
    };
    const handleCategorySelected = (value) => {
        setCategorySelected(value);

        const subCategory = handleCategoriesRootSub(value)[0]?.id;
        setCategoryRootSubSelected(subCategory);

        const subSubCategory = handleCategoriesRootSubSub(subCategory)[0]?.id;
        setCategoryRootSubSubSelected(subSubCategory);

        productsFiltersUpdateCategory([
            parseInt(value),
            parseInt(subCategory),
            parseInt(subSubCategory),
        ]);
    };
    const handleCategorySelectedRootSub = (value) => {
        setCategoryRootSubSelected(value);

        const subSubCategory = handleCategoriesRootSubSub(value)[0]?.id;
        setCategoryRootSubSubSelected(subSubCategory);

        productsFiltersUpdateCategory([
            parseInt(categorySelected),
            parseInt(value),
            parseInt(subSubCategory),
        ]);
    };
    const handleCategorySelectedRootSubSub = (value) => {
        setCategoryRootSubSubSelected(value);
        productsFiltersUpdateCategory([
            parseInt(categorySelected),
            parseInt(categorySubSelected),
            parseInt(value),
        ]);
    };

    const categoriesRoot = handleCategoriesRoot(categoriesProduct);
    const categoriesRootSub = handleCategoriesRootSub(categorySelected);
    const categoriesRootSubSub =
        handleCategoriesRootSubSub(categorySubSelected);

    useEffect(() => {});

    return (
        <div>
            <div className="flex gap-1">
                <div>
                    {categoriesRoot && (
                        <div>
                            <div>
                                <Label
                                    htmlFor="parent-categories"
                                    value="Category"
                                />
                            </div>
                            <div className="w-44">
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
                        </div>
                    )}
                </div>
                <div>
                    {categoriesRootSub.length > 0 && (
                        <div>
                            <div className="">
                                <Label
                                    htmlFor="category"
                                    value="Select Sub Category"
                                />
                            </div>
                            <div className="w-44">
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
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                </Select>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {categoriesRootSubSub.length > 0 && (
                        <div>
                            <div className="">
                                <Label
                                    htmlFor="category"
                                    value="Select Sub Sub Category"
                                />
                            </div>
                            <div className="w-44">
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
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPageFiltersCategoriesSelect;
