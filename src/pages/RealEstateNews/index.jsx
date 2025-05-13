import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AmericanFlag from '../../assets/images/american_flag.jpg';
import { FaTag, FaHome, FaDollarSign } from "react-icons/fa";

const getFormattedDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
};

const Tags = ({ tag, title, value, subtitle, Icon }) => (
    <div className="d-flex align-items-center justify-content-center gap-3 py-3 col-md-4 col-xs-12">
        {tag && (
            <div className="d-flex flex-md-row flex-xs-column text-md-start text-xs-center">
                <div className='d-flex justify-content-center align-items-center px-3'>
                    <div className='border border-1 border-primary p-3 rounded-circle'>
                        {Icon ? (
                            <Icon className="mb-2 text-primary fs-5" size={40} />
                        ) : (
                            <FaTag className="mb-2 text-primary fs-5" size={40} />
                        )}
                    </div>
                </div>
                <div className='text-start'>
                    <h2 className="mb-0 text-primary">{title || "Default Title"}</h2>
                    <p className="mb-0 fs-3">{value || "$0"}</p>
                    <p className="mb-0">{subtitle || "Default subtitle"}</p>
                </div>
            </div>
        )}
    </div>
);

const ArticleSection = ({ title, image, articles }) => (
    <div className="col-md-4 col-xs-12 d-flex flex-column gap-2 px-4">
        <h2>{title}</h2>
        <img src={image} alt="" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
        <p className='border-bottom border-bottom-2 border-secondary py-3'>{articles}</p>
        <a className='text-primary text-decoration-none'>See all Reports</a>
    </div>
);

const NewsCard = ({ title, date, isDark }) => (
    <div className='d-flex flex-column'>
        <p className='text-dark-subtle p-0 pt-2 m-0 fs-4 lh-sm'>{title}</p>
        <p className={`p-0 ${isDark ? 'text-black' : 'text-muted'}`}>{date}</p>
    </div>
);

const NewsSection = ({ onFetchFirstNews }) => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch('https://apitourism.today.alayaarts.com/api/all-whatsnew');
            const data = await response.json();
            if (data.status === 200 && data.whatsnew) {
                const formattedNews = data.whatsnew.map(news => ({
                    title: news.title,
                    date: news.date,
                    description: news.desc,
                    image: `${data.imagePath}${news.images[0].image}`,
                }));
                setNewsList(formattedNews);
                if (formattedNews.length > 0) {
                    onFetchFirstNews(formattedNews[0]); // Pass the first news item to parent
                }
            }
        };

        fetchNews();
    }, [onFetchFirstNews]);

    return (
        <>
            <h2>What's New</h2>
            {newsList.length > 0 ? (
                newsList.map((news, index) => (
                    <NewsBanner key={index} newsData={news} />
                ))
            ) : (
                <p>Loading news...</p>
            )}
            <div className='py-3 border-top border-top-1 border-secondary'>
                <a className='text-primary text-decoration-none fs-5'>See all reports</a>
            </div>
        </>
    );
};

const NewsBanner = ({ newsData }) => (
    <div className='d-flex py-3 border-top border-top-1 border-secondary justify-content-between'>
        <NewsCard title={newsData.title} date={newsData.date} description={newsData.description} />
        <div className="col-md-4 offset-md-1">
            <img src={newsData.image || AmericanFlag} alt="" className='w-100 m-0 p-0' style={{ height: '80px', objectFit: "contain" }} />
        </div>
    </div>
);

const RealEstateNews = () => {
    const [firstNews, setFirstNews] = useState(null);
    const [articleSections, setArticleSections] = useState([]);
    const todayDate = getFormattedDate();

    const handleFetchFirstNews = (news) => {
        setFirstNews(news); // Update the state with the first news item
    };

    // Fetch article data for the ArticleSection
    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch('https://apitourism.today.alayaarts.com/api/all-whatsnew');
            const data = await response.json();
            if (data.status === 200 && data.whatsnew) {
                setArticleSections(data.whatsnew); // Save the article sections to state
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <Helmet>
                <title>Real Estate News | Latest Updates & Housing Market Insights</title>
                <meta name="description" content="Stay updated with the latest real estate news, housing market insights, and trends. Explore articles, reports, and market updates to make informed decisions." />
                <meta name="keywords" content="Real Estate News, Housing Market, Property Updates, Real Estate Trends, Home Sales, Affordable Housing, Market Reports" />
                <meta name="author" content="Real Estate Insights" />
            </Helmet>
            <Header />
            <div className="container-md container-fluid">
                <main className='row'>
                    <div className="news-card col-md-6 col-xs-12">
                        {firstNews ? (
                            <>
                                <img src={firstNews.image || AmericanFlag} alt="" className='w-100' />
                                <NewsCard isDark={false} title={firstNews.title} date={firstNews.date} />
                            </>
                        ) : (
                            <p>Loading first news...</p>
                        )}
                    </div>
                    <div className="news-section col-md-6 col-xs-12">
                        <NewsSection onFetchFirstNews={handleFetchFirstNews} />
                    </div>
                </main>
                <section className='border-bottom border-bottom-2 border-secondary py-3'>
                    <NewsCard title={'United States Housing Market'} date={todayDate} isDark={true} />
                </section>
                <section className="tags row">
                    <Tags
                        tag={true}
                        title="Median Sale Price"
                        value="$423,313"
                        subtitle="year-over-year"
                        Icon={FaDollarSign}
                    />
                    <Tags
                        tag={true}
                        title="Average Rent"
                        value="$1,200"
                        subtitle="monthly"
                        Icon={FaHome}
                    />
                    <Tags
                        tag={true}
                        title="New Listings"
                        value="12,345"
                        subtitle="this month"
                        Icon={FaTag}
                    />
                </section>

                <section className='p-4 py-5 w-100 bg-secondary-subtle'>
                    <div className='row'>
                        {articleSections.length > 0 ? (
                            articleSections.map((section, index) => (
                                <ArticleSection
                                    key={index}
                                    title={section.title}
                                    image={
                                        section.images && section.images.length > 0
                                            ? `https://apitourism.today.alayaarts.com/uploads/whatsnew/${section.images[0].image}`
                                            : AmericanFlag
                                    }
                                    articles={section.desc || "No description available"}
                                />
                            ))
                        ) : (
                            <p>Loading articles...</p>
                        )}
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};

export default RealEstateNews;

