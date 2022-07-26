import { Card } from "flowbite-react";
import React from "react";

const ProductsMyPageTitle = ({ title }) => {
    return (
        <div>
            <div className="mb-2">
                <Card className="">
                    <h2 className="text-4xl">{title}</h2>
                </Card>
            </div>
        </div>
    );
};

export default ProductsMyPageTitle;
