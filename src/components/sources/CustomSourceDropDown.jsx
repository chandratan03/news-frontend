import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCustomSource from "./UseCustomSource";

const CustomSourceDropDown = () => {
    const { selectedSource, handleChange, sources } = useCustomSource();
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                    label="source"
                    defaultValue={selectedSource?.key}
                    onChange={handleChange}
                >
                    {sources.map((source, index) => {
                        return (
                            <MenuItem value={source.key}>
                                {source.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CustomSourceDropDown;
