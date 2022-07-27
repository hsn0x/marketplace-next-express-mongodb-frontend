import { Avatar } from "flowbite-react";
import Link from "next/link";
import React from "react";

const ProductPageTabsBy = ({ user }) => {
    return (
        <div className="flex justify-end">
            {user && (
                <div className="bg-gray-100 flex gap-3 items-center p-2 rounded-lg">
                    <div>
                        <Avatar
                            img={user?.Avatars[0].url}
                            rounded={true}
                            bordered={true}
                            size="lg"
                        />
                    </div>
                    <div className="text-center">
                        <div>
                            <span className="font-bold underline">
                                <Link
                                    href={`/members/username/${user.username}`}
                                >
                                    <span className="cursor-pointer">
                                        {user.firstName} {user.lastName}
                                    </span>
                                </Link>
                            </span>
                        </div>
                        <div>
                            By{" "}
                            <span className="font-bold underline">
                                <Link
                                    href={`/members/username/${user.username}`}
                                >
                                    <span className="cursor-pointer">
                                        {user.username}
                                    </span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPageTabsBy;
