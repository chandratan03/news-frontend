import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query"));

    return { searchQuery, setSearchQuery, searchParams, setSearchParams };
};

export default useSearch;
