import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query"));

    const onSubmit = (event) => {
        event.preventDefault();
        let params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        params["query"] = event.target.query.value;
        setSearchParams({ ...params });
        window.location.reload();
    };

    return {
        searchQuery,
        setSearchQuery,
        searchParams,
        setSearchParams,
        onSubmit,
    };
};

export default useSearch;
