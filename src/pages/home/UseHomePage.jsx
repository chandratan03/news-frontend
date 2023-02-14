import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getNews } from "../../apis/news";

export const useHomePage = () => {
    let [news, setNews] = useState([]);
    let [hasMore, setHasMore] = useState(true);
    let [lastPage, setLastPage] = useState(0);
    let [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParam] = useSearchParams();

    const loadNews = async () => {
        if (lastPage != 0 && currentPage === lastPage) {
            setHasMore(false);
            return;
        }
        if (hasMore == false) return;

        let params = {
            page: currentPage + 1,
            query: searchParams.get("query"),
        };

        let newsResponse = await getNews(params);

        setLastPage(newsResponse.data.data.last_page);
        setCurrentPage(newsResponse.data.data.current_page);
        setNews(news.concat(newsResponse.data.data.data));
    };

    return {
        news,
        loadNews,
        hasMore,
    };
};
