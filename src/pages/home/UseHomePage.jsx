import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNews, getNewsByAccount } from "../../apis/news";
import { PAGE_SIZE } from "../../constants/homepage";
import AuthContext from "../../contexts/AuthContext";
import { getParamsFromSearchParams } from "../../utils/common";

export const useHomePage = () => {
    let [news, setNews] = useState([]);
    let [hasMore, setHasMore] = useState(true);
    let [lastPage, setLastPage] = useState(0);
    let [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParam] = useSearchParams();

    let [recommendedNews, setRecommendedNews] = useState([]);
    let [hasMoreRecommendedNews, setHasMoreRecommendedNews] = useState(true);
    let [lastPageRecommendedNews, setLastPageRecommendedNews] = useState(0);
    let [currentPageRecommendedNews, setCurrentPageRecomendedNews] =
        useState(0);

    const { user, token, isAuth, setUser, setToken, setIsAuth } =
        useContext(AuthContext);

    const [havePersonalize, setHavePersonalize] = useState(false);

    const loadNews = async (refresh = false) => {
        if (refresh) {
            news = [];
            currentPage = 0;
        }
        if (lastPage != 0 && currentPage === lastPage) {
            setHasMore(false);
            return;
        }
        if (hasMore == false) return;

        let params = createParams();
        let newsResponse = await getNews(params);
        let pagination = newsResponse.data;

        setLastPage(pagination.data.last_page);
        setCurrentPage(pagination.data.current_page);

        const concatedNews = news.concat(pagination.data.data);
        setNews(concatedNews);

        if (concatedNews.length === 0) {
            setHasMore(false);
        }
    };

    const createParams = () => {
        let params = {
            page: currentPage + 1,
        };
        params = { ...params, ...getParamsFromSearchParams(searchParams) };
        return params;
    };

    const loadRecommendedNews = async () => {
        if (!isAuth) {
            setHasMoreRecommendedNews(false);
            return;
        }
        if (
            lastPageRecommendedNews != 0 &&
            currentPageRecommendedNews === lastPageRecommendedNews
        ) {
            setHasMoreRecommendedNews(false);
            return;
        }
        if (hasMoreRecommendedNews == false) return;

        let params = {
            page: currentPage + 1,
            personalize: true,
        };

        let newsResponse = await getNewsByAccount(params);
        let pagination = newsResponse.data;

        setLastPageRecommendedNews(pagination.data.last_page);
        setCurrentPageRecomendedNews(pagination.data.current_page);

        const concatedNews = recommendedNews.concat(pagination.data.data);
        setRecommendedNews(concatedNews);

        if (concatedNews.length === 0) {
            setHasMoreRecommendedNews(false);
        }
    };

    const checkHavePersonalize = () => {
        if (!isAuth) return;
        let userObject = JSON.parse(user);
        if (!userObject?.personalize) return;

        userObject.personalize = JSON.parse(userObject.personalize);

        if (
            !userObject.personalize?.authors &&
            !userObject.personalize?.sources &&
            !userObject.personalize?.categories
        ) {
            return;
        }

        setHavePersonalize(true);
    };

    return {
        news,
        loadNews,
        hasMore,
        recommendedNews,
        loadRecommendedNews,
        hasMoreRecommendedNews,
        isAuth,
        checkHavePersonalize,
        havePersonalize
    };
};
