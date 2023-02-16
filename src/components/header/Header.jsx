import { Fragment, useContext } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
    LogoutIcon,
    MenuIcon,
    UserIcon,
    XIcon,
} from "@heroicons/react/outline";
import { Logo } from "../logo/Logo";
import { SearchComponent } from "../searchBar/SearchBar";
import useHeader from "./UseHeader";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function userLogoItems(open, onLogout) {
    return (
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
    );
}

function userLogo(userObject, onLogout) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            {({ open }) =>
                !userObject || !userObject.image_url ? (
                    <>
                        <div>
                            <Menu.Button>
                                <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                            </Menu.Button>
                        </div>
                        {userLogoItems(open, onLogout)}
                    </>
                ) : (
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
                        {userLogoItems(open, onLogout)};
                    </>
                )
            }
        </Menu>
    );
}

const userLogoInPopup = (userObject) => {
    return !userObject || !userObject.image_url ? (
        <span className="inline-block h-40 w-40 rounded-full overflow-hidden bg-gray-100">
            <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </span>
    ) : (
        <img
            className="relative rounded-full w-40 h-40"
            src={userObject?.image_url}
            alt=""
        />
    );
};

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
                                <div className="pb-6 px-5">
                                    {!isAuth ? (
                                        <div>
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
                                            <div>
                                                <div className="flex justify-center items-center mb-6">
                                                    {userLogoInPopup(
                                                        userObject
                                                    )}
                                                </div>
                                                <a
                                                    href="/profile"
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
