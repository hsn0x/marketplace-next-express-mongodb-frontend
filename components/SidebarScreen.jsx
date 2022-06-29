import { Navbar, Sidebar } from "flowbite-react";
import Link from "next/link";
import React, { useEffect } from "react";
import {
    FaArrowRight,
    FaBook,
    FaChartPie,
    FaInbox,
    FaShoppingBag,
    FaStore,
    FaTable,
    FaUser,
    FaArrowLeft,
    FaHome,
} from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { fetchProfile, signOut } from "../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { withSessionSsr } from "../lib/withSession";

const SidebarScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector(({ auth }) => auth);

    const handelSignout = async (e) => {
        e.preventDefault();
        await dispatch(signOut());
        router.push("/auth/login");
    };

    const sidebarNavigations = [
        {
            id: uuid(),
            icon: FaHome,
            label: "Home",
            slug: "",
            href: "/",
            hrefMethod: () => router.push("/"),
            active: true,
            show: true,
            children: [],
            method: null,
        },
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
            icon: FaStore,
            label: "Stores",
            slug: "stores",
            href: "/stores",
            hrefMethod: () => router.push("/stores"),
            active: false,
            show: true,
            children: [
                {
                    id: uuid(),
                    icon: FaStore,
                    label: "All Stores",
                    slug: "stores-index",
                    href: "/stores",
                    hrefMethod: () => router.push("/stores"),
                    active: false,
                    show: true,
                    children: [],
                    method: null,
                },
                {
                    id: uuid(),
                    icon: FaStore,
                    label: "Create Store",
                    slug: "stores-create",
                    href: "/stores/create",
                    hrefMethod: () => router.push("/stores/create"),
                    active: false,
                    show: true,
                    children: [],
                    method: null,
                },
            ],
            method: null,
        },
        {
            id: uuid(),
            icon: FaStore,
            label: "Product",
            slug: "products",
            href: "/products",
            hrefMethod: () => router.push("/products"),
            active: false,
            show: true,
            children: [
                {
                    id: uuid(),
                    icon: FaStore,
                    label: "All Products",
                    slug: "products-index",
                    href: "/products",
                    hrefMethod: () => router.push("/products"),
                    active: false,
                    show: true,
                    children: [],
                    method: null,
                },
                {
                    id: uuid(),
                    icon: FaStore,
                    label: "Create Product",
                    slug: "products-create",
                    href: "/products/create",
                    hrefMethod: () => router.push("/products/create"),
                    active: false,
                    show: true,
                    children: [],
                    method: null,
                },
                {
                    id: uuid(),
                    icon: FaStore,
                    label: "Edit Product",
                    slug: "products-edit",
                    href: "/products/edit",
                    hrefMethod: () => router.push("/products/edit"),
                    active: false,
                    show: true,
                    children: [],
                    method: null,
                },
                {
                    id: uuid(),
                    icon: FaStore,
                    label: "Delete Product",
                    slug: "products-delete",
                    href: "/products/delete",
                    hrefMethod: () => router.push("/products/delete"),
                    active: false,
                    show: true,
                    children: [],
                    method: null,
                },
                {
                    id: uuid(),
                    icon: FaStore,
                    label: "Play Product",
                    slug: "products-play",
                    href: "/products/play",
                    hrefMethod: () => router.push("/products/play"),
                    active: false,
                    show: true,
                    children: [],
                    method: null,
                },
            ],
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
            icon: FaArrowRight,
            label: "Sign In",
            slug: "auth-login",
            href: "/auth/login",
            hrefMethod: () => router.push("/auth/login"),
            active: false,
            show: true,
            children: [],
        },
        {
            id: uuid(),
            icon: FaTable,
            label: "Sign Up",
            slug: "auth-register",
            href: "/auth/register",
            hrefMethod: () => router.push("/auth/register"),
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
            href: "/logout",
            hrefMethod: () => router.push("/auth/logout"),
            active: false,
            show: true,
            children: [],
            method: (e) => handelSignout(e),
        },
    ];

    const authSidebarNavigationsStores = [
        "stores-create",
        "stores-edit",
        "stores-delete",
    ];
    const authSidebarNavigationsProducts = [
        "products-create",
        "products-edit",
        "products-delete",
    ];
    const authSidebarNavigations = [
        "dashboard",
        "profile",
        "auth-logout",
        "inbox",
        "cart",
        ...authSidebarNavigationsStores,
        ...authSidebarNavigationsProducts,
    ];
    const guestSidebarNavigations = ["auth-login", "auth-register"];

    const handelSidebarNavigations = (navss) =>
        navss.map((nav) => {
            if (nav.children.length > 0) {
                return {
                    ...nav,
                    children: [...handelSidebarNavigations(nav.children)],
                };
            } else {
                if (auth.user && guestSidebarNavigations.includes(nav.slug)) {
                    return {
                        ...nav,
                        show: false,
                    };
                } else if (
                    !auth.user &&
                    authSidebarNavigations.includes(nav.slug)
                ) {
                    return {
                        ...nav,
                        show: false,
                    };
                } else {
                    return {
                        ...nav,
                    };
                }
            }
        });

    const isHandelSidebarNavigations =
        handelSidebarNavigations(sidebarNavigations);

    // if (auth.user) {
    //     sidebarNavigations
    //         .filter((nav) => guestSidebarNavigations.includes(nav.slug))
    //         .forEach((nav) => (nav.show = false));
    // } else {
    //     sidebarNavigations
    //         .filter((nav) => authSidebarNavigations.includes(nav.slug))
    //         .forEach((nav) => (nav.show = false));
    // }

    const ShowSidebarNavigations = ({ navs, navsParent }) => {
        return (
            <div>
                {navs.map((nav, index) => (
                    <div key={nav.id}>
                        {nav.children.length > 0 ? (
                            <Sidebar.Collapse icon={nav.icon} label={nav.label}>
                                <ShowSidebarNavigations
                                    navs={nav.children}
                                    navsParent={nav}
                                />
                            </Sidebar.Collapse>
                        ) : (
                            <div>
                                {nav.show ? (
                                    <Sidebar.Item
                                        icon={nav.icon}
                                        active={nav.active}
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => [
                                            nav.method != null
                                                ? nav.method(e)
                                                : nav.hrefMethod(),
                                        ]}
                                    >
                                        {nav.label}
                                    </Sidebar.Item>
                                ) : (
                                    ""
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-fit bg-gray-50">
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <ShowSidebarNavigations
                            navs={isHandelSidebarNavigations}
                        />
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default SidebarScreen;
