import { Avatar } from "flowbite-react";
import Link from "next/link";
import React from "react";

const ProductBoxIntro = ({ store }) => {
    return (
        <div>
            {store && (
                <div className="bg-gray-100 rounded-xl p-2">
                    <h2 className="">
                        <Avatar
                            img={store.Avatars[0].url}
                            rounded={true}
                            bordered={true}
                            size="lg"
                        >
                            <Link href={`/stores/name/${store.slug}`}>
                                <div className="cursor-pointer">
                                    <span className="text-xl">{name}</span>{" "}
                                </div>
                            </Link>
                            <Link href={`/stores/name/${store.slug}`}>
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

export default ProductBoxIntro;
