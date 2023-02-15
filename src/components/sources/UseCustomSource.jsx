import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const sources = [
    { key: "ny_times", name: "NY Times" },
    { key: "news api", name: "News API" },
    { key: "guardian", name: "Guardian" },
];

const useCustomSource = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    
    const selectedSource = searchParams.has("source")
        ? sources.find((source) => source.key === searchParams.get("source"))
        : null;
    const handleChange = (event) => {
        let params = {};
        for(const[key, value] of searchParams.entries()){
            params[key] = value;
        }
        params["source"] = event.target.value;
        setSearchParam({...params});
        window.location.reload();
    };

    return {
        selectedSource,
        handleChange,
        sources,
    };
};
export default useCustomSource;
