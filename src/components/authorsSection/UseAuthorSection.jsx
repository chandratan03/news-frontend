import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRandomContributors } from "../../apis/contributor";
import { getParamsFromSearchParams } from "../../utils/common";

const useAuthorSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [contributors, setContributors] = useState([]);

    const loadContributors = async () => {
        const response = await getRandomContributors();
        setContributors(response.data.data);
    };

    const onClickContributor = ($id) =>{
        let params = getParamsFromSearchParams(searchParams);
        params["author"] = $id;
        setSearchParams(params);
        window.location.reload();
    }

    return { contributors, loadContributors, onClickContributor };
};
export default useAuthorSection;
