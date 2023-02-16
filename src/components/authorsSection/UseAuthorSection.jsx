import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAuthor, getRandomContributors } from "../../apis/contributor";
import { getParamsFromSearchParams } from "../../utils/common";

const useAuthorSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [contributors, setContributors] = useState([]);
    const [contributor, setContributor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const loadContributors = async () => {
        const author = searchParams.get("author");
        if (author) {
            let result = await getAuthor(author);
            setContributor(result.data.data);
        } else {
            const response = await getRandomContributors();
            setContributors(response.data.data);
        }
        setIsLoading(false);
    };

    const onClickContributor = ($id) => {
        let params = getParamsFromSearchParams(searchParams);
        params["author"] = $id;
        setSearchParams(params);
        window.location.reload();
    };

    return {
        contributors,
        contributor,
        isLoading,
        loadContributors,
        onClickContributor,
    };
};
export default useAuthorSection;
