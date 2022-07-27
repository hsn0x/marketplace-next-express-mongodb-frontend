import { Carousel } from "flowbite-react";
import React from "react";

const MemberBoxImages = ({ Images }) => {
    return (
        <div className="h-56">
            {Images && (
                <Carousel className="h-screen">
                    {Images.map((image) => (
                        <img src={image.url} alt="" key={image._id} />
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default MemberBoxImages;
