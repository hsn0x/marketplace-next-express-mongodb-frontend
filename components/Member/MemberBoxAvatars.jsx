import { Avatar, Carousel } from "flowbite-react";
import React from "react";

const MemberBoxAvatars = ({ Avatars }) => {
    return (
        <div className="">
            {Avatars && (
                <Avatar
                    img={Avatars[0]?.url}
                    rounded={true}
                    bordered={true}
                    size="lg"
                ></Avatar>
            )}
        </div>
    );
};

export default MemberBoxAvatars;
