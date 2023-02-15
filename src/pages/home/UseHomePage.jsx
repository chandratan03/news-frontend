import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNews } from "../../apis/news";

export const useHomePage = () => {
    let [news, setNews] = useState([]);
    let [hasMore, setHasMore] = useState(true);
    let [lastPage, setLastPage] = useState(0);
    let [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParam] = useSearchParams();

    const loadNews = async (refresh = false) => {
        if (refresh === true) {
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
    };

    const createParams = () => {
        let params = {
            page: currentPage + 1,
        };
        if (searchParams.get("query") !== undefined) {
            params["query"] = searchParams.get("query");
        }
        if (searchParams.get("date") !== undefined) {
            params["date"] = searchParams.get("date");
        }
        if (searchParams.get("category") !== undefined) {
            params["category"] = searchParams.get("category");
        }
        return params;
    };

    return {
        news,
        loadNews,
        hasMore,
    };
};
