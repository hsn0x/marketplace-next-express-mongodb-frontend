import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect } from "react";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
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
import { fetchProfile, signOut } from "../redux/reducers/auth";
import { navbarNavigations } from "../constants/navbar";
import { handelNavbarNavigations } from "../lib/handelNavbarNavigations";
import { bindActionCreators } from "redux";
import {
    categoriesMarketActions,
    categoriesProductActions,
} from "../redux/actions";
import { getError } from "../utils/error";
import { axiosServer } from "../db/axios";
import { handleCategoriesTree } from "../lib/handleCategoriesTree";
import Image from "next/image";
import { fetchCategoriesMarket } from "../redux/reducers/categoriesMarket";
import { fetchCategoriesProduct } from "../redux/reducers/categoriesProduct";

const NavbarScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector(({ auth }) => auth);
    const { categoriesProduct } = useSelector(
        ({ categoriesProduct }) => categoriesProduct
    );
    const { categoriesMarket } = useSelector(
        ({ categoriesMarket }) => categoriesMarket
    );
    const isHandleCategoriesProductTree =
        handleCategoriesTree(categoriesProduct);
    const isHandleCategoriesMarketTree = handleCategoriesTree(categoriesMarket);

    const isHandelNavbarNavigations = handelNavbarNavigations(
        navbarNavigations,
        auth
    );

    const handelSignout = async (e) => {
        e.preventDefault();
        await dispatch(signOut());
        router.push("/auth/login");
    };
    const handelProfile = async (e) => {
        e.preventDefault();
        router.push(`/members/username/${auth.profile?.username}`);
    };

    useEffect(() => {
        // const myProfile = async () => {
        //     if (auth.user && auth.isAuthenticated && !auth.profile) {
        //         const fetchedProfile = await dispatch(fetchProfile());
        //         if (!fetchedProfile?.isAuthenticated) {
        //             dispatch(signOut());
        //         }
        //     }
        // };
        // myProfile();

        dispatch(fetchProfile());

        dispatch(fetchCategoriesMarket());
        dispatch(fetchCategoriesProduct());
    }, [auth.user, dispatch, auth.isAuthenticated, auth.profile]);

    return (
        <Navbar fluid={true} rounded={true}>
            <div>
                <Navbar.Brand href="#">
                    <div className="flex gap-1">
                        <div>
                            <Image
                                src="/hsn_logo.png"
                                objectFit="cover"
                                alt="Marketplace Logo"
                                height={"80"}
                                width={"80"}
                            />
                        </div>
                        <div className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Marketplace
                        </div>
                    </div>
                </Navbar.Brand>
            </div>
            <div className="flex md:order-2 z-10">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={
                        <Avatar
                            alt="User settings"
                            img={auth.profile?.avatars[0]?.url}
                            rounded={true}
                            size="md"
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            {auth.profile?.firstName} {auth.profile?.lastName}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {auth.profile?.email}
                        </span>
                    </Dropdown.Header>
                    {}

                    {isHandelNavbarNavigations.map(
                        (nav, index) =>
                            nav.place == "right" && (
                                <div key={nav.id}>
                                    {nav.slug == "auth-logout" && (
                                        <Dropdown.Divider />
                                    )}

                                    <Link href={nav.href} passHref>
                                        <span>
                                            <Dropdown.Item
                                                icon={nav.icon}
                                                active={nav.active}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={(e) => [
                                                    nav.slug == "auth-logout" &&
                                                        handelSignout(e),
                                                    nav.slug == "profile" &&
                                                        handelProfile(e),
                                                ]}
                                            >
                                                {nav.label}
                                            </Dropdown.Item>
                                        </span>
                                    </Link>
                                </div>
                            )
                    )}
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <div className="flex gap-1">
                    <div className="flex gap-1">
                        {isHandelNavbarNavigations.map(
                            ({ label, href, place, id }) =>
                                place == "top" && (
                                    <div key={id}>
                                        <Button color={"gray"}>
                                            <Link key={id} href={href}>
                                                {label}
                                            </Link>
                                        </Button>
                                    </div>
                                )
                        )}
                    </div>
                    <div>
                        <Dropdown label="Stores" color={"gray"}>
                            <div className="grid grid-cols-5 gap-1">
                                {isHandleCategoriesMarketTree.map(
                                    (category, index) => (
                                        <div
                                            className="bg-gray-50"
                                            key={category.id}
                                        >
                                            {/* <div>
                                        <Dropdown.Header>
                                            <span className="block text-sm">
                                                {category.name}
                                            </span>
                                        </Dropdown.Header>
                                    </div> */}
                                            <div>
                                                <Dropdown.Item>
                                                    <div>
                                                        <div className="mb-2">
                                                            <Link
                                                                href={`/categories/${category.slug}`}
                                                            >
                                                                <h2 className="hover:underline text-lg font-bold">
                                                                    {category.name.toUpperCase()}
                                                                </h2>
                                                            </Link>
                                                        </div>
                                                        <div className="ml-2">
                                                            {category.sub &&
                                                                category.sub.map(
                                                                    (
                                                                        subCategory,
                                                                        subCategoryIndex
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                subCategory.id
                                                                            }
                                                                            className="mb-2"
                                                                        >
                                                                            <div className="">
                                                                                <Link
                                                                                    href={`/categories/${category.slug}`}
                                                                                >
                                                                                    <h3 className="hover:underline text-base font-bold">
                                                                                        {subCategory.name.toUpperCase()}
                                                                                    </h3>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="ml-2">
                                                                                {subCategory.sub &&
                                                                                    subCategory.sub.map(
                                                                                        (
                                                                                            subSubCategory,
                                                                                            subSubCategoryIndex
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    subSubCategory.id
                                                                                                }
                                                                                            >
                                                                                                <Link
                                                                                                    href={`/categories/${category.slug}`}
                                                                                                >
                                                                                                    <h2 className="hover:underline">
                                                                                                        {subSubCategory.name.toUpperCase()}
                                                                                                    </h2>
                                                                                                </Link>
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </Dropdown>
                    </div>
                    <div>
                        <Dropdown label="Products" color={"gray"}>
                            <div className="grid grid-cols-5 gap-1">
                                {isHandleCategoriesProductTree.map(
                                    (category, index) => (
                                        <div
                                            className="bg-gray-50"
                                            key={category.id}
                                        >
                                            {/* <div>
                                        <Dropdown.Header>
                                            <span className="block text-sm">
                                                {category.name}
                                            </span>
                                        </Dropdown.Header>
                                    </div> */}
                                            <div>
                                                <Dropdown.Item>
                                                    <div>
                                                        <div className="mb-2">
                                                            <Link
                                                                href={`/categories/${category.slug}`}
                                                            >
                                                                <h2 className="hover:underline text-lg font-bold">
                                                                    {category.name.toUpperCase()}
                                                                </h2>
                                                            </Link>
                                                        </div>
                                                        <div className="ml-2">
                                                            {category.sub &&
                                                                category.sub.map(
                                                                    (
                                                                        subCategory,
                                                                        subCategoryIndex
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                subCategory.id
                                                                            }
                                                                            className="mb-2"
                                                                        >
                                                                            <div className="">
                                                                                <Link
                                                                                    href={`/categories/${category.slug}`}
                                                                                >
                                                                                    <h3 className="hover:underline text-base font-bold">
                                                                                        {subCategory.name.toUpperCase()}
                                                                                    </h3>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="ml-2">
                                                                                {subCategory.sub &&
                                                                                    subCategory.sub.map(
                                                                                        (
                                                                                            subSubCategory,
                                                                                            subSubCategoryIndex
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    subSubCategory.id
                                                                                                }
                                                                                            >
                                                                                                <Link
                                                                                                    href={`/categories/${category.slug}`}
                                                                                                >
                                                                                                    <h2 className="hover:underline">
                                                                                                        {subSubCategory.name.toUpperCase()}
                                                                                                    </h2>
                                                                                                </Link>
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarScreen;
