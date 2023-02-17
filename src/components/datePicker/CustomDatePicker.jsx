import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import useCustomDatePicker from "./UseCustomDatePicker";

const CustomDatePicker = () => {
    const { onChangeDate, selectedDate } = useCustomDatePicker();
    return (
        <div className="w-full sm:w-[200px]">
            <DatePicker
                label="Published Date"
                onChange={onChangeDate}
                renderInput={(params) => <TextField sx={{width: "100%"}} {...params} />}
                value={selectedDate}
            />
        </div>
    );
};

export default CustomDatePicker;
