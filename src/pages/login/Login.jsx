import React from "react";
import { NavLink } from "react-router-dom";
import useLogin from "./UseLogin";
import { XCircleIcon } from "@heroicons/react/solid";
import { CircularProgress } from "@mui/material";
import LoadingIcon from "../../components/icons/LoadingIcon";

export default function Login() {
    const { errorMsg, setErrorMsg, onLogin, isSubmit } = useLogin();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <a href="/">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="logo192.png"
                        alt="News"
                    />
                </a>

                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
                    Sign in to News
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                {errorMsg !== undefined && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon
                                    className="h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {errorMsg}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={onLogin}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {isSubmit ? (
                            <div className="flex justify-center">
                                <LoadingIcon/>
                            </div>
                        ) : (
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Don't have an account?{" "}
                                    <NavLink
                                        className="font-medium text-sky-600 hover:text-sky-500"
                                        to={"/register"}
                                    >
                                        Register
                                    </NavLink>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
