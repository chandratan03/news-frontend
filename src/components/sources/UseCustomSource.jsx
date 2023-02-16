import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSources } from "../../apis/source";

const useCustomSource = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState(null);

    const handleChange = (event) => {
        let params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        params["source"] = event.target.value;
        setSearchParam({ ...params });
        window.location.reload();
    };

    const loadSources = async () => {
        let response = await getSources();
        let responseSources = response.data.data;
        setSources(responseSources);

        let findSource = searchParams.has("source")
            ? responseSources.find(
                  (source) => source.id == searchParams.get("source")
              )
            : null;
        setSelectedSource(findSource);
    };

    return {
        selectedSource,
        handleChange,
        sources,
        loadSources,
    };
};
export default useCustomSource;
