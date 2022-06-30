import { Rating } from "flowbite-react";
import React from "react";

const ProductPageDetailsRating = () => {
    return (
        <div className="rating">
            <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                </p>
            </Rating>
        </div>
    );
};

export default ProductPageDetailsRating;
