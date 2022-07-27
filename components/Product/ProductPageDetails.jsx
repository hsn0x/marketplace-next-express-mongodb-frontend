import { Button, Rating, TextInput } from "flowbite-react";
import React from "react";
import { marketActions } from "../../redux/actions";
import ProductPageDetailsAction from "./ProductPageDetailsAction";
import ProductPageDetailsDescription from "./ProductPageDetailsDescription";
import ProductPageDetailsPrice from "./ProductPageDetailsPrice";
import ProductPageDetailsRating from "./ProductPageDetailsRating";
import ProductPageDetailsStore from "./ProductPageDetailsStore";
import ProductPageDetailsTitle from "./ProductPageDetailsTitle";

const ProductPageDetails = ({ title, price, description, store }) => {
    return (
        <>
            <div className="p-5 flex flex-col gap-5">
                <ProductPageDetailsTitle title={title} />
                <ProductPageDetailsRating />
                <ProductPageDetailsPrice price={price} />
                <ProductPageDetailsDescription description={description} />
                <ProductPageDetailsAction />
                <ProductPageDetailsStore
                    name={store.name}
                    username={store.username}
                    slug={store.slug}
                    Avatars={store.Avatars}
                />
            </div>
        </>
    );
};

export default ProductPageDetails;
