import { Avatar } from "flowbite-react";
import Link from "next/link";
import React from "react";

const ProductPageDetailsStore = ({ Avatars, name, username, slug }) => {
    return (
        <div>
            {Avatars && (
                <div className=" rounded-xl p-2">
                    <h2 className="">
                        <Avatar
                            img={Avatars[0].url}
                            rounded={true}
                            bordered={true}
                            size="lg"
                        >
                            <Link href={`/stores/name/${slug}`}>
                                <div className="cursor-pointer">
                                    <span className="text-xl">{name}</span>{" "}
                                </div>
                            </Link>
                            <Link href={`/stores/name/${slug}`}>
                                <div className="cursor-pointer ">
                                    <span className="font-bold text-sm">
                                        @{username}
                                    </span>
                                </div>
                            </Link>
                        </Avatar>
                    </h2>
                </div>
            )}
        </div>
    );
};

export default ProductPageDetailsStore;
