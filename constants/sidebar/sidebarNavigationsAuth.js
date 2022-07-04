import {
    FaArrowLeft,
    FaChartPie,
    FaInbox,
    FaShoppingBag,
    FaUser,
} from "react-icons/fa";
import { v4 as uuid } from "uuid";

export const sidebarNavigationsAuth = [
    {
        id: uuid(),
        icon: FaChartPie,
        label: "Dashboard",
        slug: "dashboard",
        href: "/dashboard",
        hrefMethod: () => router.push("/dashboard"),
        active: false,
        show: true,
        children: [],
        method: null,
    },
    {
        id: uuid(),
        icon: FaInbox,
        label: "Inbox",
        slug: "inbox",
        href: "/inbox",
        hrefMethod: () => router.push("/inbox"),
        active: false,
        show: true,
        children: [],
        method: null,
    },
    {
        id: uuid(),
        icon: FaUser,
        label: "Profile",
        slug: "profile",
        href: "/profile",
        hrefMethod: () => router.push("/profile"),
        active: false,
        show: true,
        children: [],
        method: null,
    },
    {
        id: uuid(),
        icon: FaShoppingBag,
        label: "Cart",
        slug: "cart",
        href: "/cart",
        hrefMethod: () => router.push("/cart"),
        active: false,
        show: true,
        children: [],
        method: null,
    },
    {
        id: uuid(),
        icon: FaArrowLeft,
        label: "Sign Out",
        slug: "auth-logout",
        href: "/",
        hrefMethod: () => router.push("/"),
        active: false,
        show: true,
        children: [],
        method: null,
    },
];
