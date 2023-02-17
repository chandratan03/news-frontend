import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCustomCategory from "./UseCustomCategory";

const CustomCategoryDropDown = () => {
    const { selectedCategory, handleChange, categories, loadCategories } =
        useCustomCategory();

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <>
            <div className="w-full sm:w-[200px]">
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        defaultValue={selectedCategory?.id}
                        label="Category"
                        onChange={handleChange}
                        className="capitalize"
                    >
                        {categories.map((category) => {
                            return (
                                <MenuItem
                                    value={category.id}
                                    selected={
                                        selectedCategory?.id === category?.id
                                    }
                                    className="capitalize"
                                >
                                    {category.news_category_name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
        </>
    );
};

export default CustomCategoryDropDown;
