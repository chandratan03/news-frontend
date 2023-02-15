import { updateAccount } from "../../apis/auth";
import Header from "../../components/header/Header";
import UseProfile from "./UseProfile";

const user = {
    name: "Debbie Lewis",
    handle: "deblewis",
    email: "debbielewis@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

export default function ProfilePage() {
    const { userObject, onSubmit, previewImage, setPreviewImage } =
        UseProfile();

    return (
        <div>
            <Header />
            <main className="relative">
                <div className="flex items-center justify-center mx-auto x-4 sm:px-6 lg:px-8 min-h-[80vh]">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="justify-center">
                            <form
                                onSubmit={onSubmit}
                                className="divide-y divide-gray-200 lg:col-span-9"
                                action="#"
                                method="POST"
                                encType="multipart/form-data"
                            >
                                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                                        Profile
                                    </h2>

                                    <div className="mt-6 flex justify-center">
                                        <div className="mt-6 lg:mt-0 lg:ml-6 flex-grow-0 flex-shrink-0">
                                            <div className="relative rounded-full overflow-hidden">
                                                {previewImage && (
                                                    <img
                                                        className="relative rounded-full w-40 h-40"
                                                        src={previewImage}
                                                        alt="#"
                                                    />
                                                )}
                                                {!previewImage &&
                                                    (userObject?.image_url ? (
                                                        <img
                                                            className="relative rounded-full w-40 h-40"
                                                            src={
                                                                userObject?.image_url
                                                            }
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <span className="inline-block h-40 w-40 rounded-full overflow-hidden bg-gray-100">
                                                            <svg
                                                                className="h-full w-full text-gray-300"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                        </span>
                                                    ))}

                                                <label
                                                    htmlFor="image"
                                                    className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                                                >
                                                    <span>Change</span>
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        name="image"
                                                        onChange={(event) => {
                                                            setPreviewImage(
                                                                URL.createObjectURL(
                                                                    event.target
                                                                        .files[0]
                                                                )
                                                            );
                                                        }}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-12 gap-6">
                                        <div className="col-span-12 sm:col-span-6">
                                            <label
                                                htmlFor="first_name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                First name
                                            </label>
                                            <input
                                                defaultValue={
                                                    userObject?.first_name
                                                }
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-12 sm:col-span-6">
                                            <label
                                                htmlFor="last_name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Last name
                                            </label>
                                            <input
                                                defaultValue={
                                                    userObject?.last_name
                                                }
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                autoComplete="family-name"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-12">
                                            <label
                                                htmlFor="url"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <label
                                                htmlFor="url"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password_confirmation"
                                                id="password_confirmation"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className=" divide-gray-200">
                                    <div className="py-4 px-4 flex justify-end sm:px-6">
                                        <button
                                            type="button"
                                            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-5 bg-light-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
