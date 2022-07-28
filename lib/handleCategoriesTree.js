export const handleCategoriesTree = (categories) => {
    const root = categories.filter((obj) => obj.parentId === "0");
    const addSubToRoot = root.map((r) => ({ ...r, sub: [] }));

    const categoriesWithSubCategories = addSubToRoot.map((r) => ({
        ...r,
        sub: [...r.sub, ...categories.filter((a) => a.parentId === r._id)],
    }));
    const addSubSubToSubRoot = categoriesWithSubCategories.map((r) => ({
        ...r,
        sub: r.sub.map((s) => ({ ...s, sub: [] })),
    }));

    const categoriesWithSubSubCategories = addSubSubToSubRoot.map((r) => ({
        ...r,
        sub: r.sub.map((s) => ({
            ...s,
            sub: categories.filter((a) => a.parentId === s._id),
        })),
    }));

    return categoriesWithSubSubCategories;
};
