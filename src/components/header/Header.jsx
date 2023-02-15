import { Fragment, useContext } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { LogoutIcon, MenuIcon, UserIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Logo } from "../logo/Logo";
import { SearchComponent } from "../searchBar/SearchBar";
import useHeader from "./UseHeader";

const resources = [
    {
        name: "Help Center",
        description:
            "Get all of your questions answered in our forums or contact support.",
        href: "#",
    },
    {
        name: "Guides",
        description:
            "Learn how to maximize our platform to get the most out of it.",
        href: "#",
    },
    {
        name: "Events",
        description:
            "See what meet-ups and other events we might be planning near you.",
        href: "#",
    },
    {
        name: "Security",
        description: "Understand how we take your privacy seriously.",
        href: "#",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function userLogo(userObject, onLogout) {
    return !userObject || !userObject.image_url ? (
        <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </span>
    ) : (
        <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button>
                            <img
                                className="relative rounded-full w-10 h-10"
                                src={userObject?.image_url}
                                alt=""
                            />
                        </Menu.Button>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                        >
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="/profile"
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "group flex items-center px-4 py-2 text-sm"
                                            )}
                                        >
                                            <UserIcon
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Account Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            onClick={onLogout}
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "group flex items-center px-4 py-2 text-sm"
                                            )}
                                        >
                                            <LogoutIcon
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            Logout
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}

export default function Header() {
    const { userObject, onLogout, isAuth } = useHeader();

    return (
        <Popover className="relative z-50">
            {({ open }) => (
                <>
                    <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
                        <div>
                            <a href="/" className="flex">
                                <span className="sr-only">News</span>
                                <Logo />
                            </a>
                        </div>
                        <div className="md:hidden w-full">
                            <SearchComponent />
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </Popover.Button>
                        </div>
                        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                            <Popover.Group as="nav" className="flex space-x-10">
                                <a
                                    href="#"
                                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Pricing
                                </a>
                                <a
                                    href="#"
                                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Docs
                                </a>

                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open
                                                        ? "text-gray-900"
                                                        : "text-gray-500",
                                                    "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                )}
                                            >
                                                <span>More</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open
                                                            ? "text-gray-600"
                                                            : "text-gray-400",
                                                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel
                                                    static
                                                    className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
                                                >
                                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            {resources.map(
                                                                (item) => (
                                                                    <a
                                                                        key={
                                                                            item.name
                                                                        }
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="-m-3 p-3 block rounded-md hover:bg-gray-50"
                                                                    >
                                                                        <p className="text-base font-medium text-gray-900">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </p>
                                                                    </a>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </Popover.Group>
                            <SearchComponent />
                            {!isAuth ? (
                                <div className="flex items-center md:ml-12">
                                    <a
                                        href="/login"
                                        className="text-base font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Sign in
                                    </a>
                                    <a
                                        href="/register"
                                        className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Sign up
                                    </a>
                                </div>
                            ) : (
                                userLogo(userObject, onLogout)
                            )}
                        </div>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            static
                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <Logo />
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">
                                                    Close menu
                                                </span>
                                                <XIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-6 px-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <a
                                            href="#"
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        >
                                            Pricing
                                        </a>

                                        <a
                                            href="#"
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        >
                                            Docs
                                        </a>
                                    </div>

                                    {!isAuth ? (
                                        <div className="mt-6">
                                            <a
                                                href="/register"
                                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                            >
                                                Sign up
                                            </a>
                                            <p className="mt-6 text-center text-base font-medium text-gray-500">
                                                Already have an account?{" "}
                                                <a
                                                    href="/login"
                                                    className="text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Sign in
                                                </a>
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="relative mt-6">
                                                <div
                                                    className="absolute inset-0 flex items-center"
                                                    aria-hidden="true"
                                                >
                                                    <div className="w-full border-t border-gray-300" />
                                                </div>
                                                <div className="relative flex justify-center">
                                                    <span className="px-2 bg-white text-sm text-gray-500"></span>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <a
                                                    href=""
                                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                                >
                                                    Account Profile
                                                </a>
                                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                                    <button
                                                        onClick={onLogout}
                                                        className="text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Logout
                                                    </button>
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
