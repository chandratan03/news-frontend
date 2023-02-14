import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

export function SearchComponent() {
    return (
        <form  className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full px-2 lg:px-6">
                <label htmlFor="search" className="sr-only">
                    Search projects
                </label>
                <div className="relative text-gray-500 focus-within:text-gray-400">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-300 bg-opacity-30 text-indigo-100 placeholder-text-gray-900 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm focus:shadow-md text-base"
                        placeholder="Search projects"
                        type="search"
                    />
                </div>
            </div>
        </form>
    );
}
