import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import NewsCard from "../../components/newsCard/NewsCard";
import { useHomePage } from "./UseHomePage";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomDatePicker from "../../components/datePicker/CustomDatePicker";
import CustomCategoryDropDown from "../../components/category/CustomCategoryDropDown";
import CustomSourceDropDown from "../../components/sources/CustomSourceDropDown";
import AuthorSection from "../../components/authorsSection/AuthorSection";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { a11yProps, TabPanel } from "../../components/tabs/CustomTab";
export default function HomePage() {
    const {
        news,
        loadNews,
        hasMore,
        recommendedNews,
        loadRecommendedNews,
        hasMoreRecommendedNews,
        isAuth,
        checkHavePersonalize,
        havePersonalize,
    } = useHomePage();

    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const extractContributorsName = (newsElement) => {
        let newsContributors = newsElement?.news_contributors;
        let contributorsName = "";
        if (!newsContributors) return <></>;
        newsContributors.map((newsContributor) => {
            let contribName = newsContributor.contributor.contributor_name;
            if (contributorsName !== "") contribName = ", " + contribName;
            contributorsName += contribName;
        });

        return contributorsName;
    };

    useEffect(() => {
        checkHavePersonalize();
        loadNews();
        loadRecommendedNews();
    }, []);

    return (
        <>
            <Header />
            <AuthorSection />
            <Box sx={{ width: "100%" }}>
                {isAuth && havePersonalize && (
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label="News" {...a11yProps(0)} />
                            <Tab label="Recommended News" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                )}

                <TabPanel value={tabValue} index={0}>
                    <div className="p-6 pb-0">
                        <h3 className="text-2xl font-bold text-gray-900">
                            News
                        </h3>
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
                            <div className="flex w-full items-center justify-center my-40">
                                <CircularProgress />
                            </div>
                        }
                        endMessage={
                            hasMore === false &&
                            news.length === 0 && (
                                <div className="flex w-full items-center justify-center my-40">
                                    <h3>There's no any news</h3>
                                </div>
                            )
                        }
                    >
                        <ul className="space-y-3">
                            {news.map((newsElement, index) => {
                                let contributorsName =
                                    extractContributorsName(newsElement);

                                return (
                                    <li
                                        key={"news-" + index}
                                        className="bg-white shadow overflow-hidden rounded-md px-6 py-4 hover:bg-gray-50 "
                                    >
                                        <NewsCard
                                            imageUrl={
                                                newsElement?.news_image_url
                                            }
                                            title={newsElement?.news_title}
                                            publishedDate={
                                                newsElement?.news_publication_date
                                            }
                                            source={
                                                newsElement?.source?.source_name
                                            }
                                            articleLink={
                                                newsElement?.news_web_url
                                            }
                                            creator={contributorsName}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </InfiniteScroll>
                </TabPanel>

                {isAuth && havePersonalize && (
                    <TabPanel value={tabValue} index={1}>
                        <InfiniteScroll
                            dataLength={recommendedNews.length}
                            next={loadRecommendedNews}
                            hasMore={hasMoreRecommendedNews}
                            style={{ overflow: "visible !important" }}
                            loader={
                                <div className="flex w-full items-center justify-center my-40">
                                    <CircularProgress />
                                </div>
                            }
                            endMessage={
                                hasMoreRecommendedNews === false &&
                                recommendedNews.length === 0 && (
                                    <div className="flex w-full items-center justify-center my-40">
                                        <h3>There's no any news</h3>
                                    </div>
                                )
                            }
                        >
                            <ul className="space-y-3">
                                {recommendedNews.map((newsElement, index) => {
                                    let contributorsName =
                                        extractContributorsName(newsElement);
                                    return (
                                        <li
                                            key={"news-" + index}
                                            className="bg-white shadow overflow-hidden rounded-md px-6 py-4 hover:bg-gray-50 "
                                        >
                                            <NewsCard
                                                imageUrl={
                                                    newsElement?.news_image_url
                                                }
                                                title={newsElement?.news_title}
                                                publishedDate={
                                                    newsElement?.news_publication_date
                                                }
                                                source={
                                                    newsElement?.source
                                                        ?.source_name
                                                }
                                                articleLink={
                                                    newsElement?.news_web_url
                                                }
                                                creator={contributorsName}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </InfiniteScroll>
                    </TabPanel>
                )}
            </Box>
        </>
    );
}
