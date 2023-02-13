import React from "react";

export default function NewsCard(props) {
    let { imageUrl, title, publishedDate, creator, source, articleLink } =
        props;
    return (
        <a href={articleLink}>
            <div className="sm:flex">
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                    <img
                        className="h-48 w-48 border border-gray-300 bg-white text-gray-300"
                        src={imageUrl}
                        alt=""
                    />
                </div>
                <div>
                    <h3 className="text-xl font-bold underline">{title}</h3>
                    <p className="mt-1 text-base font-semibold text-gray-900">
                        <span>{creator}</span>
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                        <span>Published Date: </span>
                        <span>{publishedDate}</span>
                    </p>
                    <p className="mt-1 text-base text-gray-500">
                        <span>Source: </span>
                        <span className="capitalize">{source}</span>
                    </p>
                </div>
            </div>
        </a>
    );
}
