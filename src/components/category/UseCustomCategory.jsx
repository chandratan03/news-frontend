import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNewsCategories } from "../../apis/news";

const useCustomCategory = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleChange = (event) => {
        let params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        params["category"] = event.target.value;
        setSearchParam({ ...params });
        window.location.reload();
    };

    const loadCategories = async () => {
        let response = await getNewsCategories();
        let listCategory = response.data.data;
       

        let findSelectedCategory = "";
        listCategory.forEach((category) => {
            if (category.id.toString() === searchParams.get("category")) {
                findSelectedCategory = category;
                return;
            }
        });
        console.log(categories !== [])
        setSelectedCategory(findSelectedCategory);
        setCategories(listCategory);
    };

    return {
        selectedCategory,
        handleChange,
        categories,
        loadCategories,
    };
};
export default useCustomCategory;
