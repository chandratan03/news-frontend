import { useState } from "react";
import { getNews } from "../../apis/news";

export const useHomePage = () => {
    let [news, setNews] = useState([]);
    let [hasMore, setHasMore] = useState(true);
    let [lastPage, setLastPage] = useState(0);
    let [currentPage, setCurrentPage] = useState(0);

    const loadNews = async () => {
        if (lastPage != 0 && currentPage === lastPage) {
            setHasMore(false);
            return;
        }
        if (hasMore == false) return;

        let newsResponse = await getNews(currentPage + 1);
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
