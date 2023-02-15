import { useEffect } from "react";
import Header from "../../components/header/Header";
import NewsCard from "../../components/newsCard/NewsCard";
import { useHomePage } from "./UseHomePage";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIcon from "../../components/icons/LoadingIcon";
import CustomDatePicker from "../../components/datePicker/CustomDatePicker";
import CustomCategoryDropDown from "../../components/category/CustomCategoryDropDown";
import CustomSourceDropDown from "../../components/sources/CustomSourceDropDown";
import AuthorSection from "../../components/authorsSection/AuthorSection";
export default function HomePage() {
    const { news, loadNews, hasMore } = useHomePage();

    useEffect(() => {
        loadNews();
    }, []);

    return (
        <>
            <Header />
            <div className="p-6 flex flex-wrap justify-start items-center">
                <AuthorSection />
            </div>

            <div className="p-6 pb-0">
                <h3 className="text-xl font-bold text-gray-700">News</h3>
            </div>
            <div className="p-6 flex flex-wrap justify-start items-center">
                <div className="mr-2 mb-2">
                    <CustomDatePicker />
                </div>
                <div className="mr-2 mb-2">
                    <CustomSourceDropDown />
                </div>
                <div className="mb-2">
                    <CustomCategoryDropDown />
                </div>
            </div>
            <InfiniteScroll
                dataLength={news.length}
                next={loadNews}
                hasMore={hasMore}
                style={{ overflow: "visible !important" }}
                loader={
                    <div className="flex w-full items-center justify-center">
                        <LoadingIcon />
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>End of the news</p>
                }
            >
                <ul className="space-y-3">
                    {news.map((newsElement, index) => {
                        let newsContributors = newsElement?.news_contributors;
                        let contributorsName = "";
                        if(!newsContributors) return <></>;
                        newsContributors.map((newsContributor) => {
                            let contribName =
                                newsContributor.contributor.contributor_name;
                            if (contributorsName !== "")
                                contribName = ", " + contribName;
                            contributorsName += contribName;
                        });
                        return (
                            <li
                                key={"news-" + index}
                                className="bg-white shadow overflow-hidden rounded-md px-6 py-4 hover:bg-gray-50 "
                            >
                                <NewsCard
                                    imageUrl={newsElement?.news_image_url}
                                    title={newsElement?.news_title}
                                    publishedDate={
                                        newsElement?.news_publication_date
                                    }
                                    source={newsElement?.news_source_data}
                                    articleLink={newsElement?.news_web_url}
                                    creator={contributorsName}
                                />
                            </li>
                        );
                    })}
                </ul>
            </InfiniteScroll>
        </>
    );
}
