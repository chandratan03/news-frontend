import React, { useContext, useState } from "react";
import { personalizeAccount } from "../../apis/auth";
import { getAuthors } from "../../apis/contributor";
import { getNewsCategories } from "../../apis/news";
import { getSources } from "../../apis/source";
import AuthContext from "../../contexts/AuthContext";

const UsePersonalize = () => {
    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);

    const [personalizeErrorMsg, setPersonalizeErrorMsg] = useState(undefined);
    const [isLoadingPersonalize, setIsLoadingPersonalize] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedSources, setSelectedSources] = useState([]);
    const [sources, setSources] = useState([]);

    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [authors, setAuthors] = useState([]);

    const onHandleCategoryChange = (event) => {
        let newSelectedCategories = event.target.value;
        setSelectedCategories(newSelectedCategories);
    };

    const onHandleSourceChange = async (event) => {
        let newSelectedSources = event.target.value;
        setSelectedSources(newSelectedSources);
    };

    const onHandleAuthorChange = async (event) => {
        let newSelectedAuthors = event.target.value;
        setSelectedAuthors(newSelectedAuthors);
    };

    const loadSources = async (event) => {
        let response = await getSources();
        setSources(response.data.data);
    };

    const loadCategories = async () => {
        let response = await getNewsCategories();
        setCategories(response.data.data);
    };

    const loadAuthors = async () => {
        let response = await getAuthors();
        setAuthors(response.data.data);
    };

    const onSubmitPersonalize = async (event) => {
        event.preventDefault();
        setIsLoadingPersonalize(true);
        let sourcesValue = selectedSources.length > 0 ? selectedSources : null;
        let categoriesValue =
            selectedCategories.length > 0 ? selectedCategories : null;
        let authorsValue = selectedAuthors.length > 0 ? selectedAuthors : null;

        let response = await personalizeAccount(
            sourcesValue,
            categoriesValue,
            authorsValue
        );
        if (response.status === 200) {
            let userData = JSON.stringify(response.data.data);
            sessionStorage.setItem("user", userData);
            setUser(userData);
            window.location.reload();
        }else{
            setPersonalizeErrorMsg(response.data.message);
        }
        setIsLoadingPersonalize(true);
    };

    const onLoadDefault = () => {
        if (!user) return;
        let userObject = JSON.parse(user);
        if (!userObject?.personalize) return;
        const personalize = JSON.parse(userObject?.personalize);
        if (personalize?.authors) {
            setSelectedAuthors(personalize?.authors);
        }
        if (personalize?.sources) {
            setSelectedSources(personalize?.sources);
        }
        if (personalize?.categories) {
            setSelectedCategories(personalize?.categories);
        }
    };

    return {
        onSubmitPersonalize,
        selectedCategories,
        onHandleCategoryChange,
        categories,
        loadCategories,

        selectedSources,
        sources,
        onHandleSourceChange,
        loadSources,

        selectedAuthors,
        authors,
        onHandleAuthorChange,
        loadAuthors,
        onLoadDefault,

        isLoadingPersonalize,
        personalizeErrorMsg,
    };
};

export default UsePersonalize;
