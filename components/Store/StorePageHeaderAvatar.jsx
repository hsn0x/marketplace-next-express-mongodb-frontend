import { Avatar } from "flowbite-react";
import React from "react";

const StorePageHeaderAvatar = ({ Avatars, name, username }) => {
    return (
        <div className="flex flex-row justify-center -mt-44">
            <div className="grid place-items-center">
                <div className=" bg-white rounded-full z-10 text-center hover:scale-105 transition duration-300">
                    <Avatar
                        img={Avatars[0].url}
                        rounded={true}
                        bordered={true}
                        size="xl"
                    ></Avatar>
                </div>
                <div className="cursor-pointer">
                    <span className="text-2xl font-bold">
                        {name.toUpperCase()}
                    </span>{" "}
                </div>
                <div className="cursor-pointer ">
                    <span className="font-bold text-sm">@{username}</span>
                </div>
            </div>
        </div>
    );
};

export default StorePageHeaderAvatar;
