import React, { useEffect, useRef, useState } from "react";

const CategoriesBox3 = ({ categories }) => {
    const [categoriesBoxOrganized, setCategoriesBoxOrganized] = useState({
        parents: [],
    });

    // search for category tree and organize it
    const searchForCategoryParentTree = (categories, parentId) => {};

    function handleCategoriesBoxOrganizedDisplay(categories) {
        for (
            let categoryIndex = 0;
            categoryIndex < categories.length;
            categoryIndex++
        ) {
            const category = categories[categoryIndex];

            parentCategoryName = category.name;
            subCategoryName = category.name;
            subSubCategoryName = category.name;
            if (category.subCategory) {
            }
        }
    }

    useEffect(() => {
        const categoriesLevels = { parents: [] };

        const handleCategoriesBoxOrganized = (categories) => {
            for (
                let categoryIndex = 0;
                categoryIndex < categories.length;
                categoryIndex++
            ) {
                const category = categories[categoryIndex];
                if (category.parentId == 0) {
                    categoriesLevels.parents.push(category);
                }
            }

            categoriesLevels.parents = categoriesLevels.parents.map(
                (category) => {
                    return {
                        ...category,
                        subCategory: [],
                    };
                }
            );
            categories = categories.filter(
                (c) => c.parentId != category.parentId
            );

            const subCategoriesIds = [];
            for (
                let categoryIndex = 0;
                categoryIndex < categories.length;
                categoryIndex++
            ) {
                const category = categories[categoryIndex];
                for (
                    let categoryParentIndex = 0;
                    categoryParentIndex < categoriesLevels.parents.length;
                    categoryParentIndex++
                ) {
                    const categoryParent =
                        categoriesLevels.parents[categoryParentIndex];
                    if (categoryParent.id == category.parentId) {
                        subCategoriesIds.push(category.id);
                        categoryParent.subCategory.push(category);
                    }
                }
            }

            categoriesLevels.parents = categoriesLevels.parents.map(
                (category) => {
                    return {
                        ...category,
                        subCategory: category.subCategory.map((category) => {
                            return {
                                ...category,
                                subSubCategory: [],
                            };
                        }),
                    };
                }
            );
            categories = categories.filter(
                (category) => !subCategoriesIds.includes(category.id)
            );

            const subSubCategoriesIds = [];
            for (
                let categoryIndex = 0;
                categoryIndex < categories.length;
                categoryIndex++
            ) {
                const category = categories[categoryIndex];
                for (
                    let categoryParentIndex = 0;
                    categoryParentIndex < categoriesLevels.parents.length;
                    categoryParentIndex++
                ) {
                    const categoryParent =
                        categoriesLevels.parents[categoryParentIndex];

                    for (
                        let categorySubCategoryIndex = 0;
                        categorySubCategoryIndex <
                        categoryParent.subCategory.length;
                        categorySubCategoryIndex++
                    ) {
                        const categorySubCategory =
                            categoryParent.subCategory[
                                categorySubCategoryIndex
                            ];
                        if (categorySubCategory.id == category.parentId) {
                            subSubCategoriesIds.push(category.id);
                            categorySubCategory.subSubCategory.push(category);
                        }
                    }
                }
            }

            // categories = categories.map((category, categoryIndex) => {
            //     if (category.parentId > 0) {
            //         const parentCategory = categories.find(
            //             (pc) => pc.id == category.parentId
            //         );
            //         return {
            //             ...parentCategory,
            //             subCategory: { ...category.subCategory, category },
            //         };
            //     } else {
            //         return { ...category };
            //     }
            // });

            // categories.map((c) => console.log(c));

            // .map((category) => console.log(category))
            //  categories.filter((category) => category.parentId == 0);
        };

        const handleCategoriesParent = (categories, parentId) => {
            return categories.filter(
                (category) => category.parentId == parentId
            );
        };

        handleCategoriesBoxOrganized(categories);
        setCategoriesBoxOrganized(categoriesLevels);
    }, [categories]);

    // const handleCategoriesBoxOrganizedName = (categories) => {
    //     return categories.map((category) =>
    //         category.subCategory != undefined
    //             ? handleCategoriesBoxOrganizedName(category.subCategory)
    //             : category.name
    //     );
    // };

    // const categoriesBoxOrganizedName = handleCategoriesBoxOrganizedName(
    //     categoriesBoxOrganized
    // );

    // console.log({ categoriesBoxOrganized });
    // console.log({ categoriesBoxOrganizedName });

    return (
        <div className="">
            {categoriesBoxOrganized.parents.map((category) => {
                return (
                    <div
                        className="bg-gray-200 rounded-lg m-2 p-2"
                        key={category.id}
                    >
                        <span>
                            <span className="bg-gray-300 p-2 rounded-lg mr-2">
                                {category.name}
                            </span>
                            <span>
                                {category.subCategory.map((subCategory) => {
                                    return (
                                        <span key={subCategory.id}>
                                            <span className="bg-gray-300 p-2 rounded-lg mr-2">
                                                {subCategory.name}
                                            </span>
                                            <span>
                                                {subCategory.subSubCategory.map(
                                                    (subSubCategory) => {
                                                        return (
                                                            <span
                                                                key={
                                                                    subSubCategory.id
                                                                }
                                                            >
                                                                <span className="bg-gray-300 p-2 rounded-lg mr-2">
                                                                    {
                                                                        subSubCategory.name
                                                                    }
                                                                </span>
                                                            </span>
                                                        );
                                                    }
                                                )}
                                            </span>
                                        </span>
                                    );
                                })}
                            </span>
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}

export default CategoriesBox3;
