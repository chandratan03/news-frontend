import { OutlinedInput, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import useCustomDatePicker from "./UseCustomDatePicker";

const CustomDatePicker = () => {
    const { onChangeDate, selectedDate } = useCustomDatePicker();
    return (
            <DatePicker
                label="Published Date"
                onChange={onChangeDate}
                renderInput={(params) => <TextField {...params} />}
                value={selectedDate}
            />
    );
};

export default CustomDatePicker;
