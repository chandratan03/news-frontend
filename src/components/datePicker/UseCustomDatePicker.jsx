import React from "react";
import { useSearchParams } from "react-router-dom";

const useCustomDatePicker = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedDate = searchParams.get("date") ?? null;
    const onChangeDate = (newValue) => {
        let formatedDate = newValue.format("YYYY-MM-DD");
        let params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        params["date"] = formatedDate.toString();
        setSearchParams(params);
        window.location.reload();
    };

    return {
        onChangeDate,
        selectedDate,
    };
};

export default useCustomDatePicker;
