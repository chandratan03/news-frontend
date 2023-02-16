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
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                {sources.length > 0 && (
                    <>
                        <InputLabel>Source</InputLabel>
                        <Select
                            label="source"
                            defaultValue={selectedSource?.id}
                            onChange={handleChange}
                        >
                            {sources.map((source, index) => {
                                return (
                                    <MenuItem
                                        selected={
                                            source.id === selectedSource.id
                                        }
                                        value={source.id}
                                    >
                                        {source.source_name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </>
                )}
            </FormControl>
        </Box>
    );
};

export default CustomSourceDropDown;
