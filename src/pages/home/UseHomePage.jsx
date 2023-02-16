import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNews } from "../../apis/news";
import { PAGE_SIZE } from "../../constants/homepage";
import { getParamsFromSearchParams } from "../../utils/common";

export const useHomePage = () => {
    let [news, setNews] = useState([]);
    let [hasMore, setHasMore] = useState(true);
    let [lastPage, setLastPage] = useState(0);
    let [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParam] = useSearchParams();

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
        setNews(news.concat(pagination.data.data));

        if (
            pagination.data.data &&
            pagination.data.data.length % PAGE_SIZE > 0
        ) {
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

    return {
        news,
        loadNews,
        hasMore,
    };
};
