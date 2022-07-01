import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import Link from "next/link";

const navigations = [
    {
        name: "Home",
        href: "/",
        icon: "info",
    },
    {
        name: "About",
        href: "/about",
        icon: "info",
    },
    {
        name: "Services",
        href: "/services",
        icon: "info",
    },
    {
        name: "Contact",
        href: "/contact",
        icon: "phone",
    },
];

const NavbarScreen = () => {
    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Marketplace
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded={true}
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {navigations.map(({ name, href }, index) => (
                    <Link key={index} href={href}>
                        {name}
                    </Link>
                ))}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarScreen;
