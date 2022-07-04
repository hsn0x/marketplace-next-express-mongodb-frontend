import { FaStore } from "react-icons/fa";
import { v4 as uuid } from "uuid";

export const sidebarNavigationsAdmin = [
    {
        id: uuid(),
        icon: FaStore,
        label: "Admin",
        slug: "admin",
        href: "/admin",
        hrefMethod: () => router.push("/admin"),
        active: false,
        show: true,
        children: [
            {
                id: uuid(),
                icon: FaStore,
                label: "Admin Home",
                slug: "admin-index",
                href: "/admin",
                hrefMethod: () => router.push("/admin"),
                active: false,
                show: true,
                children: [],
                method: null,
            },
            {
                id: uuid(),
                icon: FaStore,
                label: "Categories",
                slug: "admin-categories",
                href: "/admin/categories",
                hrefMethod: () => router.push("/admin/categories"),
                active: false,
                show: true,
                children: [],
                method: null,
            },
        ],
        method: null,
    },
];
