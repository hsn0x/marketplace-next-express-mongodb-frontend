import { Tabs } from "flowbite-react";
import React from "react";
import ProductPageTabsAbout from "./ProductPageTabsAbout";
import ProductPageTabsComments from "./ProductPageTabsComments";
import ProductPageTabsReviews from "./ProductPageTabsReviews";

const ProductPageTabs = ({ reviews, comments, about }) => {
    return (
        <div>
            <Tabs.Group aria-label="Pills" style="pills">
                <Tabs.Item title="Comments">
                    <ProductPageTabsComments comments={comments} />
                </Tabs.Item>
                <Tabs.Item title="Reviews">
                    <ProductPageTabsReviews reviews={reviews} />
                </Tabs.Item>
                <Tabs.Item title="About">
                    <ProductPageTabsAbout about={about} />
                </Tabs.Item>
            </Tabs.Group>
        </div>
    );
};

export default ProductPageTabs;
