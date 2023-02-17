import React, { useEffect } from "react";
import useAuthorSection from "./UseAuthorSection";
import LoadingIcon from "../icons/LoadingIcon";

const AuthorSection = () => {
    const {
        contributors,
        contributor,
        isLoading,
        loadContributors,
        onClickContributor,
    } = useAuthorSection();

    useEffect(() => {
        loadContributors();
    }, []);

    return (
        <>
            {isLoading && (
                <div className="flex flex-col p-6 flex-wrap justify-start items-center">
                    <LoadingIcon />
                </div>
            )}
            {!isLoading && contributor && (
                <div className="px-6 pt-6 flex flex-wrap justify-start items-center">
                    <h3 className="text-2xl font-bold text-gray-900 underline">
                        From Author: {contributor.contributor_name}
                    </h3>
                </div>
            )}
            {!isLoading && !contributor && (
                <div className="flex flex-col p-6 flex-wrap justify-start">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Recommended Authors
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {contributors &&
                            contributors.map((contributor) => {
                                return (
                                    <div
                                        onClick={() => {
                                            onClickContributor(contributor.id);
                                        }}
                                        key={contributor.id}
                                        className="relative rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <div className="flex-shrink-0">
                                            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                                <svg
                                                    className="h-full w-full text-gray-300"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <a
                                                href="#"
                                                className="focus:outline-none"
                                            >
                                                <p className="text-sm font-medium text-gray-900  text-ellipsis overflow-hidden">
                                                    {
                                                        contributor.contributor_name
                                                    }
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
        </>
    );
};
export default AuthorSection;
