import { Carousel } from "flowbite-react";
import React from "react";

const StoreBoxImages = ({ Images }) => {
    return (
        <div className="h-64 ">
            <Carousel>
                {Images.map((image) => (
                    <img
                        src={image.url}
                        alt=""
                        key={image._id}
                        // objectFit="cover"
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default StoreBoxImages;
