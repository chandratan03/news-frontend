import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCustomSource from "./UseCustomSource";

const CustomSourceDropDown = () => {
    const { selectedSource, handleChange, sources, loadSources } =
        useCustomSource();

    useEffect(() => {
        loadSources();
    }, []);

    return (
        <div className="w-full sm:w-[200px]">
            <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                    label="source"
                    defaultValue={selectedSource?.id}
                    onChange={handleChange}
                    sx={{
                        width:"100%"
                    }}
                >
                    {sources.map((source) => {
                        return (
                            <MenuItem
                                selected={source.id === selectedSource?.id}
                                value={source.id}
                            >
                                {source.source_name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default CustomSourceDropDown;
