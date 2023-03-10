import React, { useEffect } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Tab,
    Tabs,
} from "@mui/material";
import Header from "../../components/header/Header";
import UseProfile from "./UseProfile";
import { a11yProps, TabPanel } from "../../components/tabs/CustomTab";
import UsePersonalize from "./UsePersonalize";
import LoadingIcon from "../../components/icons/LoadingIcon";
import { ExclamationIcon, XCircleIcon } from "@heroicons/react/outline";

export default function ProfilePage() {
    const {
        userObject,
        onSubmit,
        previewImage,
        setPreviewImage,
        isLoadingProfile,
        profileErrorMsg,
    } = UseProfile();

    const {
        onSubmitPersonalize,
        selectedCategories,
        onHandleCategoryChange,
        categories,
        loadCategories,

        selectedSources,
        sources,
        onHandleSourceChange,
        loadSources,

        selectedAuthors,
        authors,
        onHandleAuthorChange,
        loadAuthors,

        onLoadDefault,
        isLoadingPersonalize,
        personalizeErrorMsg,
    } = UsePersonalize();

    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        loadCategories();
        loadSources();
        loadAuthors();
        onLoadDefault();
    }, []);

    return (
        <div>
            <Header />
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Profile" {...a11yProps(0)} />
                        <Tab label="Personalize" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <div className="flex items-center justify-center p-6 mx-auto x-4 lg:px-8 min-h-[80vh] w-full max-w-[750px]">
                        <div className="bg-white rounded-lg shadow overflow-hidden w-full">
                            <div className="justify-center">
                                {profileErrorMsg && (
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
                                                    {profileErrorMsg}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setPreviewImage(
                                                                    URL.createObjectURL(
                                                                        event
                                                                            .target
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
                                            {isLoadingProfile ? (
                                                <LoadingIcon />
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="ml-5 bg-light-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                                >
                                                    Save
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <div className="flex items-center justify-center p-6 mx-auto x-4 sm:px-6 lg:px-8 min-h-[80vh] w-full max-w-[750px]">
                        <div className="bg-white rounded-lg shadow overflow-hidden w-full">
                            <div className="justify-center">
                                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                    {personalizeErrorMsg && (
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
                                                        {personalizeErrorMsg}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="rounded-md bg-yellow-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <ExclamationIcon
                                                    className="h-5 w-5 text-yellow-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-yellow-800">
                                                    Notes
                                                </h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>
                                                        If you provide some
                                                        personalization, it will
                                                        be shown on the home
                                                        page as recommended
                                                        news.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form
                                        onSubmit={onSubmitPersonalize}
                                        className="divide-y divide-gray-200 lg:col-span-9"
                                        action="#"
                                        method="POST"
                                    >
                                        <div className="py-6 px-4 ">
                                            <h2 className="text-lg leading-6 font-medium text-gray-900">
                                                Personalization
                                            </h2>

                                            <div className="mt-6 grid grid-cols-12 gap-6">
                                                <div className="col-span-12">
                                                    <FormControl
                                                        size="small"
                                                        sx={{ width: "100%" }}
                                                    >
                                                        <InputLabel
                                                            id="set-prefered-category"
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            Category
                                                        </InputLabel>
                                                        <Select
                                                            labelId="set-prefered-category"
                                                            id="category"
                                                            multiple
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                            value={
                                                                selectedCategories
                                                            }
                                                            defaultValue={
                                                                selectedCategories
                                                            }
                                                            onChange={
                                                                onHandleCategoryChange
                                                            }
                                                            input={
                                                                <OutlinedInput label="Category" />
                                                            }
                                                        >
                                                            {categories.map(
                                                                (
                                                                    newsCategory
                                                                ) => (
                                                                    <MenuItem
                                                                        sx={{
                                                                            fontSize:
                                                                                "14px",
                                                                        }}
                                                                        key={
                                                                            newsCategory?.id
                                                                        }
                                                                        value={
                                                                            newsCategory?.id
                                                                        }
                                                                    >
                                                                        {
                                                                            newsCategory?.news_category_name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div className="col-span-12">
                                                    <FormControl
                                                        size="small"
                                                        sx={{ width: "100%" }}
                                                    >
                                                        <InputLabel
                                                            id="set-prefered-source"
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            Source
                                                        </InputLabel>
                                                        <Select
                                                            labelId="set-prefered-source"
                                                            id="source"
                                                            multiple
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                            value={
                                                                selectedSources
                                                            }
                                                            defaultValue={
                                                                selectedSources
                                                            }
                                                            onChange={
                                                                onHandleSourceChange
                                                            }
                                                            input={
                                                                <OutlinedInput label="Source" />
                                                            }
                                                        >
                                                            {sources.map(
                                                                (source) => (
                                                                    <MenuItem
                                                                        sx={{
                                                                            fontSize:
                                                                                "14px",
                                                                        }}
                                                                        key={
                                                                            source?.id
                                                                        }
                                                                        value={
                                                                            source?.id
                                                                        }
                                                                    >
                                                                        {
                                                                            source?.source_name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-span-12">
                                                    <FormControl
                                                        size="small"
                                                        sx={{ width: "100%" }}
                                                    >
                                                        <InputLabel
                                                            id="set-prefered-author"
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            Author
                                                        </InputLabel>
                                                        <Select
                                                            labelId="set-prefered-author"
                                                            id="author"
                                                            multiple
                                                            sx={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                            value={
                                                                selectedAuthors
                                                            }
                                                            defaultValue={
                                                                selectedAuthors
                                                            }
                                                            onChange={
                                                                onHandleAuthorChange
                                                            }
                                                            input={
                                                                <OutlinedInput label="Author" />
                                                            }
                                                        >
                                                            {authors.map(
                                                                (author) => (
                                                                    <MenuItem
                                                                        sx={{
                                                                            fontSize:
                                                                                "14px",
                                                                        }}
                                                                        key={
                                                                            author?.id
                                                                        }
                                                                        value={
                                                                            author?.id
                                                                        }
                                                                    >
                                                                        {
                                                                            author?.contributor_name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" divide-gray-200">
                                            <div className="py-4 px-4 flex justify-end sm:px-6">
                                                {isLoadingPersonalize ? (
                                                    <LoadingIcon />
                                                ) : (
                                                    <button
                                                        type="submit"
                                                        className="ml-5 bg-light-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-light-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Box>
        </div>
    );
}
