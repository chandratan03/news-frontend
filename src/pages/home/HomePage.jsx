import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import NewsCard from "../../components/newsCard/NewsCard";
import { useHomePage } from "./UseHomePage";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
    const { news, loadNews, hasMore } = useHomePage();

    useEffect(() => {
        loadNews();
    }, []);

    return (
        <InfiniteScroll
            dataLength={news.length}
            next={loadNews}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: "center" }}>End of the news</p>}
        >
            <ul className="space-y-3 max-w-[1140px]">
                {news.map((newsElement) => {
                    let newsContributors = newsElement.news_contributors;
                    let contributorsName = "";
                    newsContributors.map((newsContributor) => {
                        let contribName =
                            newsContributor.contributor.contributor_name;
                        if (contributorsName !== "")
                            contribName = ", " + contribName;
                        contributorsName += contribName;
                    });
                    return (
                        <li className="bg-white shadow overflow-hidden rounded-md px-6 py-4 hover:bg-gray-50 ">
                            <NewsCard
                                imageUrl={newsElement.news_image_url}
                                title={newsElement.news_title}
                                publishedDate={
                                    newsElement.news_publication_date
                                }
                                source={newsElement.news_source_data}
                                articleLink={newsElement.news_web_url}
                                creator={contributorsName}
                            />
                        </li>
                    );
                })}
            </ul>
        </InfiniteScroll>
    );
}
