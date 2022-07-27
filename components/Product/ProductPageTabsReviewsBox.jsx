import React from "react";
import ProductPageTabsReviewBox from "./ProductPageTabsReviewBox";

const ProductPageTabsReviewsBox = ({ reviews }) => {
    return (
        <div className="flex flex-col gap-1">
            {reviews &&
                reviews.map((review, index) => {
                    return (
                        <div key={review._id}>
                            <ProductPageTabsReviewBox review={review} />
                        </div>
                    );
                })}
        </div>
    );
};

export default ProductPageTabsReviewsBox;
