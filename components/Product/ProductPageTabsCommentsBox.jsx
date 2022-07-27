import React from "react";
import ProductPageTabsCommentBox from "./ProductPageTabsCommentBox";

const ProductPageTabsCommentsBox = ({ comments }) => {
    return (
        <div className="flex flex-col gap-1">
            {comments &&
                comments.map((comment, index) => {
                    return (
                        <div key={comment._id}>
                            <ProductPageTabsCommentBox comment={comment} />
                        </div>
                    );
                })}
        </div>
    );
};

export default ProductPageTabsCommentsBox;
