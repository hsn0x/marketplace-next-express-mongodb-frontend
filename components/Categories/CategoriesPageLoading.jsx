import { Card, Spinner } from "flowbite-react";
import React from "react";

const CategoriesPageLoading = ({ loading }) => {
    return (
        <>
            {loading && (
                <div className="flex justify-center items-center">
                    <Spinner
                        aria-label="Extra small spinner example"
                        size="xl"
                    />
                </div>
            )}
        </>
    );
};

export default CategoriesPageLoading;
